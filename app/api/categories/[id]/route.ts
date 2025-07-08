import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import cloudinary from '@/lib/cloudinary'

type Params = Promise<{ id: string }>  // id arrive toujours en string dans params

// Convertir l'id string en number, avec gestion erreur type Params = { id: string }
// function parseId(params: Params): number | null {
//   const id = Number(params.id)
//   return isNaN(id) ? null : id
// }

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



// import { NextRequest, NextResponse } from 'next/server'
// import { PrismaClient } from '@prisma/client'
// import cloudinary from '@/lib/cloudinary'
// import { prisma } from "@/lib/prisma"

// type Params = Promise<{ id: number }>

// export async function PUT(req: NextRequest, context : { params: Params }) {
//   const params = await context.params
  

//   const formData = await req.formData()
//   const nom = formData.get('nom') as string
//   const imageFile = formData.get('image') as File | null

//   try {
//     const existingCategorie = await prisma.categorie.findUnique({ where: { id : params.id } })
//     if (!existingCategorie) {
//       return NextResponse.json({ message: 'Catégorie non trouvée' }, { status: 404 })
//     }

//     let imageUrl = existingCategorie.imageUrl
//     let imageId = existingCategorie.imageId

//     if (imageFile) {
//       // Supprimer l'ancienne image
//       if (imageId) await cloudinary.uploader.destroy(imageId)

//       const buffer = Buffer.from(await imageFile.arrayBuffer())
//       const base64 = buffer.toString('base64')
//       const ext = imageFile.name.split('.').pop() || 'jpeg'
//       const dataUri = `data:image/${ext};base64,${base64}`

//       const result = await cloudinary.uploader.upload(dataUri, {
//         folder: 'categorie',
//         resource_type: 'image',
//         public_id: imageFile.name.split('.')[0],
//       })

//       imageUrl = result.secure_url
//       imageId = result.public_id
//     }

//     const updated = await prisma.categorie.update({
//       where: { id : params.id },
//       data: {
//         nom,
//         imageUrl,
//         imageId,
//       },
//     })

//     return NextResponse.json({ message: 'Catégorie mise à jour', categorie: updated })
//   } catch (error) {
//     console.error('[CATEGORIE_PUT]', error)
//     return NextResponse.json({ message: 'Erreur serveur' }, { status: 500 })
//   }
// }


// export async function DELETE(req: NextRequest, context : { params: Params }) {
//    const params = await context.params

//   try {
//     const categorie = await prisma.categorie.findUnique({ where: { id: params.id } })
//     if (!categorie) {
//       return NextResponse.json({ message: 'Catégorie non trouvée' }, { status: 404 })
//     }

//     if (categorie.imageId) {
//       await cloudinary.uploader.destroy(categorie.imageId)
//     }

//     await prisma.categorie.delete({ where: { id : params.id } })

//     return NextResponse.json({ message: 'Catégorie supprimée' }, { status: 200 })
//   } catch (error) {
//     console.error('[CATEGORIE_DELETE]', error)
//     return NextResponse.json({ message: 'Erreur serveur' }, { status: 500 })
//   }
// }

// export async function GET(_: NextRequest, context : { params: Params }) {
//   const params = await context.params

//   try {
//     const categorie = await prisma.categorie.findUnique({ where: { id : params.id } })

//     if (!categorie) {
//       return NextResponse.json({ message: 'Non trouvé' }, { status: 404 })
//     }

//     return NextResponse.json(categorie, { status: 200 })
//   } catch (error) {
//     console.error('[CATEGORIE_GET_ID]', error)
//     return NextResponse.json({ message: 'Erreur serveur' }, { status: 500 })
//   }
// }


// // app/api/categories/[id]/route.ts
// import { NextRequest, NextResponse } from 'next/server'
// import { PrismaClient } from '@prisma/client'
// import { uploadToCloudinary, deleteFromCloudinary}  from '@/lib/cloudinary'
// import { ApiResponse, CategorieResponse } from '@/types/categorie'

// const prisma = new PrismaClient()

// // GET - Récupérer une catégorie par ID
// export async function GET(
//   request: NextRequest,
//   { params }: { params: { id: string } }
// ): Promise<NextResponse<ApiResponse<CategorieResponse>>> {
//   try {
//     const id = parseInt(params.id)

//     if (isNaN(id)) {
//       return NextResponse.json({
//         success: false,
//         error: 'ID invalide'
//       }, { status: 400 })
//     }

//     const categorie = await prisma.categorie.findUnique({
//       where: { id }
//     })

