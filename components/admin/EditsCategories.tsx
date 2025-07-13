'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from '../ui/input'
import { SquarePen } from 'lucide-react'
import { images } from '@/constants/images'
import Image from 'next/image'

interface Categorie {
  id: string
  nom: string
  imageUrl: string
}

export default function EditCategoriePage({ CategoriesID }: { CategoriesID:string }) { // Modifier la signature de la fonction: { id: string } }) {
  const router = useRouter()
  const [nom, setNom] = useState('')
  const [image, setImage] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  // Charger la catégorie existante
  useEffect(() => {
    fetch(`/api/categories/${CategoriesID}`)
      .then((res) => res.json())
      .then((data: Categorie) => {
        setNom(data.nom)
        setPreviewUrl(data.imageUrl)
      })
  }, [CategoriesID])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setImage(file)
    if (file) setPreviewUrl(URL.createObjectURL(file))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData()
    formData.append('nom', nom)
    if (image) formData.append('image', image)

    const res = await fetch(`/api/categories/${CategoriesID}`, {
      method: 'PUT',
      body: formData,
    })

    if (res.ok) {
      router.push('/categories') // Rediriger vers la liste
    } else {
      alert('Erreur lors de la mise à jour')
    }

    setLoading(false)
  }

  return (

    <Dialog>
  <DialogTrigger>
    <div className="h-9 px-2 py-2 has-[>svg]:px-3 rounded border bg-green-700 text-white shadow-xs hover:bg-green-700/90 hover:text-accent-foreground dark:bg-green-700 dark:border-input dark:hover:bg-green-700/90">
              <SquarePen size={17} className="text-white" />
            </div>
  </DialogTrigger>
  <DialogContent className='rounded'>
    <DialogHeader>
      <DialogTitle className='font-outfit text-center'>Modifier le catégorie {nom}</DialogTitle>
         </DialogHeader>
      <form onSubmit={handleSubmit} className="w-full space-y-4">
        <div className='flex flex-col gap-3'>
          <label className="block font-medium">Nom</label>
          <Input
            type="text"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            className="w-full border rounded"
            required
          />
        </div>

        <div  className='flex flex-col gap-3'>
          <label className="block font-medium">Image</label>
          {previewUrl && <img src={previewUrl} alt="Preview" className="w-full h-40 object-cover rounded mb-2" />}
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>

        <button
          type="submit"
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'Mise à jour...' : 'Mettre à jour'}
        </button>
      </form>

    <div className='w-full flex justify-center'>
      <div className="flex w-fit text-sm! gap-0.5 qualyneue items-center">
                <p>falar</p>
                <Image
                  src={images.LogoFalarohy}
                  width={200}
                  height={200}
                  className="w-3 h-3"
                  alt={"LogoFalarohy"} />
                <p>hy</p>
              </div>
    </div>
  </DialogContent>
</Dialog>
  )
}
