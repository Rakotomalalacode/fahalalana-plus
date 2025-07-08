// app/api/bibliotheque/route.ts
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const [categories, cours, busines] = await Promise.all([
  prisma.categorie.findMany(),
  prisma.cours.findMany(),
  prisma.busines.findMany()
])

    const data = categories.map((cat) => {
      const coursList = cours.filter((c) => c.categorie === cat.nom)
      const businesList = busines.filter((b) => b.categorie === cat.nom)

      return {
        id: cat.id,
        nom: cat.nom,
        cours: coursList.map((c) => ({ id: c.id, titre: c.titre })),
        busines: businesList.map((b) => ({ id: b.id, titre: b.titre })),
      }
    })

    return NextResponse.json(data, { status: 200 })
  } catch (error) {
    console.error("[GET_BIBLIOTHEQUE]", error)
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 })
  }
}
