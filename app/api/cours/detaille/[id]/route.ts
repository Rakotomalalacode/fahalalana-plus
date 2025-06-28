import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const cours = await prisma.cours.findUnique({
      where: { id: params.id },
      include: {
        sousTitres: true,
        user: true,
      },
    });

    if (!cours) {
      return NextResponse.json({ error: "Cours non trouvé" }, { status: 404 });
    }

    return NextResponse.json(cours);
  } catch (error) {
    console.error("Erreur lors de la récupération du cours :", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
