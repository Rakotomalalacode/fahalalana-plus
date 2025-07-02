import { getGeminiResponse } from "@/lib/gemini";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const result = await getGeminiResponse(messages);

    return NextResponse.json({ result });
  } catch (error) {
    console.error("Erreur Gemini:", error);
    return new NextResponse("Erreur lors de la génération de la réponse", { status: 500 });
  }
}
