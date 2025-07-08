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

// export async function GET() {
//   try {
//     // Supprime temporairement orderBy pour test
//     const categories = await prisma.categorie.findMany()
//     return NextResponse.json(categories, { status: 200 })
//   } catch (error) {
//     console.error('[CATEGORIES_GET]', error)
//     return NextResponse.json({ message: 'Erreur serveur' }, { status: 500 })
//   }
// }

// export async function GET() {
//   try {
//     const categories = await prisma.categorie.findMany({
//       orderBy: { createdAt: 'desc' },
//     })

//     return NextResponse.json(categories, { status: 200 })
//   } catch (error) {
//     console.error('[CATEGORIES_GET]', error)
//     return NextResponse.json({ message: 'Erreur serveur' }, { status: 500 })
//   }
// }


// import { NextResponse } from 'next/server'
// import { prisma } from "@/lib/prisma"
// import { getServerSession } from "next-auth"
// import { authOptions } from "@/lib/auth"

// export async function POST(req: Request) {

//   const session = await getServerSession(authOptions)

//   if (!session || !session.user?.email) {
//     return new Response("Unauthorized", { status: 401 })
//   }

//   const body = await req.json()
//   const { nom } = body

//   if (!nom || nom.trim() === "") {
//     return NextResponse.json({ error: "Le nom est requis" }, { status: 400 })
//   }

//  const existingCategorie = await prisma.categorie.findFirst({
//     where: {
//       nom: nom,
//     },
//   });

//   if (existingCategorie) {
//     //return new Response("La catégorie existe déjà", { status: 409 }); // 409 = Conflict
//     return Response.json({ error: "La catégorie existe déjà" }, { status: 409 });

//   }


//   try {
//     const newCategorie = await prisma.categorie.create({
//       data: {
//         nom: nom.toLowerCase(),
//         usercreat: session.user.email,
//       },
//     })

//     return NextResponse.json(newCategorie)
//   } catch (error) {
//     console.error("Erreur Prisma:", error)
//     return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
//   }
// }


// export async function GET() {
//   try {
//     const categories = await prisma.categorie.findMany({
//       orderBy: { createdAt: 'desc' }
//     })
//     return NextResponse.json(categories)
//   } catch (error) {
//     return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
//   }
// }


// app/api/categories/route.ts
// import { NextRequest, NextResponse } from 'next/server'
// import { PrismaClient } from '@prisma/client'
// import  {uploadToCloudinary}  from '@/lib/cloudinary'
// import { ApiResponse, CategorieResponse } from '@/types/categorie'

// const prisma = new PrismaClient()

// // GET - Récupérer toutes les catégories
// export async function GET(): Promise<NextResponse<ApiResponse<CategorieResponse[]>>> {
//   try {
//     const categories = await prisma.categorie.findMany({
//       orderBy: { createdAt: 'desc' }
//     })

//     const formattedCategories: CategorieResponse[] = categories.map(cat => ({
//       ...cat,
//       createdAt: cat.createdAt.toISOString(),
//       updatedAt: cat.updatedAt.toISOString()
//     }))

//     return NextResponse.json({
//       success: true,
//       data: formattedCategories
//     })
//   } catch (error) {
//     console.error('Error fetching categories:', error)
//     return NextResponse.json({
//       success: false,
//       error: 'Failed to fetch categories'
//     }, { status: 500 })
//   }
// }

// // POST - Créer une nouvelle catégorie
// export async function POST(request: NextRequest): Promise<NextResponse<ApiResponse<CategorieResponse>>> {
//   try {
//     const formData = await request.formData()
//     const nom = formData.get('nom') as string
//     const usercreat = formData.get('usercreat') as string | null
//     const image = formData.get('image') as File | null

//     if (!nom) {
//       return NextResponse.json({
//         success: false,
//         error: 'Le nom de la catégorie est requis'
//       }, { status: 400 })
//     }

//     let imageUrl: string | null = null
//     let imageId: string | null = null

//     // Upload image to Cloudinary if provided
//     if (image) {
//       const buffer = await image.arrayBuffer()
//       const base64 = Buffer.from(buffer).toString('base64')
//       const dataURI = `data:${image.type};base64,${base64}`

//       const uploadResult = await uploadToCloudinary(dataURI, 'categories')
//       imageUrl = uploadResult.secure_url
//       imageId = uploadResult.public_id
//     }

//     const categorie = await prisma.categorie.create({
//       data: {
//         nom,
//         imageUrl,
//         imageId,
//         usercreat
//       }
//     })

//     const response: CategorieResponse = {
//       ...categorie,
//       createdAt: categorie.createdAt.toISOString(),
//       updatedAt: categorie.updatedAt.toISOString()
//     }

//     return NextResponse.json({
//       success: true,
//       data: response,
//       message: 'Catégorie créée avec succès'
//     })
//   } catch (error) {
//     console.error('Error creating category:', error)
//     return NextResponse.json({
//       success: false,
//       error: 'Failed to create category'
//     }, { status: 500 })
//   }
// }