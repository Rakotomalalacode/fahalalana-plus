// app/api/soustitres/route.ts
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import  cloudinary  from "@/lib/cloudinary"

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
  }

  const formData = await req.formData()
  const titre = formData.get("titrechanger") as string
  const coursId = formData.get("coursId") as string
  const file = formData.get("file") as File

  if (!titre || !coursId || !file) {
    return NextResponse.json({ error: "Champs manquants" }, { status: 400 })
  }

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  const upload = await new Promise<{ secure_url: string; public_id: string }>((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          resource_type: "video",
          folder: "soustitres",
        },
        (error, result) => {
          if (error || !result) return reject(error)
          resolve({
            secure_url: result.secure_url,
            public_id: result.public_id,
          })
        }
      )
      .end(buffer)
  })

  const sousTitre = await prisma.sousTitre.create({
    data: {
      titre,
      coursId,
      videoUrl: upload.secure_url,
      publicId: upload.public_id,
    },
  })

  return NextResponse.json(sousTitre)
}
