import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const totalVideos = await prisma.sousTitre.count();
    const totalTeachers = await prisma.user.count({ where: { role: "teacher" } });
    const totalStudents = await prisma.user.count({ where: { role: "student" } });

    const cours = await prisma.cours.findMany({
      include: {
        sousTitres: true,
        progression: true,
      },
    });

    const finishedCoursCount = cours.filter((cours) => {
      const videos = cours.sousTitres.map((v) => v.id);
      const users = Array.from(
        new Set(cours.progression.map((p) => p.userId))
      );

      return users.some((userId) => {
        const videosVu = cours.progression
          .filter((p) => p.userId === userId)
          .map((p) => p.videoId);
        return videos.every((id) => videosVu.includes(id));
      });
    }).length;

    return NextResponse.json({
      totalVideos,
      totalTeachers,
      totalStudents,
      finishedCoursCount,
    });
  } catch (error) {
    console.error(error);
    return new NextResponse("Erreur lors du chargement des statistiques", { status: 500 });
  }
}
