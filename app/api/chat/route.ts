// import { getGeminiResponse } from "@/lib/gemini";
// import { NextResponse } from "next/server";

// export async function POST(req: Request) {
//   try {
//     const { messages } = await req.json();

//     const result = await getGeminiResponse(messages);

//     return NextResponse.json({ result });
//   } catch (error) {
//     console.error("Erreur Gemini:", error);
//     return new NextResponse("Erreur lors de la génération de la réponse", { status: 500 });
//   }
// }
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json()

    const response = await fetch("https://api.mistral.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.MISTRAL_API_KEY}`,
      },
      body: JSON.stringify({
        model: "mistral-small", // ou mistral-medium
        messages,
      }),
    })

    const data = await response.json()
    console.log("✅ Réponse Mistral :", data)

    if (!data.choices || !data.choices[0]) {
      return NextResponse.json({ error: "Pas de réponse du modèle Mistral" }, { status: 500 })
    }

    return NextResponse.json({ result: data.choices[0].message.content })
  } catch (error) {
    console.error("❌ Erreur Mistral:", error)
    return NextResponse.json({ error: "Erreur lors de l’appel à Mistral" }, { status: 500 })
  }
}
