
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import cloudinary from "@/lib/cloudinary"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)

  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
  }

  try {
    const data = await req.formData()

    const file = data.get("file") as File
    const titre = data.get("titre") as string
    const description = data.get("description") as string
    const categorie = data.get("categorie") as string
    const prix = parseFloat(data.get("prix") as string)

    if (!file || !titre || !description || !categorie || !prix) {
      return NextResponse.json({ error: "Champs manquants" }, { status: 400 })
    }

    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // 🖼️ Upload sur Cloudinary
    const upload = await new Promise<{ secure_url: string; public_id: string }>((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          folder: "cours",
        },
        (error, result) => {
          if (error || !result) {
            return reject(error || new Error("Upload échoué"))
          }
          resolve({
            secure_url: result.secure_url,
            public_id: result.public_id,
          })
        }
      ).end(buffer)
    })

    const user = await prisma.user.findUnique({
      where: { email: session.user.email! },
    })

    const cours = await prisma.cours.create({
      data: {
        titre,
        description,
        imageUrl: upload.secure_url,   // ✅ URL pour l'affichage
        publicId: upload.public_id,    // ✅ nécessaire pour la suppression
        prix,
        categorie,
        userId: user!.id,
      },
    })

    return NextResponse.json(cours)
  } catch (error) {
    console.error("Erreur création de cours:", error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}



export async function GET() {
  try {
    const cours = await prisma.cours.findMany({
      include: {
        user: true,
        sousTitres: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(cours);
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur lors du chargement des cours" },
      { status: 500 }
    );
  }
}


// import { NextResponse } from "next/server"
// import { getServerSession } from "next-auth"
// import { authOptions } from "@/lib/auth"
// import {prisma} from "@/lib/prisma"
// import cloudinary from "@/lib/cloudinary"

// export async function POST(req: Request) {
//   try {
//     const session = await getServerSession(authOptions)

//     if (!session || !session.user?.email) {
//       return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
//     }

//     const formData = await req.formData()

//     const file = formData.get("file") as File
//     const titre = formData.get("titre") as string
//     const description = formData.get("description") as string
//     const categorie = formData.get("categorie") as string
//     const prix = parseFloat(formData.get("prix") as string)

//     if (!file || !titre || !description || !categorie || isNaN(prix)) {
//       return NextResponse.json({ error: "Champs manquants" }, { status: 400 })
//     }

//     // Cloudinary Upload
//     const arrayBuffer = await file.arrayBuffer()
//     const buffer = Buffer.from(arrayBuffer)

//     const uploadResult = await new Promise<any>((resolve, reject) => {
//       cloudinary.uploader.upload_stream(
//         { folder: "cours" },
//         (error, result) => {
//           if (error) reject(error)
//           else resolve(result)
//         }
//       ).end(buffer)
//     })

//     const imageUrl = uploadResult.secure_url

//     const user = await prisma.user.findUnique({
//       where: { email: session.user.email },
//     })

//     if (!user) {
//       return NextResponse.json({ error: "Utilisateur introuvable" }, { status: 404 })
//     }

//     const cours = await prisma.cours.create({
//       data: {
//         titre,
//         description,
//         imageUrl,
//         prix,
//         categorie,
//         userId: user.id,
//       },
//     })

//     return NextResponse.json({ success: true, cours }, { status: 201 })

//   } catch (error) {
//     console.error(error)
//     return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
//   }
// }
