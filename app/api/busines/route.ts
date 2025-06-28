import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"
import { v2 as cloudinary } from "cloudinary"

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
  }

  const formData = await req.formData()

  const titre = formData.get("titre") as string
  const prix = parseFloat(formData.get("prix") as string)
  const categorie = formData.get("categorie") as string
  const description = formData.get("description") as string

  const zip = formData.get("zip") as File
  const image = formData.get("image") as File
  const intro = formData.get("intro") as File

  if (!zip || !image || !intro || !titre || !categorie || !description || isNaN(prix)) {
    return NextResponse.json({ error: "Champs manquants ou invalides" }, { status: 400 })
  }

  const uploadToCloudinary = async (file: File, folder: string) => {
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    return new Promise<{ url: string; public_id: string }>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            resource_type: "auto",
            folder,
          },
          (error, result) => {
            if (error || !result) return reject(error)
            resolve({ url: result.secure_url, public_id: result.public_id })
          }
        )
        .end(buffer)
    })
  }

  try {
    const [zipUploaded, imageUploaded, introUploaded] = await Promise.all([
      uploadToCloudinary(zip, "busines/zip"),
      uploadToCloudinary(image, "busines/images"),
      uploadToCloudinary(intro, "busines/intros"),
    ])

    const cours = await prisma.busines.create({
      data: {
        titre,
        prix,
        categorie,
        description,
        zipUrl: zipUploaded.url,
        zipPublicId: zipUploaded.public_id,
        imageUrl: imageUploaded.url,
        imagePublicId: imageUploaded.public_id,
        introUrl: introUploaded.url,
        introPublicId: introUploaded.public_id,
        user: {
          connect: { email: session.user.email! },
        },
      },
    })

    return NextResponse.json(cours, { status: 201 })
  } catch (error) {
    console.error("Erreur création cours:", error)
    return NextResponse.json({ error: "Erreur lors de l'ajout du cours" }, { status: 500 })
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    }

    const userEmail = session.user.email

    const cours = await prisma.busines.findMany({
      where: {
        user: {
          email: userEmail,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json(cours)
  } catch (error) {
    console.error("Erreur récupération cours utilisateur connecté:", error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}


// export async function GET() {
//   try {
//     const cours = await prisma.busines.findMany({
//       orderBy: { createdAt: "desc" },
//       select: {
//         id: true,
//         titre: true,
//         prix: true,
//         categorie: true,
//         imageUrl: true,
//         createdAt :true,
//         description: true
//       },
//     })

//     return NextResponse.json(cours)
//   } catch (error) {
//     console.error("Erreur chargement busines:", error)
//     return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
//   }
// }
