import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { prisma } from "@/lib/prisma"

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json()

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "Tous les champs sont obligatoires" },
        { status: 400 }
      )
    }

    // Vérifiez si l'utilisateur existe déjà
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json(
        { message: "L'utilisateur existe déjà" },
        { status: 400 }
      )
    }

   // Hachage du mot de passe
    const hashedPassword = await bcrypt.hash(password, 12)

    // Créer un utilisateur
    const user = await prisma.user.create({
      data: {
        name,
        email,
        hashedPassword,
      }
    })

    return NextResponse.json(
      { message: "Utilisateur créé avec succès", userId: user.id },
      { status: 201 }
    )
  } catch (error) {
    console.error("Erreur lors de l'inscription :", error)
    return NextResponse.json(
      { message: "Erreur interne du serveur" },
      { status: 500 }
    )
  }
}