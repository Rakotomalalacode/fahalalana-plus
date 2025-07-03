'use client'

import useSWR from 'swr'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Card, CardContent } from '@/components/ui/card'
import { IconCertificate, IconCoins, IconDeviceTv } from '@tabler/icons-react'
import {
    PieChart, Pie, Sector, ResponsiveContainer, Cell, Legend
} from 'recharts'
import { useState } from 'react'


const fetcher = (url: string) => fetch(url).then(res => res.json())

const COLORS = [
    '#8884d8', '#8dd1e1', '#82ca9d', '#ffc658',
    '#ff8042', '#d0ed57', '#a4de6c', '#d88884',
    '#83a6ed', '#8a63d2'
]

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
            <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill} className="text-lg font-bold">
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
                startAngle={startAngle}
                endAngle={endAngle}
                innerRadius={outerRadius + 6}
                outerRadius={outerRadius + 10}
                fill={fill}
            />
            <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
            <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`Vues ${value}`}</text>
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
                {`(${(percent * 100).toFixed(0)}%)`}
            </text>
        </g>
    )
}

function CustomProgressionPieChart({ value }: { value: number }) {
    const max = 10
    const [activeIndex, setActiveIndex] = useState(0)

    const data = [
        { name: 'Vidéos vues', value },
        { name: 'Reste', value: Math.max(max - value, 0) }
    ]

    const onPieEnter = (_: any, index: number) => {
        setActiveIndex(index)
    }

    return (
        <div className="shadow-none">
            <p className="text-lg font-semibold">Progression moyenne</p>
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie
                        activeIndex={activeIndex}
                        activeShape={renderActiveShape}
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        dataKey="value"
                        onMouseEnter={onPieEnter}
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
        </div>
    )
}


const Dashboard = () => {
    const { data, error, isLoading } = useSWR('/api/analytics', fetcher)

    if (isLoading) return <p>Chargement...</p>
    if (error) return <p>chargement....</p>

    return (
        <div className="space-y-4">
            <h1 className="text-2xl font-bold">Statistiques Enseignant</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-[#3366ff] border-none text-white shadow-none">
                    <CardContent className="p-4">
                        <p className="text-lg flex gap-2"><IconCertificate /> Cours créés</p>
                        <p className="text-2xl font-semibold">{data.totalCours - 1} +</p>
                    </CardContent>
                </Card>

                <Card className="bg-[#f4a100] border-none text-white shadow-none">
                    <CardContent className="p-4 ">
                        <p className="text-lg flex gap-2"><IconCoins /> Achats de cours</p>
                        <p className="text-2xl font-semibold">{data.totalAchats - 1} +</p>
                    </CardContent>
                </Card>

                <Card className="bg-[#00ac69] border-none text-white shadow-none">
                    <CardContent className="p-4">
                        <p className="text-lg flex gap-2"><IconDeviceTv /> Vidéos vues</p>
                        <p className="text-2xl font-semibold">{data.totalProgressions - 1} +</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <CustomProgressionPieChart value={data.moyenneProgression} />


                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className='w-[250px]'>Titre</TableHead>
                            <TableHead className='w-[250px]'>Achats</TableHead>
                            <TableHead className='w-[250px]'>Revenus</TableHead>
                            <TableHead className="text-right">Prix</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.topCours.map((cours: any) => (
                            <Tooltip key={cours.id}>
                                <TooltipTrigger asChild>
                                    <TableRow className="cursor-pointer hover:bg-muted transition-colors">
                                        <TableCell className="font-medium">
                                            {cours.titre.length > 20 ? `${cours.titre.slice(0, 20)}...` : cours.titre}
                                        </TableCell>
                                        <TableCell>{cours._count.achatCours}</TableCell>
                                        <TableCell>{(cours.prix * cours._count.achatCours).toFixed(2)} Ar</TableCell>
                                        <TableCell className="text-right">{cours.prix} Ar</TableCell>
                                    </TableRow>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>{cours.titre}</p>
                                </TooltipContent>
                            </Tooltip>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

export default Dashboard