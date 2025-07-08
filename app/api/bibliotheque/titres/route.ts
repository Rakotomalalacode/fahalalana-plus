// app/api/bibliotheque/titres/route.ts
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const cours = await prisma.cours.findMany({ select: { titre: true } })
    const busines = await prisma.busines.findMany({ select: { titre: true } })

    const titres = [...cours, ...busines].map((item) => ({
      value: item.titre.toLowerCase(), // clé de recherche
      label: item.titre               // affichage utilisateur
    }))

    return NextResponse.json(titres)
  } catch (error) {
    console.error("[GET_TITRES]", error)
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 })
  }
}
