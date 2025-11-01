import dotenv from "dotenv";
import fetch from "node-fetch"; 
dotenv.config();

const apiKey = process.env.GOOGLE_GEMINI_API_KEY;

async function runGemini() {
  // Your model name and URL are correct.
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

  const reqBody = {
    contents: [
      {
        role: "user",
        parts: [{ text: "Say hello world" }],
      },
    ],
  };

  console.log("Sending request to Gemini...");

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqBody),
    });

    const data = await res.json();

    if (!res.ok) {
      // If the API key is wrong, this will print a helpful error.
      console.error("API Error:", data.error.message);
      return;
    }
    
    // This is the path to the AI's text response
    const aiText = data.candidates[0].content.parts[0].text;

    console.log("AI Response:");
    console.log(aiText);

  } catch (error) {
    console.error("Failed to run Gemini:", error.message);
  }
}

// --- THIS IS THE NEW LINE ---
// This calls the function when you run the file.
runGemini();