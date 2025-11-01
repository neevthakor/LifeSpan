import { NextResponse } from 'next/server';

// This is the format for a message.
type HistoryMessage = {
  role: "user" | "model";
  text: string;
}

export async function POST(req: Request) {
  const apiKey = process.env.GOOGLE_GEMINI_API_KEY;
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

  try {
    const body = await req.json();
    
    // It expects to receive a "history" array
    const { history } = body as { history: HistoryMessage[] };

    if (!history || history.length === 0) {
      return NextResponse.json({ error: "History is required" }, { status: 400 });
    }

    // --- This is the new "Veterinary AI" personality ---
    const systemInstruction = {
      role: "system",
      parts: [{ 
        text: `You are a specialized "Veterinary AI Assistant" for Lifespan.
        
        Your rules:
        1. Be polite, empathetic, and professional, focusing on animal health.
        2. You can provide general information on pet health, common illnesses, nutrition, and behavior for dogs, cats, birds, and small mammals.
        3. **CRITICAL:** You are NOT a real veterinarian. You cannot diagnose, give medical advice, or prescribe medication.
        4. If a user asks for a diagnosis (e.g., "What is wrong with my dog?"), you MUST decline and advise them to see a licensed veterinarian immediately.
        5. If the user describes a clear emergency (e.g., "my dog can't breathe," "my cat ate poison"), you must tell them to go to the NEAREST VETERINARY EMERGENCY HOSPITAL right away.`
      }],
    };

    // We send the system instruction and the full chat history
    const reqBody = {
      systemInstruction: systemInstruction,
      contents: history.map(msg => ({
        role: msg.role,
        parts: [{ text: msg.text }]
      })),
    };

    const apiRes = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reqBody),
    });

    const data = await apiRes.json();

    if (!apiRes.ok) {
      console.error("API Error:", data.error?.message || "Unknown error");
      return NextResponse.json({ error: data.error?.message || "API Error" }, { status: apiRes.status });
    }
    
    if (!data.candidates || data.candidates.length === 0) {
      return NextResponse.json({ response: "I'm sorry, I can't provide a response to that." }, { status: 200 });
    }

    const aiText = data.candidates[0].content.parts[0].text;
    return NextResponse.json({ response: aiText }, { status: 200 });

  } catch (error: any) {
    console.error("Failed to run Gemini:", error.message);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
