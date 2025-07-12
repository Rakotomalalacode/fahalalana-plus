'use client'

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { Card, CardContent } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import { BookOpenCheck, Loader, MonitorCheck, ShoppingCart } from "lucide-react"
import TowCours from "../autres/TowCours";


type StatsData = {
  totalCourses: number
  enCours: number
  activeDays: number
  dailyActivity: { date: string, courses: number }[]
}

export default function DashboardPage() {
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
    return(
      <div>
        <TowCours />
         <div className="grid w-full grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
      </div>
    )
}