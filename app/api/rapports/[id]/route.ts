import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    })

    if (!user) {
      return NextResponse.json({ error: "Utilisateur non trouvé" }, { status: 404 })
    }

    const report = await prisma.report.findFirst({
      where: {
        id: params.id,
        userId: user.id,
      },
    })

    if (!report) {
      return NextResponse.json({ error: "Rapport non trouvé" }, { status: 404 })
    }

    return NextResponse.json(report)
  } catch (error) {
    console.error("Erreur GET /rapports/[id]:", error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  const { title, content } = await req.json()

  const user = await prisma.user.findUnique({
    where: { email: session?.user?.email || "" },
  })

  const updated = await prisma.report.updateMany({
    where: { id: params.id, userId: user?.id },
    data: { title, content },
  })

  return Response.json(updated)
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  const user = await prisma.user.findUnique({
    where: { email: session?.user?.email || "" },
  })

  const deleted = await prisma.report.deleteMany({
    where: { id: params.id, userId: user?.id },
  })

  return Response.json(deleted)
}
