import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  // Récupère tous les cours achetés
  const achats = await prisma.achatCours.findMany({
    where: { userId: session.user.id },
    include: {
      cours: {
        include: {
          sousTitres: true,
          user: true
        },
      },
    },
  });

  // Pour chaque cours, récupérer la progression
  const allProgressions = await prisma.progression.findMany({
    where: {
      userId: session.user.id,
    },
  });

  const data = achats.map((achat) => {
    const total = achat.cours.sousTitres.length;
    const completed = allProgressions.filter(
      (p) => p.coursId === achat.cours.id
    ).length;
    const progress = total > 0 ? Math.round((completed / total) * 100) : 0;

    return {
      coursId: achat.cours.id,
      titre: achat.cours.titre,
      imageUrl: achat.cours.imageUrl,
      enseignant: achat.cours.user.name,
      progress,
    };
  });

  return NextResponse.json(data);
}
