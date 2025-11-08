import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(request) {
  try {
    const { topic } = await request.json();

    const prompt = `
You are a presentation design expert. Create a detailed and engaging presentation about "${topic}".

Return ONLY a valid JSON object (no markdown, no code blocks) with this exact structure:
{
  "title": "Presentation Title",
  "slideCount": 6,
  "slides": [
    {
      "id": 1,
      "type": "title",
      "heading": "Main Title",
      "subtitle": "Subtitle text",
      "bgColor": "#uniqueColor"
    },
    {
      "id": 2,
      "heading": "Slide Heading",
      "content": "Detailed content with bullet points separated by newlines",
      "bgColor": "#uniqueColor"
    }
  ]
}

Follow these design and content rules carefully:
- Create between 6–8 slides.
- The first slide must have "type": "title".
- Each slide must include a unique, visually distinct background color in hex format (#RRGGBB).
- Background colors must be soft, professional, and well balanced (e.g., pastel greens, blues, grays, creams, teals, or warm light tones).
- Do not repeat background colors between slides.
- Use concise and descriptive headings.
- Separate bullet points with newlines.
- Make the presentation informative, creative, and easy to read.
`;

    const response = await genAI.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });
    // console.log(response, "response");

    // Extract text output 
    const text = response?.candidates?.[0]?.content?.parts?.[0]?.text || "";

    if (!text) {
      throw new Error("No text generated from Gemini model");
    }
    // console.log(text, "text");

    // Clean text
    const cleanText = text
      .replace(/```json\n?/g, "")
      .replace(/```\n?/g, "")
      .replace(/^"(.*)"$/, "$1")
      .trim();

    const slideData = JSON.parse(cleanText);
    return NextResponse.json(slideData);
  } catch (error) {
    console.error(" Error generating slides:", error);
    return NextResponse.json(
      { error: "Failed to generate slides", details: error.message },
      { status: 500 }
    );
  }
}
