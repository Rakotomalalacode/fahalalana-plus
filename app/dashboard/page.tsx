"use client"

import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"
import bcrypt from "bcryptjs"

type Pointeur<T> = {
  value: T
}
export default async function Dashboard() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/auth/signin") // redirige si non connecté
  }
  const role = session.user.role
  const hashMotDePasse = await bcrypt.hash(role as string, 10)

  const roleSession = session.user.role as string

  function modifierPointeur(p: Pointeur<string>, roleSession: string) {
    
    if (roleSession === "admin") {
      p.value = "a"
    } else if (roleSession === "teacher") {
      p.value = "t"
    } else {
      p.value = "s"
    } 
  }

  const p: Pointeur<string> = { value: "" }
  modifierPointeur(p, roleSession)

  if (role === 'admin') {
    redirect(`/dashboard/${p.value}?${hashMotDePasse}${session.user.id}=${session.user.email}`)
  } else if (role === 'teacher') {
    redirect(`/dashboard/${p.value}?${hashMotDePasse}${session.user.id}=${session.user.email}`)
  } else {
    redirect(`/dashboard/${p.value}?${hashMotDePasse}${session.user.id}=${session.user.email}`)
  }
}