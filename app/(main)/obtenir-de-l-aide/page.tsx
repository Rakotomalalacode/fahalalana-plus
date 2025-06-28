'use client'

import { useEffect, useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Trash2Icon, PencilIcon } from "lucide-react"

interface Busines {
  id: string
  titre: string
  prix: number
  categorie: string
  imageUrl: string
}

export default function BusinesList() {
  const [businesList, setBusinesList] = useState<Busines[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchBusines = async () => {
      try {
        const res = await fetch("/api/busines", { method: "GET" })
        const data = await res.json()
        setBusinesList(data)
      } catch (error) {
        console.error("Erreur :", error)
      } finally {
        setLoading(false)
      }
    }
    fetchBusines()
  }, [])

  const handleDelete = async (id: string) => {
    if (!confirm("Supprimer ce cours ?")) return
    const res = await fetch(`/api/busines/${id}`, { method: "DELETE" })
    if (res.ok) {
      setBusinesList((prev) => prev.filter((b) => b.id !== id))
    } else {
      console.error("Échec de suppression")
    }
  }

  if (loading) {
    return <Skeleton className="w-full h-60 rounded-xl" />
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {businesList.map((b) => (
        <Card key={b.id} className="rounded-xl overflow-hidden shadow">
          <Image src={b.imageUrl} alt={b.titre} width={500} height={300} className="w-full h-[180px] object-cover" />
          <CardContent className="p-4 space-y-1">
            <h3 className="text-lg font-semibold">{b.titre}</h3>
            <p className="text-sm text-muted-foreground">{b.categorie}</p>
            <p className="text-primary font-bold">{b.prix} Ar</p>
            <div className="flex gap-2 mt-3">
              <Button variant="outline" size="sm" onClick={() => router.push(`/dashboard/busines/edit/${b.id}`)}>
                <PencilIcon className="w-4 h-4 mr-1" /> Modifier
              </Button>
              <Button variant="destructive" size="sm" onClick={() => handleDelete(b.id)}>
                <Trash2Icon className="w-4 h-4 mr-1" /> Supprimer
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}



// const Page = () => {
//     return (
//         <div>obtenir-de-l-aide

//             </div>
//     )
// }

// export default Page