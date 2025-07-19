'use client'

import Image from "next/image"
import { ShoppingCart, User } from "lucide-react"
import { AddToCartButton } from "@/components/coursBuy/AddToCartButton"
import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import {IconLoader} from "@tabler/icons-react"
import AdhesionComp from "@/components/autres/AdhesionComp"
import JSZip from "jszip"
import { saveAs } from "file-saver" // pour déclencher le téléchargement


type BusinesType = {
  id: string
  titre: string
  prix: number
  categorie: string
  description: string
  zipUrl: string
  imageUrl: string
  introUrl: string
  lectures: number
  createdAt: string
  user: {
    name: string
    email: string
  }
}

export default function BusinesDetailPage() {
  const { id } = useParams()
  const [cours, setCours] = useState<BusinesType | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    if (!id) return
    const fetchCours = async () => {
      try {
        const res = await fetch(`/api/busines/${id}`)
        const data = await res.json()
        setCours(data)
      } catch (error) {
        console.error("Erreur lors du chargement :", error)
      } finally {
        setLoading(false)
      }
    }

    fetchCours()
  }, [id])


  
const handleAchat = async () => {
  if (!id || !cours) return

  try {
    // 1. Incrémente lecture 
    const res = await fetch(`/api/busines/${id}/lecture`, {
      method: "POST"
    })
    if (!res.ok) {
      const data = await res.json()
      alert(data.error || "Erreur lors de l'achat")
      return
    }

    // 2. Téléchargement des fichiers binaires
    const urlsToDownload = [
      { url: cours.zipUrl, name: "contenu.zip" },
      { url: cours.imageUrl, name: "image.jpg" },
      { url: cours.introUrl, name: "intro.mp4" }
    ]

    const zip = new JSZip()

    for (const file of urlsToDownload) {
      const response = await fetch(file.url)
      const blob = await response.blob()
      zip.file(file.name, blob)
    }

    // 3. Génération et téléchargement du ZIP
    const zipBlob = await zip.generateAsync({ type: "blob" })
    saveAs(zipBlob, `${cours.titre}.zip`)

    router.refresh()

  } catch (error) {
    console.error("Erreur pendant le téléchargement groupé :", error)
    alert("Erreur pendant l'achat ou le téléchargement.")
  }
}
 

  if (loading) return <div className="h-[500px] flex justify-center items-center"><IconLoader className="animate-spin h-8 w-8 text-muted-foreground" /></div>
  if (!cours) return <div className="h-[500px] flex justify-center items-center"><IconLoader className="animate-spin h-8 w-8 text-muted-foreground" /></div>

  return (
  <div>
    <div className="w-full  h-fit lg:h-[500px] bg-[url(/images/bg-continue.png)] bg-cover font-outfit">
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
              <p className="text-2xl lg:text-5xl text-orangeme font-bold">
               {/* // {cours.titre.slice(0, 17)} */}
               {cours?.titre?.slice(0, 17) || "Titre non disponible"}
              </p>
              <div className="space-y-2">
                <p>
                  Mis à jour le{" "}
                  {new Date(cours.createdAt).toLocaleString("fr-FR", {
                    dateStyle: "long",
                  })}
                </p>
                <p className="hover:underline flex gap-2 items-center">
                  <User size={16} className="inline" /> {cours.user?.name || "Inconnu"} <span>lectures : {cours.lectures}</span>
                </p>
              </div>
            </div>
          </div>
          <div>
            <p className="h-[98px] overflow-hidden line-clamp-4">{cours.description}</p>
          </div>
        </div>

        <div className="bg-white lg:w-[475px] lg:mt-0 mt-9 rounded lg:self-center w-full h-fit p-6 space-y-4">
          <p className="text-3xl font-bold text-orange-600">
            {cours.prix.toLocaleString()} Ar
          </p>
          <div className="lg:flex justify-between mt-4">
            <div>
              <AddToCartButton cours={cours} redirect={false} />
            </div>
            <div className="w-full lg:w-[45%]">
              <button
                onClick={handleAchat}
                className="bg-green-600 lg:w-fit w-full lg:mt-0 mt-5 cursor-pointer flex gap-2 rounded hover:bg-green-700 text-white py-3 px-6"
              >
                Acheter maintenant
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
    </div>
     <div className="w-[95%] font-outfit m-auto my-9">
        <AdhesionComp />
      </div>
  </div>
  )
}




