'use client'

import { useState } from 'react'
import useSWR from 'swr'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, BarChart, Bar,
  PieChart, Pie, Sector
} from 'recharts'
import { Card, CardContent } from '@/components/ui/card'
import { IconCertificate, IconCoins, IconDeviceTv } from '@tabler/icons-react'

const fetcher = (url: string) => fetch(url).then(res => res.json())

const renderActiveShape = (props: any) => {
  const RADIAN = Math.PI / 180
  const {
    cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
    fill, payload, percent, value
  } = props

  const sin = Math.sin(-RADIAN * midAngle)
  const cos = Math.cos(-RADIAN * midAngle)
  const sx = cx + (outerRadius + 10) * cos
  const sy = cy + (outerRadius + 10) * sin
  const mx = cx + (outerRadius + 30) * cos
  const my = cy + (outerRadius + 30) * sin
  const ex = mx + (cos >= 0 ? 1 : -1) * 22
  const ey = my
  const textAnchor = cos >= 0 ? 'start' : 'end'

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">
        {`Total: ${value}`}
      </text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
        {`(${(percent * 100).toFixed(0)}%)`}
      </text>
    </g>
  )
}

export default function TeacherAnalyticsPage() {
  const { data, error, isLoading } = useSWR('/api/analytics', fetcher)
  const [activeIndex, setActiveIndex] = useState(0)

  if (isLoading) return <p className="text-white">Chargement...</p>
  if (error) return <p className="text-red-500">Erreur de chargement</p>

  const pieData = data.pieCours?.map((item: any) => ({
    name: item.name,
    value: item.value,
  })) || []

  const handlePieEnter = (_: any, index: number) => {
    setActiveIndex(index)
  }

  return (
    <main className=" space-y-4">

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <p className="text-lg font-semibold mb-4">Répartition des cours créés</p>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                activeIndex={activeIndex}
                activeShape={renderActiveShape}
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                onMouseEnter={handlePieEnter}
              />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div>
          <p className="text-lg font-semibold mb-4">Progressions (vidéos vues)</p>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={data.progressions}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="date" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip />
              <Bar dataKey="count" fill="#00ac69" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div>
          <p className="text-lg font-semibold mb-4">Achats de cours (14 derniers jours)</p>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={data.achats}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="date" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip />
              <Line type="monotone" dataKey="count" stroke="#8884d8" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
      </div>
    </main>
  )
}



// 'use client'

// import useSWR from 'swr'
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   PieChart,
//   Pie,
//   Cell,
//   Legend
// } from 'recharts'
// import { Card, CardContent } from '@/components/ui/card'

// const fetcher = (url: string) => fetch(url).then(res => res.json())

// const COLORS = [
//   '#8884d8', '#8dd1e1', '#82ca9d', '#ffc658',
//   '#ff8042', '#d0ed57', '#a4de6c', '#d88884',
//   '#83a6ed', '#8a63d2'
// ]

// function PieCoursChart({ data }: { data?: any[] }) {
//   if (!data || data.length === 0) {
//     return <p className="text-muted">Aucun cours à afficher</p>
//   }

//   const total = data.reduce((acc, item) => acc + item.value, 0)
//   const withPercent = data.map((item) => ({
//     ...item,
//     percent: Math.round((item.value / total) * 100)
//   }))

//   return (
//     <div className="w-full lg:w-[45%]">
//       <p className="text-lg font-semibold mb-2">Répartition des cours créés</p>
//       <ResponsiveContainer width="100%" height={220}>
//         <PieChart>
//           <Pie
//             data={withPercent}
//             dataKey="value"
//             nameKey="name"
//             cx="50%"
//             cy="50%"
//             outerRadius={90}
//             innerRadius={50}
//             paddingAngle={5}
//             label={({ name, percent }) => `${name} (${percent}%)`}
//           >
//             {withPercent.map((entry, index) => (
//               <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//             ))}
//           </Pie>
//           <Tooltip />
//           <Legend />
//         </PieChart>
//       </ResponsiveContainer>
//     </div>
//   )
// }

// export default function AnalyticsPage() {
//   const { data, error, isLoading } = useSWR('/api/analytics', fetcher)

//   if (isLoading) return <p>Chargement...</p>
//   if (error) return <p>Erreur de chargement</p>

//   return (
//     <div className="space-y-4">
//       <h1 className="text-2xl font-bold">Statistiques Enseignant</h1> 

