import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return new Response("Unauthorized", { status: 401 })
  }

  const { coursId } = await req.json()

  // Vérifier si le paiement est validé ici (selon ton intégration)

  const achatExistant = await prisma.achatCours.findFirst({
    where: {
      userId: session.user.id,
      coursId,
    }
  })

  if (achatExistant) {
    return NextResponse.json({ error: "Cours déjà acheté" }, { status: 400 })
    //return new Response("Cours déjà acheté", { status: 400 })
  }

  await prisma.achatCours.create({
    data: {
      userId: session.user.id,
      coursId,
    },
  })
  return NextResponse.json({ message: "Achat enregistré" })

  //return new Response("Achat enregistré", { status: 200 })
}

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session) {
    return new Response("Unauthorized", { status: 401 })
  }

  try {
    const mesCours = await prisma.achatCours.findMany({
      where: {
        userId: session.user.id
      },
      include: {
        cours: {
          include: {
            user: true // 👈 ceci récupère les infos du teacher
          }
        }
      }
    })

    return NextResponse.json(mesCours);
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur lors du chargement des cours" },
      { status: 500 }
    );
  }
}