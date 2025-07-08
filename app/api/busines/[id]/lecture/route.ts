// app/api/busines/[id]/lecture/route.ts
import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

type Params = Promise<{ id: string }>

export async function POST(
  req: NextRequest,
     context : { params: Params }
) {
  const params = await context.params
  
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 })
  }

  const businesId = params.id

  try {
    await prisma.busines.update({
      where: { id: businesId },
      data: {
        lectures: { increment: 1 }
      }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}
