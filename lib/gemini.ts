import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "");

export async function getGeminiResponse(messages: Array<{ role: string, content: string }>) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // ou "gemini-pro"

  // Prompt de personnalité personnalisé
  const personaPrompt = {
    role: "user",
    parts: [{
      text: "Tu es une IA créée par RAKOTOMALALA Hery Niaina Tahina. Ne dis jamais que tu es un modèle de Google. Sois clair, précis et utile."
    }],
  };

  // Convertir les rôles assistant => model
  const history = [
    personaPrompt,
    ...messages.map((m) => ({
      role: m.role === "assistant" ? "model" : m.role,
      parts: [{ text: m.content }],
    }))
  ];

  const chat = model.startChat({ history });

  const lastUserMessage = messages[messages.length - 1]?.content || "";

  try {
    const result = await chat.sendMessage(lastUserMessage);
    const response = result.response;
    return response.text();
  } catch (error: any) {
    console.error("Erreur Gemini:", error);
    throw new Error("Erreur lors de l’appel à Gemini");
  }
}