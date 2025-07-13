import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const topCours = await prisma.cours.findMany({
      orderBy: [
        {
          achatCours: {
            _count: "desc",
          },
        },
      ],
      take: 10,
      include: {
        user: {
          select: {
            name: true,
            image: true,
          },
        },
        _count: {
          select: {
            achatCours: true,
          },
        },
      },
    })

    return NextResponse.json(topCours)
  } catch (error) {
    console.error("Erreur top cours :", error)
    return new NextResponse("Erreur serveur", { status: 500 })
  }
}
