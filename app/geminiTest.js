import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;

async function testGemini() {
  const url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + apiKey;

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: "Say hello in a creative way" }] }]
    })
  });

  const data = await response.json();
  console.log("Gemini Response:", data);
}

testGemini();
