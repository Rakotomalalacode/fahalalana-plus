import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"


export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session) return new NextResponse("Unauthorized", { status: 401 })

  await prisma.user.update({
    where: { id: session.user.id },
    data: { role: "teacher" },
  })

  return NextResponse.json({ message: "Merci ! Votre rôle a été mis à jour." })
}
