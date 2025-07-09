import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET() {
  const session = await getServerSession(authOptions)
  const userId = session?.user?.id

  if (!userId) return NextResponse.json({ error: "Non autorisé" }, { status: 401 })

  const achats = await prisma.achatCours.findMany({
    where: { userId },
    include: { cours: true },
  })

  const progressions = await prisma.progression.findMany({
    where: { userId },
  })

  // Liste des cours en cours (IDs uniques des cours dans la progression)
  const coursIdsProgress = [...new Set(progressions.map((p) => p.coursId))]

  // Obtenir les jours uniques actifs
  const activeDaysSet = new Set(
    progressions.map((p) => new Date(p.date).toISOString().split("T")[0])
  )

  // Groupement des progressions par jour
  const groupedByDay: Record<string, number> = {}
  progressions.forEach((p) => {
    const date = new Date(p.date).toISOString().split("T")[0]
    groupedByDay[date] = (groupedByDay[date] || 0) + 1
  })

  const dailyActivity = Object.entries(groupedByDay).map(([date, courses]) => ({
    date,
    courses,
  }))

  return NextResponse.json({
    totalCourses: achats.length,
    activeDays: activeDaysSet.size,
    enCours: coursIdsProgress.length,
    dailyActivity,
  })
}
