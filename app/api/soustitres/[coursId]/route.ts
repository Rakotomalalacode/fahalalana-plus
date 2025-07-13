import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import type { NextRequest } from "next/server";
import  cloudinary  from "@/lib/cloudinary"

type Params = Promise<{ coursId: string }>
export async function GET(
  req: NextRequest,
  context: { params: Params }
) {
  try {
    const params = await context.params
    const  coursId  = params.coursId;

    if (!coursId) {
      return NextResponse.json({ error: "Cours ID manquant" }, { status: 400 });
    }

    const sousTitres = await prisma.sousTitre.findMany({
      where: { coursId },
    });

    return NextResponse.json(sousTitres);
  } catch (error) {
    return NextResponse.json({ error: "Erreur interne" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  context: { params: Params }
) {
  const params = await context.params
  const  coursId  = params.coursId

  if (!coursId) {
    return NextResponse.json({ error: "ID manquant" }, { status: 400 })
  }

  try {
    // Récupérer le sous-titre pour avoir son publicId
    const sousTitre = await prisma.sousTitre.findUnique({
      where: { id: coursId },
    })

    if (!sousTitre) {
      return NextResponse.json({ error: "Sous-titre introuvable" }, { status: 404 })
    }

    // Supprimer le fichier sur Cloudinary si publicId existe
    if (sousTitre.publicId) {
      await cloudinary.uploader.destroy(sousTitre.publicId, {
  resource_type: "video",
})
    }

    // Supprimer l'entrée dans la base de données
    await prisma.sousTitre.delete({
      where: { id: coursId },
    })

    return NextResponse.json({ message: "Sous-titre et fichier supprimés" })
  } catch (error) {
    console.error("Erreur suppression:", error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}
