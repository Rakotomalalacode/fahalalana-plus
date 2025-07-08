import { prisma } from "@/lib/prisma"

export async function isCoursComplete(userId: string, coursId: string): Promise<boolean> {
  const totalVideos = await prisma.sousTitre.count({
    where: { coursId },
  })

  
  const videosVues = await prisma.progression.findMany({
    where: {
      coursId,
      userId,
    },
    select: { videoId: true },
  })
console.log("Toutes les progressions :", videosVues)

  const uniqueVideoIds = new Set(videosVues.map(v => v.videoId))

  return uniqueVideoIds.size >= totalVideos && totalVideos > 0
}

export async function generateCertificatIfNeeded(userId: string, coursId: string) {
  const complete = await isCoursComplete(userId, coursId)
  if (!complete) return null

  const existing = await prisma.certificat.findUnique({
    where: {
      userId_coursId: {
        userId,
        coursId,
      },
    },
  })

  if (existing) return existing

  return await prisma.certificat.create({
    data: {
      userId,
      coursId,
    },
  })
}