//     if (!categorie) {
//       return NextResponse.json({
//         success: false,
//         error: 'Catégorie non trouvée'
//       }, { status: 404 })
//     }

//     const response: CategorieResponse = {
//       ...categorie,
//       createdAt: categorie.createdAt.toISOString(),
//       updatedAt: categorie.updatedAt.toISOString()
//     }

//     return NextResponse.json({
//       success: true,
//       data: response
//     })
//   } catch (error) {
//     console.error('Error fetching category:', error)
//     return NextResponse.json({
//       success: false,
//       error: 'Failed to fetch category'
//     }, { status: 500 })
//   }
// }

// // PUT - Mettre à jour une catégorie
// export async function PUT(
//   request: NextRequest,
//   { params }: { params: { id: string } }
// ): Promise<NextResponse<ApiResponse<CategorieResponse>>> {
//   try {
//     const id = parseInt(params.id)

//     if (isNaN(id)) {
//       return NextResponse.json({
//         success: false,
//         error: 'ID invalide'
//       }, { status: 400 })
//     }

//     const formData = await request.formData()
//     const nom = formData.get('nom') as string | null
//     const usercreat = formData.get('usercreat') as string | null
//     const image = formData.get('image') as File | null

//     // Vérifier si la catégorie existe
//     const existingCategorie = await prisma.categorie.findUnique({
//       where: { id }
//     })

//     if (!existingCategorie) {
//       return NextResponse.json({
//         success: false,
//         error: 'Catégorie non trouvée'
//       }, { status: 404 })
//     }

//     let imageUrl = existingCategorie.imageUrl
//     let imageId = existingCategorie.imageId

//     // Si une nouvelle image est fournie
//     if (image) {
//       // Supprimer l'ancienne image de Cloudinary
//       if (existingCategorie.imageId) {
//         await deleteFromCloudinary(existingCategorie.imageId)
//       }

//       // Upload de la nouvelle image
//       const buffer = await image.arrayBuffer()
//       const base64 = Buffer.from(buffer).toString('base64')
//       const dataURI = `data:${image.type};base64,${base64}`

//       const uploadResult = await uploadToCloudinary(dataURI, 'categories')
//       imageUrl = uploadResult.secure_url
//       imageId = uploadResult.public_id
//     }

//     const updateData: any = {}
//     if (nom) updateData.nom = nom
//     if (usercreat !== null) updateData.usercreat = usercreat
//     if (image) {
//       updateData.imageUrl = imageUrl
//       updateData.imageId = imageId
//     }

//     const updatedCategorie = await prisma.categorie.update({
//       where: { id },
//       data: updateData
//     })

//     const response: CategorieResponse = {
//       ...updatedCategorie,
//       createdAt: updatedCategorie.createdAt.toISOString(),
//       updatedAt: updatedCategorie.updatedAt.toISOString()
//     }

//     return NextResponse.json({
//       success: true,
//       data: response,
//       message: 'Catégorie mise à jour avec succès'
//     })
//   } catch (error) {
//     console.error('Error updating category:', error)
//     return NextResponse.json({
//       success: false,
//       error: 'Failed to update category'
//     }, { status: 500 })
//   }
// }

// // DELETE - Supprimer une catégorie
// export async function DELETE(
//   request: NextRequest,
//   { params }: { params: { id: string } }
// ): Promise<NextResponse<ApiResponse<null>>> {
//   try {
//     const id = parseInt(params.id)

//     if (isNaN(id)) {
//       return NextResponse.json({
//         success: false,
//         error: 'ID invalide'
//       }, { status: 400 })
//     }

//     // Vérifier si la catégorie existe
//     const existingCategorie = await prisma.categorie.findUnique({
//       where: { id }
//     })

//     if (!existingCategorie) {
//       return NextResponse.json({
//         success: false,
//         error: 'Catégorie non trouvée'
//       }, { status: 404 })
//     }

//     // Supprimer l'image de Cloudinary si elle existe
//     if (existingCategorie.imageId) {
//       await deleteFromCloudinary(existingCategorie.imageId)
//     }

//     // Supprimer la catégorie de la base de données
//     await prisma.categorie.delete({
//       where: { id }
//     })

//     return NextResponse.json({
//       success: true,
//       message: 'Catégorie supprimée avec succès'
//     })
//   } catch (error) {
//     console.error('Error deleting category:', error)
//     return NextResponse.json({
//       success: false,
//       error: 'Failed to delete category'
//     }, { status: 500 })
//   }
// }