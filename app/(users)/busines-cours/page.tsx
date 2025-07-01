"use client"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { images } from "@/constants/images"
import { IconHandClick, IconLoader, IconLoaderQuarter } from "@tabler/icons-react"
import { ShoppingCart, User } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useCart } from "@/components/context/CartContext"
import { AddToCartButton } from "@/components/coursBuy/AddToCartButton"

type Busines = {
  id: string
  titre: string
  prix: number
  categorie: string
  description: string
  imageUrl: string
  createdAt: string
  user: {
    name: string | null
    email: string
    role: string
  }
}

const BusinesCours = () => {
      const [businesList, setBusinesList] = useState<Busines[]>([])
  const [loading, setLoading] = useState(true)
  const { addToCart } = useCart()
  useEffect(() => {
    const fetchBusines = async () => {
      try {
        const res = await fetch("/api/busines/ventes", { cache: "no-store" })
        const data = await res.json()
        const shuffled = data.sort(() => Math.random() - 0.5);
        setBusinesList(shuffled)
      } catch (err) {
        console.error("Erreur lors du chargement des cours :", err)
      } finally {
        setLoading(false)
      }
    }

    fetchBusines()
  }, [])

  if (loading) return <div className="h-[400px] flex justify-center items-center"><IconLoader className="animate-spin h-8 w-8 text-muted-foreground" /></div>

    return (
        <main className="font-outfit">
            <div className="lg:px-9 px-4">
        <div className="block w-full lg:flex space-y-4 justify-between">
          <div className="space-y-3">
            <h1 className="text-5xl">Nos <span className="text-orangeme">Cours</span></h1>
            <p className="text-gray-600 text-lg">Acquérez de nouvelles aptitudes grâce à nos formations récompensées.</p>
          </div>
        </div>
        <hr className="mt-7"/>
        <div className="w-full flex flex-wrap gap-4 py-8 ">
               {businesList.map((busines , index) => (
            <div key={busines.id} className="lg:w-80 relative w-full space-y-4 hover:bg-primary-foreground shadow border rounded">
              <Image src={busines.imageUrl} alt={busines.titre} className="w-full rounded-t h-[170px]" width={500} height={500} />
              {index < 5 && (<p className="px-4 absolute top-4 right-4 py-1 text-green-500 rounded bg-green-100 w-fit h-fit">Nouveau ✨</p>)}
              <div className="space-y-1 px-4">
                <p className="text-xl font-bold">{busines.titre}</p>
                <p className="flex gap-2 items-center hover:underline"><User size={16} />{busines.user.name || "Inconnu"}</p>
                <p><span className="font-bold">45</span> Lectures <span className="font-bold">{busines.prix.toLocaleString()}</span> Ar</p>
              </div>
              <hr />
              <div className="flex justify-between px-4 pb-4 items-center">
                <AddToCartButton cours={busines} redirect={false} />
                <Link href="/panier" target="_blank" className="bg-orangeme hover:bg-orangeme/90 rounded text-white py-3 px-4 ml-4 lg:ml-0"><ShoppingCart /></Link>
              </div>
            </div>
        ))}
        </div>
      </div>
        </main>
    )
}

export default BusinesCours