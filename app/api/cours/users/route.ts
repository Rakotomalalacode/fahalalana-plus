// app/api/cours/route.ts

import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    }

    const userEmail = session.user.email

    const cours = await prisma.cours.findMany({
      where: {
        user: {
          email: userEmail,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json(cours)
  } catch (error) {
    console.error("Erreur récupération cours utilisateur connecté:", error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}