//       <div className="flex flex-col lg:flex-row gap-4 w-full justify-between">
//         <PieCoursChart data={data.pieCours} />

//         <Card className="flex-1">
//           <CardContent className="p-4">
//             <p className="text-lg font-semibold mb-4">Achats de cours (14 derniers jours)</p>
//             <ResponsiveContainer width="100%" height={220}>
//               <LineChart data={data.achats}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="date" />
//                 <YAxis allowDecimals={false} />
//                 <Tooltip />
//                 <Line type="monotone" dataKey="count" stroke="#8884d8" strokeWidth={2} />
//               </LineChart>
//             </ResponsiveContainer>
//           </CardContent>
//         </Card>
//       </div>

//       <Card>
//         <CardContent className="p-4">
//           <p className="text-lg font-semibold mb-4">Progressions (vidéos vues)</p>
//           <ResponsiveContainer width="100%" height={220}>
//             <LineChart data={data.progressions}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="date" />
//               <YAxis allowDecimals={false} />
//               <Tooltip />
//               <Line type="monotone" dataKey="count" stroke="#82ca9d" strokeWidth={2} />
//             </LineChart>
//           </ResponsiveContainer>
//         </CardContent>
//       </Card>
//     </div>
//   )
// }




// 
// 'use client'

// import useSWR from 'swr'
// import {
//   LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
// } from 'recharts'
// import { Card, CardContent } from '@/components/ui/card'

// const fetcher = (url: string) => fetch(url).then(res => res.json())

// export default function AnalyticsPage() {
//   const { data, error, isLoading } = useSWR('/api/analytics', fetcher)

//   if (isLoading) return <p>Chargement...</p>
//   if (error) return <p>Erreur de chargement</p>

//   return (
//     <div className="p-6 space-y-6">
//       <h1 className="text-2xl font-bold">Statistiques Enseignant</h1>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         <Card>
//           <CardContent className="p-4">
//             <p className="text-sm text-muted">Cours créés</p>
//             <p className="text-2xl font-semibold">{data.totalCours}</p>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardContent className="p-4">
//             <p className="text-sm text-muted">Achats de cours</p>
//             <p className="text-2xl font-semibold">{data.totalAchats}</p>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardContent className="p-4">
//             <p className="text-sm text-muted">Vidéos vues</p>
//             <p className="text-2xl font-semibold">{data.totalProgressions}</p>
//           </CardContent>
//         </Card>
//       </div>

//       <Card>
//         <CardContent className="p-4">
//           <p className="text-lg font-semibold mb-2">Progression moyenne</p>
//           <p className="text-3xl font-bold">{data.moyenneProgression} vidéos vues / étudiant</p>
//         </CardContent>
//       </Card>

//       <Card>
//         <CardContent className="p-4">
//           <p className="text-lg font-bold mb-2">Top 5 Cours Populaires</p>
//           <ul className="space-y-2">
//             {data.topCours.map((cours: any) => (
//               <li key={cours.id} className="flex justify-between">
//                 <span>{cours.titre}</span>
//                 <span className="text-sm text-muted">🎓 {cours._count.achatCours} achats</span>
//               </li>
//             ))}
//           </ul>
//         </CardContent>
//       </Card>

//       <Card>
//         <CardContent className="p-4">
//           <p className="text-lg font-semibold mb-4">Achats de cours (14 derniers jours)</p>
//           <ResponsiveContainer width="100%" height={300}>
//             <LineChart data={data.achats}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="date" />
//               <YAxis allowDecimals={false} />
//               <Tooltip />
//               <Line type="monotone" dataKey="count" stroke="#8884d8" strokeWidth={2} />
//             </LineChart>
//           </ResponsiveContainer>
//         </CardContent>
//       </Card>

//       <Card>
//         <CardContent className="p-4">
//           <p className="text-lg font-semibold mb-4">Progressions (vidéos vues)</p>
//           <ResponsiveContainer width="100%" height={300}>
//             <LineChart data={data.progressions}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="date" />
//               <YAxis allowDecimals={false} />
//               <Tooltip />
//               <Line type="monotone" dataKey="count" stroke="#82ca9d" strokeWidth={2} />
//             </LineChart>
//           </ResponsiveContainer>
//         </CardContent>
//       </Card>
//     </div>
//   )
// }
