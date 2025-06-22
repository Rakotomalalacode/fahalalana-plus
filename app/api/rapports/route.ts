import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return Response.json({ error: "Unauthorized" }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    })

    const reports = await prisma.report.findMany({
      where: { userId: user?.id },
      orderBy: { createdAt: "desc" },
    })

    return Response.json(reports)
  } catch (error) {
    console.error("Erreur GET /rapports:", error)
    return Response.json({ error: "Erreur serveur" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return Response.json({ error: "Unauthorized" }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    })

    if (!user) {
      return Response.json({ error: "Utilisateur non trouvé" }, { status: 404 })
    }

    // Sécurité : on vérifie si le body est bien du JSON
    const contentType = req.headers.get("content-type")
    if (!contentType || !contentType.includes("application/json")) {
      return Response.json({ error: "Format invalide" }, { status: 400 })
    }

    const body = await req.json()
    const { title, content } = body

    if (!title || !content) {
      return Response.json({ error: "Champs requis manquants" }, { status: 400 })
    }

    const report = await prisma.report.create({
      data: {
        title,
        content,
        userId: user.id,
      },
    })

    return Response.json(report)
  } catch (error) {
    console.error("Erreur POST /rapports:", error)
    return Response.json({ error: "Erreur serveur" }, { status: 500 })
  }
}
