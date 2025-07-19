'use client'

import { useEffect, useState } from "react"
import Image from "next/image"
import { User } from "lucide-react"
import { AddToCartButton } from "@/components/coursBuy/AddToCartButton"
import { useParams, useRouter } from "next/navigation"
import {IconLoader} from "@tabler/icons-react"
import AdhesionComp from "@/components/autres/AdhesionComp"

export default function DetailCoursPage() {
  const { id } = useParams()
  const [cours, setCours] = useState<any>(null)
  const [loading, setLoading] = useState(true)
const router = useRouter()

  useEffect(() => {
    if (!id) return

    const fetchCours = async () => {
      try {
        const res = await fetch(`/api/cours/ventes/${id}`)
        if (!res.ok) throw new Error("Erreur de chargement")
        const data = await res.json()
        setCours(data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchCours()
  }, [id])

  const handleAchat = async () => {
    if (!id) return
    try {
      const res = await fetch(`/api/busines/${id}/lecture`, {
        method: "POST"
      })
      if (res.ok) {
        alert("Lecture enregistrée avec succès !")
        router.refresh()
      } else {
        const data = await res.json()
        alert(data.error || "Erreur")
      }
    } catch (error) {
      alert("Erreur réseau")
    }
  }

  if (loading) return <div className="h-[500px] flex justify-center items-center"><IconLoader className="animate-spin h-8 w-8 text-muted-foreground" /></div>
  if (!cours) return <div className="h-[500px] flex justify-center items-center"><IconLoader className="animate-spin h-8 w-8 text-muted-foreground" /></div>

  return (
    <div>
    <div className="w-full lg:h-[500px] bg-[url(/images/bg-continue.png)] bg-cover font-outfit">
      <div className="bg-black/80 flex flex-wrap justify-between px-4 lg:px-9 py-9 w-full h-full">
        <div className="flex flex-col lg:self-center h-fit gap-4 w-full lg:w-[45%] text-white">
          <div className="lg:flex gap-4">
            <Image
              src={cours.imageUrl}
              alt={cours.titre}
              width={400}
              height={500}
              className="rounded-lg w-full lg:w-32 lg:h-32 object-cover"
            />
            <div className="space-y-5 lg:mt-0 mt-8">
              <p className="text-2xl lg:text-5xl text-orangeme font-bold">{cours.titre}</p>
              <div className="space-y-2">
                <p>Publié le {new Date(cours.createdAt).toLocaleDateString("fr-FR", { dateStyle: "long" })}</p>
                <p className="hover:underline flex gap-2 items-center">
                  <User size={16} className="inline" /> {cours.user?.name || "Inconnu"}
                </p>
              </div>
            </div>
          </div>
          <div>
            <p className="mt-4">{cours.description}</p>
          </div>
        </div>
        <div className="bg-white lg:w-[475px] lg:mt-0 mt-9 rounded lg:self-center w-full h-fit p-6 space-y-4">
          <p className="text-3xl font-bold text-orange-600">
            {cours.prix.toLocaleString()} Ar
          </p>
          <div className="lg:flex justify-between mt-4">
            <div className="w-full">
              <button
                className="group relative w-full flex justify-center py-3 lg:px-16 border border-transparent text-lg font-medium rounded text-white bg-indigo-400 hover:bg-indigo-600/80 shadow-2xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer disabled:opacity-50"
              >
                Commencer le cours
              </button>
            </div>
          </div>

          <h1 className="text-3xl font-bold">{cours.titre}</h1>
          <div className="flex flex-wrap gap-4 mt-4">
            <p className="text-gray-600 hover:underline">
              Catégorie : {cours.categorie}
            </p>
            <p className="text-gray-700 hover:underline flex items-center gap-2">
              Par : <User size={16} className="inline" /> {cours.user?.name || "Inconnu"}
            </p>
          </div>
        </div>
      </div>

      {cours.sousTitres?.length > 0 && (
        <div className="px-6 py-4 bg-white">
          <h2 className="text-xl font-bold mb-4">Chapitres :</h2>
          <ul className="list-disc pl-6 space-y-2">
            {cours.sousTitres.map((sousTitre: any) => (
              <li key={sousTitre.id}>{sousTitre.titre}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
    <div className="w-[95%] font-outfit m-auto my-9">
        <AdhesionComp />
      </div>
      </div>
  )
}
