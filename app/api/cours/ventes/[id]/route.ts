import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
type Params = Promise<{ id: string }>
export async function GET(
  req: Request,
  context : { params: Params }
) {
  try {
    const params = await context.params
    const id =  params.id
    const cours = await prisma.cours.findUnique({
      where: { id },
      include: {
        user: { select: { name: true, email: true } },
        sousTitres: true,
      },
    })

    if (!cours) {
      return NextResponse.json({ error: "Cours non trouvé" }, { status: 404 })
    }

    return NextResponse.json(cours)
  } catch (error) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}
