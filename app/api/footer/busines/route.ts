// 📁 app/api/busines/top/route.ts
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const topBusines = await prisma.busines.findMany({
      orderBy: {
        lectures: "desc",
      },
      take: 10,
      include: {
        user: true,
      },
    })

    return NextResponse.json(topBusines)
  } catch (error) {
    console.error("Erreur top 10:", error)
    return new NextResponse("Erreur serveur", { status: 500 })
  }
}
