import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { subDays, format } from 'date-fns'

export async function GET() {
  const session = await getServerSession(authOptions)

  if (!session?.user || session.user.role !== 'teacher') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const teacherId = session.user.id
  const fromDate = subDays(new Date(), 14)

  const [
    achatsParJour,
    progressionsParJour,
    totalProgressions,
    topCours,
    totalCours,
    totalAchats,
    moyenneProgression,
    coursByTeacher
  ] = await Promise.all([
    prisma.achatCours.findMany({
      where: {
        cours: { userId: teacherId },
        createdAt: { gte: fromDate }
      },
      select: { createdAt: true }
    }),

    prisma.progression.findMany({
      where: {
        cours: { userId: teacherId },
        date: { gte: fromDate }
      },
      select: { date: true }
    }),

    prisma.progression.count({
      where: { cours: { userId: teacherId } }
    }),

    prisma.cours.findMany({
      where: { userId: teacherId },
      orderBy: {
        achatCours: {
          _count: 'desc'
        }
      },
      take: 6,
      select: {
        id: true,
        titre: true,
        prix: true,
        _count: {
          select: {
            achatCours: true
          }
        }
      }
    }),

    prisma.cours.count({ where: { userId: teacherId } }),

    prisma.achatCours.count({
      where: {
        cours: {
          userId: teacherId
        }
      }
    }),

    prisma.progression.groupBy({
      by: ['userId', 'coursId'],
      where: {
        cours: { userId: teacherId }
      },
      _count: {
        videoId: true
      }
    }),

    prisma.cours.findMany({
      where: { userId: teacherId },
      select: {
        id: true,
        titre: true
      }
    })
  ])

  const countByDate = (items: { createdAt?: Date; date?: Date }[]) => {
    const result: Record<string, number> = {}

    items.forEach(item => {
      const date = format(item.createdAt || item.date!, 'yyyy-MM-dd')
      result[date] = (result[date] || 0) + 1
    })

    return Object.entries(result).map(([date, count]) => ({ date, count }))
  }

const coursPourPie = await prisma.cours.findMany({
  where: { userId: teacherId },
  select: { titre: true }
})
const pieCours = coursPourPie.map((c, i) => ({
  name: c.titre,
  value: 1 
}))


  const moyenne = moyenneProgression.length
    ? Math.round(
        (moyenneProgression.reduce((acc, cur) => acc + cur._count.videoId, 0) / moyenneProgression.length) * 100
      ) / 100
    : 0


  return NextResponse.json({
    achats: countByDate(achatsParJour),
    progressions: countByDate(progressionsParJour),
    totalProgressions,
    topCours,
    totalCours,
    totalAchats,
    moyenneProgression: moyenne,
    pieCours
  })
}