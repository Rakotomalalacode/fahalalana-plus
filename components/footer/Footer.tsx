'use client'

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { IconBrandFacebookFilled, IconBrandInstagram, IconBrandLinkedinFilled, IconBrandTwitter, IconBrandYoutubeFilled, IconCertificate, IconLoader } from "@tabler/icons-react"
import { CalendarArrowDown } from "lucide-react"
import { useRouter } from "next/navigation"
import { images } from "@/constants/images";
import { Separator } from "@/components/ui/separator"
type Categorie = {
  id: string
  nom: string
  imageUrl?: string
  coursCount: number
  businesCount: number
  createdAt : string
}


type Cours = {
  id: string
  titre: string
  description: string
  prix: number
  imageUrl: string
  _count: {
    achatCours: number
  }
  user: {
    name: string
  }
}

type Busines = {
  id: string
  titre: string
  prix: number
  imageUrl: string
  lectures: number
  user: {
    name: string
  }
}

const Footer = () => {

    const [categories, setCategories] = useState<Categorie[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
    const route = useRouter()
const [businesList, setBusinesList] = useState<Busines[]>([])
 const [coursList, setCoursList] = useState<Cours[]>([])

 useEffect(() => {
  fetch("/api/footer/formation")
    .then((res) => {
      if (!res.ok) throw new Error("Erreur API")
      return res.json()
    })
    .then((data) => setCoursList(data))
    .catch((err) => {
      console.error("Erreur cours top :", err)
      setCoursList([])
    })
}, [])


    useEffect(() => {
  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/categories/footer')
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

  useEffect(() => {
    fetch("/api/footer/busines")
      .then((res) => res.json())
      .then((data) => setBusinesList(data))
  }, [])

  if (loading) return <div className="h-[400px] flex justify-center items-center"><IconLoader className="animate-spin h-8 w-8 text-muted-foreground" /></div>
  if (error) return <div className="h-[400px] flex justify-center items-center"><IconLoader className="animate-spin h-8 w-8 text-muted-foreground" /></div>

    return (
        <footer className=" py-8 space-y-7  text-muted-foreground font-outfit shrink-0  bg-[#06141c] items-center justify-center">
           <div className="space-y-6 px-4 lg:px-9 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  gap-4">
            <div className="space-y-6">
            <h2 className="text-2xl text-center lg:text-start font-bold text-white">
            Top Catégories
            </h2>
            <div className="space-y-2 text-center lg:text-start">
            {categories.map((cat) => (
            <div key={cat.id} onClick={()=>route.push(`/categories/${cat.id}`)} className="space-y-3">
                <h3 className="text-sm text-gray-400 hover:text-white">
                  {cat.nom.slice(0, 40)}
                </h3>
            </div>
            ))}
            </div>
            </div>
            <div className="space-y-6 text-center lg:text-start">
            <h2 className="text-2xl font-bold text-white">
            Le plus populaire cours
            </h2>
            <div className="space-y-2">
             {businesList.map((b) => (
            
                <div key={b.id} onClick={()=>route.push(`/detaille-cours/${b.id}`)} >
                <h3 className="text-sm text-gray-400 hover:text-white">
                  {b.titre.slice(0, 40)}
                </h3>
            </div>
            
            ))}
            </div>
            </div>
            <div className="space-y-6 text-center lg:text-start">
            <h2 className="text-2xl font-bold text-white">
            Le plus populaire formation
            </h2>
            <div className="space-y-2">
             {coursList.map((c) => (
            <div key={c.id} onClick={()=>route.push(`/detail-cours/${c.id}`)} className="space-y-3">
                <h3 className="text-sm text-gray-400 hover:text-white">
                  {c.titre.slice(0, 40)}
                </h3>
            </div>
            ))}
            </div>
            </div>
            

    <div className="space-y-6 flex flex-col text-white items-center justify-center ">
      <h1 className="text-2xl font-bold">
        Télécharger l'application
      </h1>
      <Link href="/telecharger" target="_blank"><Image src={images.qrcode} alt="Logo" width={200} height={200}/></Link>
    </div>


           </div>
<div className="w-full flex flex-col justify-center items-center space-y-6"> 
<div className="lg:flex flex-warp  space-x-5 text-sm py-6 w-fit">
       <div className="flex gap-5">
        <Link href="/" className="hover:text-white" >ABOUT US</Link> 
       <Separator orientation="vertical" />
       </div>
       <div className="flex gap-5">
       <Link href="/bibliotheque" className="hover:text-white" >BIBLIOTHEQUE</Link> 
       <Separator orientation="vertical" />
       </div>
       <div className="flex gap-5">
       <Link href="/categories" className="hover:text-white" >CATEGORIES</Link> 
       <Separator orientation="vertical" />
       </div>
       <div className="flex gap-5">
       <Link href="/faq" className="hover:text-white" >FAQ'S</Link> 
       <Separator orientation="vertical" />
       </div>
       <div className="flex gap-5">
       <Link href="/obtenir-de-l-aide" className="hover:text-white" >OBTENIR DE L'AIDE</Link> 
       <Separator orientation="vertical" />
       </div>
       <div className="flex gap-5">
       <Link href="/busines-cours" className="hover:text-white" >BUISNES COURS</Link> 
       <Separator orientation="vertical" />
       </div>
       <div className="flex gap-5">
       <Link href="/politique-de-confidentialite" className="hover:text-white" >PRIVACY POLICY</Link> 
       <Separator orientation="vertical" />
       </div>
        <div className="flex gap-5">
       <Link href="/politique-de-cookies" className="hover:text-white" >COOKIES POLICY</Link> 
       <Separator orientation="vertical" />
       </div>
        <div className="flex gap-5">
       <Link href="/conditions-utilisation" className="hover:text-white" >CONDITION POLICY</Link> 
       <Separator orientation="vertical" />
       </div>
       <Link href="/instructor" className="hover:text-white" >INSTRUCTOR</Link>     
  </div>
</div>
<div className="justify-center items-center gap-4 flex flex-wrap">
<Link href="/" >
<div className="flex w-fit text-2xl gap-1 text-white qualyneue items-center">
              <p>falar</p>
              <Image
                src={images.LogoFalarohy}
                width={200}
                height={200}
                className="w-10 h-10"
                alt={"LogoFalarohy"} />
              <p>hy</p>
            </div>
            </Link>
            <div className="flex text-white space-x-4">
<IconBrandFacebookFilled  />
<IconBrandInstagram />
<IconBrandYoutubeFilled />
<IconBrandLinkedinFilled />
<IconBrandTwitter />
            </div>
</div>
            <div className="w-full flex flex-col gap-6 text-white text-center">
                <p className="lg:w-[90%] w-full m-auto">Falarohy est une entreprise majeure dans le domaine des technologies éducatives, qui travaille à fournir le matériel d'apprentissage le plus performant sur des sujets techniques et non techniques.</p>
           <p className="text-sm ">
                &copy; {new Date().getFullYear()} All rights reserved.
            </p>
            </div>
        </footer>
    )
}

export default Footer