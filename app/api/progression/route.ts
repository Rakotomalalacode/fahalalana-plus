import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  const { coursId, videoId, date } = await req.json();

  const existing = await prisma.progression.findFirst({
    where: {
      userId: session.user.id,
      coursId,
      videoId,
    },
  });

  if (!existing) {
    await prisma.progression.create({
      data: {
        userId: session.user.id,
        coursId,
        videoId,
        date: new Date(date),
      },
    });
  }

  return NextResponse.json({ success: true });
}


export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const coursId = searchParams.get("coursId");

  if (!coursId) return NextResponse.json({ error: "coursId manquant" }, { status: 400 });

  const progressions = await prisma.progression.findMany({
    where: {
      userId: session.user.id,
      coursId,
    },
    select: {
      videoId: true,
      date: true,
    },
  });

  return NextResponse.json(progressions);
}
