import { prisma } from "@/lib/prisma"
import cloudinary from "@/lib/cloudinary"
import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { v2 as cloudinaryV2 } from "cloudinary"
import { writeFile } from "fs/promises"
import { randomUUID } from "crypto"

type Params = Promise<{ id: string }>

export async function DELETE(req: Request,  context: { params: Params}) {
    const session = await getServerSession(authOptions)
    const params = await context.params
    if (!session || !session.user?.email) {
        return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    }

    try {
        const busines = await prisma.busines.findUnique({
            where: { id: params.id },
        })

        if (!busines) {
            return NextResponse.json({ error: "Cours non trouvé" }, { status: 404 })
        }

        const files = [
            { url: busines.imageUrl, publicId: busines.imagePublicId },
            { url: busines.introUrl, publicId: busines.introPublicId },
        ];

        for (const file of files) {
            if (file.url && file.publicId) {
                await cloudinary.uploader.destroy(file.publicId);
            }
        }

        if (busines.zipUrl && busines.zipPublicId) {
            await cloudinary.uploader.destroy(busines.zipPublicId, { resource_type: "raw" });
        }

        await prisma.busines.delete({
            where: { id: params.id },
        })

        return NextResponse.json({ success: true })
    } catch (err) {
        console.error("Erreur suppression cours :", err)
        return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
    }
}

export async function PUT(req: Request, context: { params: Params }) {


  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const formData = await req.formData();
      const  params  = await context.params;
  const businesId = params.id;

    const existing = await prisma.busines.findUnique({
      where: { id: businesId },
    });

    if (!existing) return NextResponse.json({ error: "Not Found" }, { status: 404 });

    const titre = formData.get("titre")?.toString() || existing.titre;
    const prix = parseFloat(formData.get("prix")?.toString() || existing.prix.toString());
    const categorie = formData.get("categorie")?.toString() || existing.categorie;
    const description = formData.get("description")?.toString() || existing.description;

    // Zip
    let zipUrl = existing.zipUrl;
    let zipPublicId = existing.zipPublicId;
    const zipFile = formData.get("zip") as File | null;
    if (zipFile && zipFile.size > 0) {
      await cloudinary.uploader.destroy(existing.zipPublicId);
      const buffer = await zipFile.arrayBuffer();
      const result = await cloudinary.uploader.upload_stream({ resource_type: "raw", folder: "busines" }, (error, result) => result);
      const res = await new Promise<any>((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { resource_type: "raw", folder: "busines/zip" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        uploadStream.end(Buffer.from(buffer));
      });
      zipUrl = res.secure_url;
      zipPublicId = res.public_id;
    }

    // Image
    let imageUrl = existing.imageUrl;
    let imagePublicId = existing.imagePublicId;
    const imageFile = formData.get("image") as File | null;
    if (imageFile && imageFile.size > 0) {
      await cloudinary.uploader.destroy(existing.imagePublicId);
      const buffer = await imageFile.arrayBuffer();
      const res = await new Promise<any>((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: "busines/images" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        uploadStream.end(Buffer.from(buffer));
      });
      imageUrl = res.secure_url;
      imagePublicId = res.public_id;
    }

    // Intro
    let introUrl = existing.introUrl;
    let introPublicId = existing.introPublicId;
    const introFile = formData.get("intro") as File | null;
    if (introFile && introFile.size > 0) {
      await cloudinary.uploader.destroy(existing.introPublicId);
      const buffer = await introFile.arrayBuffer();
      const res = await new Promise<any>((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: "busines/intros" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        uploadStream.end(Buffer.from(buffer));
      });
      introUrl = res.secure_url;
      introPublicId = res.public_id;
    }

    const updated = await prisma.busines.update({
      where: { id: businesId },
      data: {
        titre,
        prix,
        categorie,
        description,
        zipUrl,
        zipPublicId,
        imageUrl,
        imagePublicId,
        introUrl,
        introPublicId,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Erreur PUT :", error);
    return NextResponse.json({ error: "Internal Error" }, { status: 500 });
  }
}