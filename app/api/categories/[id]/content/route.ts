import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

type Params = Promise<{ id: string }>

export async function GET(_: NextRequest, context: { params: Params }) {
  const params = await context.params
  const id = params.id

  try {
    // Trouver le nom de la catégorie à partir de l'ID
    const categorie = await prisma.categorie.findUnique({
      where: { id },
    })

    if (!categorie) {
      return NextResponse.json({ message: "Catégorie introuvable" }, { status: 404 })
    }

    const cours = await prisma.cours.findMany({
      where: {
        categorie: categorie.nom, // ← utiliser le nom ici
      },
      include: {
        user: {
          select: { name: true },
        },
      },
    })

    const busines = await prisma.busines.findMany({
      where: {
        categorie: categorie.nom, // ← utiliser le nom ici
      },
      include: {
        user: {
          select: { name: true },
        },
      },
    })

    return NextResponse.json({ cours, busines })
  } catch (error) {
    console.error("[CATEGORIE_CONTENT]", error)
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 })
  }
}
