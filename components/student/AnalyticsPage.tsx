'use client'

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { Card, CardContent } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import { BookOpenCheck, Loader, MonitorCheck, ShoppingCart } from "lucide-react"

type StatsData = {
  totalCourses: number
  enCours: number
  activeDays: number
  dailyActivity: { date: string, courses: number }[]
}

export default function AnalyticsPage() {
  const { data: session } = useSession()
  const [stats, setStats] = useState<StatsData | null>(null)

  useEffect(() => {
    fetch("/api/student/stats")
      .then((res) => res.json())
      .then(setStats)
  }, [])

  if (!stats) return (
    <div className="flex w-ful h-screen justify-center items-center">
            <Loader className="animate-spin h-8 w-8 text-muted-foreground" />
        </div>
  )

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Mes statistiques</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="bg-[#8B5CF6] flex justify-between py-4 items-center pr-4 rounded text-white">
          <CardContent>
            <p className="text-xl">Cours achetés</p>
            <p className="text-xl font-bold">{stats.totalCourses}</p>
          </CardContent>
          <ShoppingCart />
        </div> 
        <div className="bg-[#06B6D4] flex justify-between py-4 items-center pr-4 rounded text-white">
          <CardContent >
            <p className="text-xl">Cours en cours</p>
            <p className="text-xl font-bold">{stats.enCours}</p>
          </CardContent>
          <BookOpenCheck />
        </div>
        <div className="bg-[#10B981] flex justify-between py-4 items-center pr-4 rounded text-white"> 
          <CardContent>
            <p className="text-xl">Jours actifs</p>
            <p className="text-xl font-bold">{stats.activeDays}</p>
          </CardContent>
          <MonitorCheck />
        </div>
      </div>

      <div className="">
        <h2 className="text-lg font-semibold mb-2">Activité quotidienne</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={stats.dailyActivity}>
            <XAxis dataKey="date" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="courses" fill="#4f46e5" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
