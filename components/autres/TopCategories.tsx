'use client'

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { IconCertificate, IconLoader } from "@tabler/icons-react"
import { CalendarArrowDown } from "lucide-react"
import { useRouter } from "next/navigation"

type Categorie = {
  id: string
  nom: string
  imageUrl?: string
  coursCount: number
  businesCount: number
  createdAt : string
}



export default function TopCategories() {
  const [categories, setCategories] = useState<Categorie[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
    const route = useRouter()
  useEffect(() => {
  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/categories/top')
      const data = await res.json()

      // ⚠️ Vérifie si c’est un tableau direct ou dans data.categories
      const catList = Array.isArray(data) ? data : data.categories

      setCategories(catList.slice(0, 8))
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  fetchCategories()
}, [])


  if (loading) return <div className="h-[400px] flex justify-center items-center"><IconLoader className="animate-spin h-8 w-8 text-muted-foreground" /></div>
  if (error) return <div className="h-[400px] flex justify-center items-center"><IconLoader className="animate-spin h-8 w-8 text-muted-foreground" /></div>

  return (
    <section className="py-10 space-y-7 px-4 lg:px-9 bg-[#06141c]">
      <div className="text-white">
        <h2 className="text-3xl font-bold text-orangeme">
        Top Catégories
      </h2>
      <p>Parcourez nos catégories pour naviguer facilement parmi nos meilleurs cours</p>
      </div>
      <div className="grid grid-cols-1 dm:grid-cols-3 lg:grid-cols-4 gap-4">
        {categories.map((cat) => (
            <div key={cat.id} onClick={()=>route.push(`/categories/${cat.id}`)} className="bg-white border cursor-pointer flex lg:gap-3 gap-6 hover:bg-primary-foreground p-4 rounded overflow-hidden hover:shadow-lg transition-shadow">
              {cat.imageUrl ? (
                <Image
                  src={cat.imageUrl}
                  alt={cat.nom}
                  width={300}
                  height={200}
                  className="w-26 rounded h-16 object-cover"
                />
              ) : (
                <div className="w-full h-40 bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500">
                  Pas d’image
                </div>
              )}
              <div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                  {cat.nom.slice(0, 13)}
                </h3>
                <div className="flex flex-col text-sm text-gray-600">
                                <p className="flex gap-2 items-center"><CalendarArrowDown size={16} />{new Date(cat.createdAt).toLocaleDateString("fr-FR")}</p>
                                <p className="flex gap-2 items-center"><IconCertificate size={16} />{cat.coursCount} cours - {cat.businesCount} business</p>
                            </div>
                <p></p>
              </div>
            </div>
        ))}
      </div>
    </section>
  )
}
