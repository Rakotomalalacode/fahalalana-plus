import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"
import cloudinary from "@/lib/cloudinary"
import { v2 as cloudinaryV2 } from "cloudinary"
import { writeFile } from "fs/promises"
import { randomUUID } from "crypto"

type Params = Promise<{ id: string }>

export async function DELETE(
  req: Request,
  context : { params: Params }
) {
  try {
    const session = await getServerSession(authOptions)
    const params = await context.params
    const id = params.id
    if (!session || !session.user?.id) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    }

    const cours = await prisma.cours.findUnique({
      where: { id },
      include: { sousTitres: true },
    })

    if (!cours) {
      return NextResponse.json({ error: "Cours non trouvé" }, { status: 404 })
    }

    if (cours.userId !== session.user.id) {
      return NextResponse.json({ error: "Action non autorisée" }, { status: 403 })
    }

    for (const st of cours.sousTitres) {
      if (st.publicId) {
        await cloudinary.uploader.destroy(st.publicId, {
          resource_type: "video",
        })
      }
    }


    await prisma.sousTitre.deleteMany({
      where: { coursId: cours.id },
    })

    if (cours.imageUrl && cours.publicId) {
      await cloudinary.uploader.destroy(cours.publicId)
    }

    await prisma.cours.delete({
      where: { id: cours.id },
    })

    return NextResponse.json({ message: "Cours supprimé avec succès" }, { status: 200 })
  } catch (error) {
    console.error("Erreur suppression cours:", error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}

export async function PUT(req: Request, context: { params: Params }) {
  const session = await getServerSession(authOptions)
  const params = await context.params
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  const coursId = params.id
  const formData = await req.formData()

  const titre = formData.get("titre")?.toString() || ""
  const prix = formData.get("prix")?.toString() || ""
  const description = formData.get("description")?.toString() || ""

  const imageFile = formData.get("image") as File | null

  const existingCours = await prisma.cours.findUnique({
    where: { id: coursId },
  })

  if (!existingCours) {
    return NextResponse.json({ message: "Cours non trouvé" }, { status: 404 })
  }

  let imageUrl = existingCours.imageUrl
  let publicId = existingCours.publicId

  if (imageFile && imageFile.size > 0) {
    // Supprimer l'ancienne image de Cloudinary
    if (existingCours.publicId) {
      await cloudinaryV2.uploader.destroy(existingCours.publicId)
    }

    // Uploader la nouvelle image
    const bytes = await imageFile.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const tmpPath = `/tmp/${randomUUID()}-${imageFile.name}`
    await writeFile(tmpPath, buffer)

    const upload = await cloudinary.uploader.upload(tmpPath, {
      folder: "cours",
    })

    imageUrl = upload.secure_url
    publicId = upload.public_id
  }

  const updatedCours = await prisma.cours.update({
    where: { id: coursId },
    data: {
      titre: titre || existingCours.titre,
      prix: prix ? parseFloat(prix) : existingCours.prix,
      description: description || existingCours.description,
      imageUrl,
      publicId,
    },
  })

  return NextResponse.json(updatedCours)
}
