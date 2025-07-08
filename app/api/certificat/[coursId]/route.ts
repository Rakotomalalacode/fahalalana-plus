import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { NextResponse } from "next/server"
import { generateCertificatPDF } from "@/lib/certificat"

type Params = Promise<{ coursId: string }>

export async function GET(_: Request, context : { params: Params }) {
  const session = await getServerSession(authOptions)
  const params = await context.params
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Non connecté" }, { status: 401 })
  }

  const userId = session.user.id
  const coursId = params.coursId

  
  const totalVideos = await prisma.sousTitre.count({
    where: { coursId },
  })

  
  const progressions = await prisma.progression.findMany({
    where: {
      coursId,
      userId,
    },
    select: {
      videoId: true,
      date: true,
    },
  })

  const videoIdsVues = new Set(progressions.map(p => p.videoId))
  const isComplete = videoIdsVues.size >= totalVideos && totalVideos > 0

  if (isComplete) {
    const user = await prisma.user.findUnique({ where: { id: userId } })
    const cours = await prisma.cours.findUnique({ where: { id: coursId } })

    const pdfBytes = await generateCertificatPDF({
      nomUtilisateur: user?.name ?? "Utilisateur",
      titreCours: cours?.titre ?? "Cours",
    })

    return new NextResponse(pdfBytes, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "inline; filename=certificat.pdf",
      },
    })
  }

  
  return NextResponse.json(progressions)
}
