import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import cloudinary from '@/lib/cloudinary'
import { prisma } from '@/lib/prisma'


function getFileExtension(filename: string) {
  const parts = filename.split('.')
  return parts[parts.length - 1] || 'jpeg'
}

async function uploadToCloudinaryBase64(fileBuffer: Buffer, filename: string) {
  const fileExt = getFileExtension(filename)
  const base64 = fileBuffer.toString('base64')
  const dataUri = `data:image/${fileExt};base64,${base64}`

  const result = await cloudinary.uploader.upload(dataUri, {
    folder: 'categorie',
    resource_type: 'image',
    public_id: filename.split('.')[0],
  })

  return {
    public_id: result.public_id,
    secure_url: result.secure_url,
  }
}

// POST - Créer une catégorie (si non existante)
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  const formData = await req.formData()

  const nom = formData.get('nom') as string
  const imageFile = formData.get('image') as File

  if (!nom || !imageFile || !session?.user?.email) {
    return NextResponse.json({ message: 'Champs manquants' }, { status: 400 })
  }

  try {
    // Vérifier si une catégorie avec le même nom existe déjà
    const existingCategorie = await prisma.categorie.findFirst({
      where: {
        nom: {
          equals: nom,
          mode: 'insensitive', // insensible à la casse (Maj/Min)
        },
      },
    })

    if (existingCategorie) {
      return NextResponse.json({ message: 'Cette catégorie existe déjà.' }, { status: 409 })
    }

    const buffer = Buffer.from(await imageFile.arrayBuffer())
    const result = await uploadToCloudinaryBase64(buffer, imageFile.name)

    const categorie = await prisma.categorie.create({
      data: {
        nom,
        imageUrl: result.secure_url,
        imageId: result.public_id,
        usercreat: session.user.email,
      },
    })

    return NextResponse.json(
      { message: 'Catégorie créée avec succès', categorie },
      { status: 201 }
    )
  } catch (error) {
    console.error('[CATEGORIE_POST]', error)
    return NextResponse.json({ message: 'Erreur serveur' }, { status: 500 })
  }
}



export async function GET() {
  try {
    const categories = await prisma.categorie.findMany()
    const cours = await prisma.cours.findMany()
    const busines = await prisma.busines.findMany()

    const categoriesWithStats = categories.map((cat) => {
  const coursCount = cours.filter((c) => c.categorie === cat.nom).length // ou String(cat.id)
  const businesCount = busines.filter((b) => b.categorie === cat.nom).length

  return {
    ...cat,
    coursCount,
    businesCount,
  }
})


    return NextResponse.json(categoriesWithStats, { status: 200 })
  } catch (error) {
    console.error('[CATEGORIES_GET]', error)
    return NextResponse.json({ message: 'Erreur serveur' }, { status: 500 })
  }
}
