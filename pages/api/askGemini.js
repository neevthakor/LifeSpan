// File: pages/api/askGemini.js

export default async function handler(req, res) {
  // 1. Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  // 2. Get the API key from environment variables (Next.js loads this)
  const apiKey = process.env.GOOGLE_GEMINI_API_KEY;
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

  try {
    // 3. Get the prompt from the frontend request
    const { prompt } = req.body; 

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const reqBody = {
      contents: [{
        role: "user",
        parts: [{ text: prompt }], // Use the prompt from the frontend
      }],
    };

    // 4. Call the Gemini API (using the built-in fetch)
    const apiRes = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reqBody),
    });

    const data = await apiRes.json();

    if (!apiRes.ok) {
      console.error("API Error:", data.error.message);
      return res.status(apiRes.status).json({ error: data.error.message });
    }

    // 5. Send the AI's response back to your frontend
    const aiText = data.candidates[0].content.parts[0].text;
    res.status(200).json({ response: aiText });

  } catch (error) {
    console.error("Failed to run Gemini:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
}