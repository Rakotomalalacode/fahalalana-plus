"use client"

import { images } from "@/constants/images"
import { IconCertificate, IconLoader } from "@tabler/icons-react"
import { CalendarArrowDown } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

type Categorie = {
  id: number
  nom: string
  createdAt: string
  imageUrl: string
  updatedAt: string
   coursCount: number
  businesCount: number
}

const Categories = () => {
      const [categories, setCategories] = useState<Categorie[]>([])
      const [loading, setLoading] = useState(true)
        const route = useRouter()
      useEffect(() => {
        const fetchCategories = async () => {
          try {
            const res = await fetch("/api/categories")
            const data = await res.json()
            setCategories(data)
          } catch (err) {
            console.error("Erreur lors du chargement des catégories:", err)
          } finally {
            setLoading(false)
          }
        }
    
        fetchCategories()
      }, [])
    return (
        <div className="font-outfit space-y-6">
            <div className="space-y-3 lg:px-9 px-4">
                <h1 className="lg:text-5xl text-3xl">Principales catégories</h1>
            </div> 
            <hr />
            {loading ? (
              <div className="h-[600px] flex justify-center items-center"><IconLoader className="animate-spin h-8 w-8 text-muted-foreground" /></div>
            ) : categories.length === 0 ? (
              <p className="font-outfit">Aucune catégorie trouvée.</p>
            ) : ( 
            <div className="flex flex-wrap space-y-6 lg:space-x-3.5 px-4 justify-center lg:justify-start lg:px-[15px]">

                {categories.map((cat) => (
                <div 
                key={cat.id}
                onClick={()=>route.push(`/categories/${cat.id}`)}
                 className="text-accent-foreground cursor-pointer shadow w-full h-fit lg:w-80 border p-4  rounded space-y-4 hover:bg-primary-foreground">
                    <div className="flex gap-4">
                        <Image src={cat.imageUrl} alt={cat.nom} className="h-20 w-20 rounded-sm object-cover" width={100} height={100} />
                        <div className="flex flex-col gap-3">
                            <p className="text-xl text-black font-meduim">{cat.nom}</p>
                            <div className="flex flex-col text-sm text-gray-600">
                                <p className="flex gap-2 items-center"><CalendarArrowDown size={16} />{new Date(cat.createdAt).toLocaleDateString("fr-FR")}</p>
                                <p className="flex gap-2 items-center"><IconCertificate size={16} />{cat.coursCount} cours - {cat.businesCount} business</p>
                            </div>
                        </div>
                    </div>
                </div>
                 ))}
            </div>
            )}
        </div>
    )
}

export default Categories