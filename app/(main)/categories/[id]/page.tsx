"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { CalendarArrowDown, Timer, User, ShoppingCart } from "lucide-react"
import { AddToCartButton } from "@/components/coursBuy/AddToCartButton"
import { IconLoader } from "@tabler/icons-react"
import InstructorComp from "@/components/autres/InstructorComp";
import AdhesionComp from "@/components/autres/AdhesionComp"

type CoursType = {
  id: string
  titre: string
  description: string
  imageUrl: string
  createdAt: string
}

type BusinesType = {
  id: string
  titre: string
  description: string
  imageUrl: string
  prix: number
  lectures: number
  createdAt: string
  user: {
    name: string
  }
}

const PageCategorie = () => {
  const { id } = useParams()
  const [cours, setCours] = useState<CoursType[]>([])
  const [busines, setBusines] = useState<BusinesType[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/categories/${id}/content`)
        const data = await res.json()
        console.log("Résultat API :", data)
        setCours(data.cours || [])
        setBusines(data.busines || [])
      } catch (err) {
        console.error("Erreur de récupération:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [id])


  const handleClick = (id: string) => {
    window.location.href = `/detail-cours/${id}`
  }

  return (
    <div className="lg:px-9 px-4 font-outfit space-y-10">
      {loading ? (
        <div className="h-screen flex justify-center items-center"><IconLoader className="animate-spin h-8 w-8 text-muted-foreground" /></div>
      ) : (
        <>
          <div className="space-y-6">
            <h1 className="text-5xl font-medium">Formations</h1>
            <p className="text-gray-600 text-lg">
              Acquérez de nouvelles aptitudes grâce à nos formations récompensées.
            </p>
            <hr />
            <div className="flex flex-wrap space-y-6 h-fit lg:space-x-3.5 justify-center lg:justify-start lg:px-0">
              {cours.map((cours, index) => (
                <div
                  key={cours.id}
                  onClick={() => handleClick(cours.id)}
                  className="cursor-pointer shadow w-full lg:w-[307.7px] h-fit border p-4 rounded space-y-4 hover:bg-primary-foreground"
                >
                  <div className="flex justify-between">
                    <Image
                      src={cours.imageUrl}
                      alt="formation"
                      className="h-20 w-20 rounded-sm object-cover"
                      width={100}
                      height={100}
                    />
                    {index < 5 && (
                      <p className="px-4 py-1 text-green-500 rounded bg-green-100 w-fit h-fit">
                        Nouveau ✨
                      </p>
                    )}
                  </div>
                  <div className="space-y-1">
                    <p className="text-xl font-bold">{cours.titre}</p>
                    <p className="text-gray-500 h-[142px] overflow-hidden line-clamp-6">
                      {cours.description}...
                    </p>
                  </div>
                  <div className="flex gap-5 text-sm">
                    <p className="flex gap-2 items-center">
                      <CalendarArrowDown size={16} />
                      {new Date(cours.createdAt).toLocaleDateString("fr-FR")}
                    </p>
                    <p className="flex gap-2 items-center">
                      <Timer size={16} />100 heures
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="w-[95%] m-auto mb-9">
            <AdhesionComp />
          </div>
          <div className="space-y-6">
            <h2 className="text-5xl font-medium">Business</h2>
            <p className="text-gray-600 text-lg">Plongez dans nos meilleurs cours soigneusement sélectionnés pour maîtriser des compétences importantes et atteindre vos objectifs plus rapidement.</p>

            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
              {busines.map((busines, index) => (
                <div
                  key={busines.id}
                  className="lg:w-80 w-full space-y-4 hover:bg-primary-foreground shadow border rounded relative"
                >
                  <Image
                    src={busines.imageUrl}
                    alt={busines.titre}
                    className="w-full rounded-t h-[170px]"
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
                      <User size={16} />
                      {busines.user?.name || "Inconnu"}
                    </p>
                    <p>
                      <span className="font-bold">{busines.lectures}</span> Lectures{" "}
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
              ))}
            </div>
          </div>
        </>
      )}
      <InstructorComp />
    </div>
  )
}

export default PageCategorie
