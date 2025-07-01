import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const cours = await prisma.busines.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
      },
    })

    return NextResponse.json(cours)
  } catch (error) {
    console.error("[BUSINES_GET]", error)
    return new NextResponse("Erreur lors de la récupération des cours", { status: 500 })
  }
}
