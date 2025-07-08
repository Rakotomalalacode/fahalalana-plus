import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import cloudinary from '@/lib/cloudinary'
// import { v2 as cloudinary } from "cloudinary";
import { writeFile } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";
import fs from "fs";

// 🔁 Fonction inline d’upload
async function uploadToCloudinary(filePath: string, folder = "videos") {
  return await cloudinary.uploader.upload(filePath, {
    folder,
    resource_type: "auto",
  });
}

// ❌ Fonction inline de suppression
async function deleteFromCloudinary(publicId: string) {
  return await cloudinary.uploader.destroy(publicId, {
    resource_type: "video", // peut être "image" si tu veux supprimer une miniature
  });
}
export async function POST(req: NextRequest) {
  const formData = await req.formData();

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const file = formData.get("video") as File | null;
  const thumb = formData.get("thumbnail") as File | null;

  if (!file) {
    return NextResponse.json({ error: "Aucune vidéo envoyée." }, { status: 400 });
  }

  const bufferVideo = Buffer.from(await file.arrayBuffer());

  let bufferThumb: Buffer | null = null;
  if (thumb) {
    bufferThumb = Buffer.from(await thumb.arrayBuffer());
  }

  const tempVideoPath = path.join("/tmp", `${randomUUID()}-${file.name}`);
  const tempThumbPath = thumb ? path.join("/tmp", `${randomUUID()}-${thumb.name}`) : null;

  await writeFile(tempVideoPath, bufferVideo);
  if (thumb && bufferThumb && tempThumbPath) {
    await writeFile(tempThumbPath, bufferThumb);
  }

  // Upload vers Cloudinary
  const uploadedVideo = await uploadToCloudinary(tempVideoPath, "videos");
  fs.unlinkSync(tempVideoPath);

  let uploadedThumb = null;
  if (thumb && tempThumbPath) {
    uploadedThumb = await uploadToCloudinary(tempThumbPath, "videos");
    fs.unlinkSync(tempThumbPath);
  }

  // Sauvegarde en base
  const video = await prisma.video.create({
    data: {
      title,
      description,
      videoUrl: uploadedVideo.secure_url,
      videoPublicId: uploadedVideo.public_id,
      thumbnail: uploadedThumb?.secure_url || "",
      thumbnailPublicId: uploadedThumb?.public_id || "",
    },
  });

  return NextResponse.json(video);
}

// // 🚀 POST - Ajouter une nouvelle vidéo
// export async function POST(req: NextRequest) {
//   const formData = await req.formData();
//   const file = formData.get("video") as File;
//   const thumb = formData.get("thumbnail") as File;
//   const title = formData.get("title") as string;
//   const description = formData.get("description") as string;

//   const bufferVideo = Buffer.from(await file.arrayBuffer());
//   const bufferThumb = Buffer.from(await thumb.arrayBuffer());

//   const tempVideoPath = path.join("/tmp", `${randomUUID()}-${file.name}`);
//   const tempThumbPath = path.join("/tmp", `${randomUUID()}-${thumb.name}`);

//   await writeFile(tempVideoPath, bufferVideo);
//   await writeFile(tempThumbPath, bufferThumb);

//   const videoUpload = await uploadToCloudinary(tempVideoPath, "videos");
//   const thumbUpload = await uploadToCloudinary(tempThumbPath, "videos");

//   fs.unlinkSync(tempVideoPath);
//   fs.unlinkSync(tempThumbPath);

//   const newVideo = await prisma.video.create({
//     data: {
//       title,
//       description,
//       videoUrl: videoUpload.secure_url,
//       videoPublicId: videoUpload.public_id,
//       thumbnail: thumbUpload.secure_url,
//       thumbnailPublicId: thumbUpload.public_id,
//     },
//   });

//   return NextResponse.json(newVideo);
// }


// 📥 GET - Toutes les vidéos
export async function GET() {
  try {
    const videos = await prisma.video.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(videos);
  } catch (error) {
    console.error("[GET VIDEOS]", error);
    return new NextResponse("Erreur lors de la récupération des vidéos", {
      status: 500,
    });
  }
}
