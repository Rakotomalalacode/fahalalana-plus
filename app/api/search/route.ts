import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const query = searchParams.get("q")

  if (!query) {
    return NextResponse.json({ cours: [], busines: [] })
  }

  const cours = await prisma.cours.findMany({
    where: {
      titre: {
        contains: query,
        mode: "insensitive"
      }
    },
    select: {
      id: true,
      titre: true,
      categorie: true,
      imageUrl: true,
      prix: true,
      createdAt: true,
    }
  })

  const busines = await prisma.busines.findMany({
    where: {
      titre: {
        contains: query,
        mode: "insensitive"
      }
    },
    select: {
      id: true,
      titre: true,
      categorie: true,
      imageUrl: true,
      prix: true,
      createdAt: true,
    }
  })

  return NextResponse.json({ cours, busines })
}
