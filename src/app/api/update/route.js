import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(request) {
  try {
    const { pptData, prompt } = await request.json();

    const modifyPrompt = `
You are an expert presentation editor.
Here is the current presentation JSON:

${JSON.stringify(pptData, null, 2)}

The user wants the following updates:
"${prompt}"

Please return ONLY a valid updated JSON object in the same structure, applying the user’s changes clearly and consistently.

Do not wrap it in markdown or code blocks.
Keep all keys the same (title, slideCount, slides).
If user asks for visual or textual improvements, apply them properly.
`;

    const response = await genAI.models.generateContent({
      model: "gemini-2.5-flash",
      contents: modifyPrompt,
    });

    const text =
      response?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "";

    if (!text) throw new Error("No update text generated");

  // Clean text
    const cleanText = text
      .replace(/```json\n?/g, "")
      .replace(/```\n?/g, "")
      .replace(/^"(.*)"$/, "$1")
      .trim();
      
    const updatedPpt = JSON.parse(cleanText);
    return NextResponse.json(updatedPpt);
  } catch (error) {
    console.error("Error updating slides:", error);
    return NextResponse.json(
      { error: "Failed to update slides", details: error.message },
      { status: 500 }
    );
  }
}
