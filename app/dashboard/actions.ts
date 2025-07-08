'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function deleteUserAction(formData: FormData) {
  const userId = formData.get("userId") as string
  if (!userId) return

  await prisma.user.delete({ where: { id: userId } })
  revalidatePath("/dashboard")
}

export async function deleteReportAction(formData: FormData) {
  const reportId = formData.get("reportId") as string
  if (!reportId) return

  await prisma.report.delete({ where: { id: reportId } })
  revalidatePath("/dashboard")
}
