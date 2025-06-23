// app/api/users/count/route.ts
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const [totalTeachers, totalStudents] = await Promise.all([
      prisma.user.count({ where: { role: "teacher" } }),
      prisma.user.count({ where: { role: "student" } }),
    ])

    return NextResponse.json({ totalTeachers, totalStudents })
  } catch (error) {
    console.error("Erreur lors du comptage des utilisateurs :", error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}
