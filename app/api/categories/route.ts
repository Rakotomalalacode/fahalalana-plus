import { NextResponse } from 'next/server'
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function POST(req: Request) {

  const session = await getServerSession(authOptions)

  if (!session || !session.user?.email) {
    return new Response("Unauthorized", { status: 401 })
  }

  const body = await req.json()
  const { nom } = body

  if (!nom || nom.trim() === "") {
    return NextResponse.json({ error: "Le nom est requis" }, { status: 400 })
  }

 const existingCategorie = await prisma.categorie.findFirst({
    where: {
      nom: nom,
    },
  });

  if (existingCategorie) {
    //return new Response("La catégorie existe déjà", { status: 409 }); // 409 = Conflict
    return Response.json({ error: "La catégorie existe déjà" }, { status: 409 });

  }


  try {
    const newCategorie = await prisma.categorie.create({
      data: {
        nom: nom.toLowerCase(),
        usercreat: session.user.email,
      },
    })

    return NextResponse.json(newCategorie)
  } catch (error) {
    console.error("Erreur Prisma:", error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}


export async function GET() {
  try {
    const categories = await prisma.categorie.findMany({
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(categories)
  } catch (error) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}
