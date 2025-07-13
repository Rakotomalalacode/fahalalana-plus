import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import cloudinary from '@/lib/cloudinary'

type Params = Promise<{ id: string }>  // id arrive toujours en string dans params

export async function PUT(req: NextRequest, context: { params: Params }) {
  const  params  = await context.params
  const id = params.id

  if (id === null) {
    return NextResponse.json({ message: 'ID invalide' }, { status: 400 })
  }

  const formData = await req.formData()
  const nom = formData.get('nom') as string
  const imageFile = formData.get('image') as File | null

  try {
    const existingCategorie = await prisma.categorie.findUnique({ where: { id } })
    if (!existingCategorie) {
      return NextResponse.json({ message: 'Catégorie non trouvée' }, { status: 404 })
    }

    let imageUrl = existingCategorie.imageUrl
    let imageId = existingCategorie.imageId

    if (imageFile) {
      if (imageId) await cloudinary.uploader.destroy(imageId)

      const buffer = Buffer.from(await imageFile.arrayBuffer())
      const base64 = buffer.toString('base64')
      const ext = imageFile.name.split('.').pop() || 'jpeg'
      const dataUri = `data:image/${ext};base64,${base64}`

      const result = await cloudinary.uploader.upload(dataUri, {
        folder: 'categorie',
        resource_type: 'image',
        public_id: imageFile.name.split('.')[0],
      })

      imageUrl = result.secure_url
      imageId = result.public_id
    }

    const updated = await prisma.categorie.update({
      where: { id },
      data: { nom, imageUrl, imageId },
    })

    return NextResponse.json({ message: 'Catégorie mise à jour', categorie: updated })
  } catch (error) {
    console.error('[CATEGORIE_PUT]', error)
    return NextResponse.json({ message: 'Erreur serveur' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, context: { params: Params }) {
  const  params  = await context.params
  const id = params.id

  if (id === null) {
    return NextResponse.json({ message: 'ID invalide' }, { status: 400 })
  }

  try {
    const categorie = await prisma.categorie.findUnique({ where: { id } })
    if (!categorie) {
      return NextResponse.json({ message: 'Catégorie non trouvée' }, { status: 404 })
    }

    if (categorie.imageId) {
      await cloudinary.uploader.destroy(categorie.imageId)
    }

    await prisma.categorie.delete({ where: { id } })

    return NextResponse.json({ message: 'Catégorie supprimée' }, { status: 200 })
  } catch (error) {
    console.error('[CATEGORIE_DELETE]', error)
    return NextResponse.json({ message: 'Erreur serveur' }, { status: 500 })
  }
}

export async function GET(_: NextRequest, context: { params: Params }) {
  const  params  = await context.params
  const id = params.id

  if (id === null) {
    return NextResponse.json({ message: 'ID invalide' }, { status: 400 })
  }

  try {
    const categorie = await prisma.categorie.findUnique({ where: { id } })

    if (!categorie) {
      return NextResponse.json({ message: 'Catégorie non trouvée' }, { status: 404 })
    }

    return NextResponse.json(categorie, { status: 200 })
  } catch (error) {
    console.error('[CATEGORIE_GET_ID]', error)
    return NextResponse.json({ message: 'Erreur serveur' }, { status: 500 })
  }
}