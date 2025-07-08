// app/api/busines/populaires/route.ts

import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const busines = await prisma.busines.findMany({
      orderBy: {
        lectures: "desc", // trié par popularité
      },
      take: 10,
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
    })

    return NextResponse.json(busines, { status: 200 })
  } catch (error) {
    console.error("[BUSINES_POPULAIRES_GET]", error)
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 })
  }
}
