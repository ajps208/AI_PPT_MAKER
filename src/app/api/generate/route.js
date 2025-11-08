import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY});

export async function POST(request) {
  try {
    const { topic } = await request.json();

    const prompt = `
You are a presentation expert. Create a detailed presentation about "${topic}".

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
      "bgColor": "#7a9b8e"
    },
    {
      "id": 2,
      "heading": "Slide Heading",
      "content": "Detailed content with bullet points separated by newlines",
      "bgColor": "#8ba299"
    }
  ]
}

Requirements:
- Create 6–8 slides total
- First slide must have type: "title"
- Use colors: #7a9b8e, #8ba299, #f5f5f5, #e8f4f1
- Content should be well structured
- Use newlines for bullet points
- Keep headings concise
- Make it informative and engaging
`;

    const response = await genAI.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const text =
      response?.output?.[0]?.content?.[0]?.text ||
      response?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "";

    if (!text) {
      throw new Error("No text generated from Gemini model");
    }

    const cleanText = text.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
    console.log(cleanText,"ccleanText");
    

    const slideData = JSON.parse(cleanText);

    return NextResponse.json(slideData);
  } catch (error) {
    console.error("Error generating slides:", error);
    return NextResponse.json(
      { error: "Failed to generate slides", details: error.message },
      { status: 500 }
    );
  }
}
