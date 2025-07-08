'use client'

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { User, ShoppingCart } from "lucide-react"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { AddToCartButton } from "./AddToCartButton"
import { IconLoader } from "@tabler/icons-react"

type Busines = {
  id: string
  titre: string
  prix: number
  imageUrl: string
  lectures: number
  user: {
    name: string | null
  }
}

export default function PopulairesBusiness() {
  const [businesList, setBusinesList] = useState<Busines[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBusines = async () => {
      try {
        const res = await fetch('/api/busines/populaires')
        const data = await res.json()
        setBusinesList(data)
      } catch (err) {
        console.error("Erreur lors du chargement des business :", err)
      } finally {
        setLoading(false)
      }
    }

    fetchBusines()
  }, [])

  if (loading) return <div className="h-[400px] flex justify-center items-center"><IconLoader className="animate-spin h-8 w-8 text-muted-foreground" /></div>

  return (
    <Carousel className="w-full">
      <CarouselContent className="lg:px-4 px-2 py-8">
        {businesList.map((busines, index) => (
          <CarouselItem key={busines.id} className="md:basis-1/2 relative lg:basis-[335px]">
            <div className="lg:w-80 w-[99%] space-y-4 hover:bg-primary-foreground shadow border rounded">
              <Image
                src={busines.imageUrl}
                alt={busines.titre}
                className="w-full rounded-t h-[170px] object-cover"
                width={500}
                height={500}
              />
              {index < 5 && (
                <p className="px-4 absolute top-4 lg:right-4 right-10 py-1 text-green-500 rounded bg-green-100 w-fit h-fit">
                  Nouveau ✨
                </p>
              )}
              <div className="space-y-1 px-4">
                <p className="text-xl font-bold">{busines.titre}</p>
                <p className="flex gap-2 items-center hover:underline">
                  <User size={16} /> {busines.user?.name || "Inconnu"}
                </p>
                <p>
                  <span className="font-bold">{busines.lectures}</span> Lectures •{" "}
                  <span className="font-bold">{busines.prix.toLocaleString()}</span> Ar
                </p>
              </div>
              <hr />
              <div className="flex justify-between px-4 pb-4 items-center">
                <AddToCartButton cours={busines} redirect={false} />
                <Link
                  href="/panier"
                  target="_blank"
                  className="bg-orangeme hover:bg-orangeme/90 rounded text-white py-3 px-4 ml-4 lg:ml-0"
                >
                  <ShoppingCart />
                </Link>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="bg-orangeme rounded text-white border-none" />
      <CarouselNext className="bg-orangeme rounded text-white border-none" />
    </Carousel>
  )
}
