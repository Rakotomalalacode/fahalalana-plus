import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import cloudinary from "@/lib/cloudinary";
import { writeFile } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";
import fs from "fs";

type Params = Promise<{ id: string }>;

async function uploadToCloudinary(filePath: string, folder = "videos") {
  return await cloudinary.uploader.upload(filePath, {
    folder,
    resource_type: "auto",
  });
}

//  Amélioration : supporte les deux types de fichiers (image et vidéo)
async function deleteFromCloudinary(publicId: string, resourceType: "image" | "video") {
  if (!publicId) return;
  return await cloudinary.uploader.destroy(publicId, {
    resource_type: resourceType,
  });
}

// PUT - Mettre à jour vidéo + miniature si modifiée
export async function PUT(req: NextRequest, context: { params: Params }) {
  const params = await context.params;
  const id = params.id;

  const existing = await prisma.video.findUnique({ where: { id } });
  if (!existing)
    return NextResponse.json({ error: "Vidéo introuvable" }, { status: 404 });

  const formData = await req.formData();
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const newVideo = formData.get("video") as File | null;
  const newThumb = formData.get("thumbnail") as File | null;

  let videoUrl = existing.videoUrl;
  let videoPublicId = existing.videoPublicId;
  let thumbnail = existing.thumbnail;
  let thumbnailPublicId = existing.thumbnailPublicId;

  //  Remplacement de la vidéo
  if (newVideo && typeof newVideo.name === "string") {
    await deleteFromCloudinary(videoPublicId, "video");

    const buffer = Buffer.from(await newVideo.arrayBuffer());
    const tempPath = path.join("/tmp", `${randomUUID()}-${newVideo.name}`);
    await writeFile(tempPath, buffer);

    const uploaded = await uploadToCloudinary(tempPath, "videos");
    fs.unlinkSync(tempPath);

    videoUrl = uploaded.secure_url;
    videoPublicId = uploaded.public_id;
  }

  //  Remplacement de la miniature
  if (newThumb && typeof newThumb.name === "string") {
    await deleteFromCloudinary(thumbnailPublicId, "image");

    const buffer = Buffer.from(await newThumb.arrayBuffer());
    const tempPath = path.join("/tmp", `${randomUUID()}-${newThumb.name}`);
    await writeFile(tempPath, buffer);

    const uploaded = await uploadToCloudinary(tempPath, "videos");
    fs.unlinkSync(tempPath);

    thumbnail = uploaded.secure_url;
    thumbnailPublicId = uploaded.public_id;
  }

  const updated = await prisma.video.update({
    where: { id },
    data: {
      title,
      description,
      videoUrl,
      videoPublicId,
      thumbnail,
      thumbnailPublicId,
    },
  });

  return NextResponse.json(updated);
}

// DELETE - Supprimer la vidéo et la miniature de Cloudinary
export async function DELETE(req: NextRequest, context: { params: Params }) {
  const params = await context.params;
  const id = params.id;

  const existing = await prisma.video.findUnique({ where: { id } });
  if (!existing)
    return NextResponse.json({ error: "Not found" }, { status: 404 });

  //  Suppression sécurisée de chaque fichier
  await deleteFromCloudinary(existing.videoPublicId, "video");
  await deleteFromCloudinary(existing.thumbnailPublicId, "image");

  await prisma.video.delete({ where: { id } });

  return NextResponse.json({ message: "Vidéo supprimée" });
}
