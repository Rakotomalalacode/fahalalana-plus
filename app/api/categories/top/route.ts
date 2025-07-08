// import { NextResponse } from 'next/server'
// import { prisma } from '@/lib/prisma'

// export async function GET() {
//   try {
//     const categories = await prisma.categorie.findMany({
//       orderBy: {
//         createdAt: 'desc',
//       },
//       take: 8,
//     })

//     return NextResponse.json({ categories })
//   } catch (error) {
//     return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
//   }
// }
// app/api/categories/route.ts

import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    // Récupère toutes les catégories, cours et business
    const categories = await prisma.categorie.findMany({
      orderBy: { createdAt: "desc" },
      take: 8,
    })
    const cours = await prisma.cours.findMany()
    const busines = await prisma.busines.findMany()

    // Associe les stats à chaque catégorie via le champ `nom`
    const categoriesWithStats = categories.map((cat) => {
      const coursCount = cours.filter((c) => c.categorie === cat.nom).length
      const businesCount = busines.filter((b) => b.categorie === cat.nom).length

      return {
        ...cat,
        coursCount,
        businesCount,
      }
    })

    return NextResponse.json(categoriesWithStats, { status: 200 })
  } catch (error) {
    console.error('[CATEGORIES_GET]', error)
    return NextResponse.json({ message: 'Erreur serveur' }, { status: 500 })
  }
}
