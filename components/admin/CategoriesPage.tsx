"use client"

import * as React from "react"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { useMediaQuery } from "@/hooks/use-media-query"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
 import { useFileUpload } from "@/hooks/use-file-upload"
 import { ImageUpIcon, XIcon, AlertCircleIcon } from "lucide-react"

import { ChartBarStacked } from "lucide-react"
import Image from "next/image"
import { images } from "@/constants/images"

export function CategoriesPage() {
  const [open, setOpen] = React.useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <div
            className="group cursor-pointer relative h-44 w-full flex flex-col gap-4 justify-center items-center py-2 px-4 border border-transparent text-sm font-medium text-white bg-[#00ac69]/90 hover:bg-[#00ac69] rounded-lg text-whitefocus:outline-none focus:ring-2 focus:ring-offset-2  disabled:opacity-50"
          >
            <ChartBarStacked size={40} />
            <p className="text-lg text-center">Créer un catégorie</p>
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] flex flex-col items-center rounded">
          <DrawerHeader>
            <DrawerTitle className="outfit text-center">Crée un nouvelle catégorie</DrawerTitle>
            <DrawerDescription className="outfit -ml-4">
              remarquer si tu crée un nouvelle catégorie cette catégorie sera visible par tous
            </DrawerDescription>
          </DrawerHeader>
          <ProfileForm />
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
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <div
          className="group cursor-pointer relative h-44 w-full flex flex-col gap-4 justify-center items-center py-2 px-4 border border-transparent text-sm font-medium text-white bg-[#00ac69]/90 hover:bg-[#00ac69] rounded-lg text-whitefocus:outline-none focus:ring-2 focus:ring-offset-2  disabled:opacity-50"
        >
          <ChartBarStacked size={40} />
          <p className="text-lg text-center">Créer un catégorie</p>
        </div>
      </DrawerTrigger>
      <DrawerContent className="flex flex-col items-center ">
        <DrawerHeader>
          <DrawerTitle className="outfit text-center">Crée un nouvelle catégorie</DrawerTitle>
          <DrawerDescription className="outfit text-center">
            remarquer si tu crée un nouvelle catégorie cette catégorie sera visible par tous
          </DrawerDescription>
        </DrawerHeader>
        <ProfileForm />
        <DrawerFooter className="pt-2 w-full">
          <DrawerClose asChild>
            <Button variant="outline" className="rounded">Anuler</Button>
          </DrawerClose>
        </DrawerFooter>
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
      </DrawerContent>
    </Drawer>
  )
}

 export function ProfileForm() {
   const [nom, setNom] = useState("")
   const [loading, setLoading] = useState(false)
   const [message, setMessage] = useState("")
 
   const maxSize = 5 * 1024 * 1024
   const [
     { files, isDragging, errors },
     {
       handleDragEnter,
       handleDragLeave,
       handleDragOver,
       handleDrop,
       openFileDialog,
       removeFile,
       getInputProps,
     }
   ] = useFileUpload({ accept: "image/*", maxSize })
 
   const previewUrl = files[0]?.preview || null
 
   const handleSubmit = async (e: React.FormEvent) => {
     e.preventDefault()
     if (!nom || !files[0]?.file) {
       setMessage("Veuillez remplir tous les champs")
       return
     }
 
     setLoading(true)
     const formData = new FormData()
     formData.append("nom", nom)
     formData.append("image", files[0].file as File)
 
     const res = await fetch("/api/categories", {
       method: "POST",
       body: formData
     })
 
     const data = await res.json()
     setMessage(data.message)
     setLoading(false)
     if (res.ok) {
       setNom("")
       removeFile(files[0].id)
     }
   }
 
   return (
     <form onSubmit={handleSubmit} className="space-y-4 px-4 lg:px-0 w-full font-outfit">
       <input
         type="text"
         placeholder="Nom de la catégorie"
         value={nom}
         onChange={(e) => setNom(e.target.value)}
         className="w-full p-2 border rounded"
       />
 
       <div
         role="button"
         onClick={openFileDialog}
         onDragEnter={handleDragEnter}
         onDragLeave={handleDragLeave}
         onDragOver={handleDragOver}
         onDrop={handleDrop}
         className="border border-dashed  rounded p-4 min-h-48 text-center cursor-pointer"
       >
         <input {...getInputProps()} className="sr-only" />
         {previewUrl ? (
           <div className="relative">
             <img src={previewUrl} className="mx-auto object-cover h-40 rounded" />
             <button
               onClick={() => removeFile(files[0].id)}
               type="button"
               className="absolute top-2 right-2 bg-black/50 text-white rounded-full p-1"
             >
               <XIcon className="w-4 h-4" />
             </button>
           </div>
         ) : (
           <div className="flex flex-col items-center justify-center">
             <ImageUpIcon className="w-6 h-6 mb-2" />
             <p>Déposer une image ou cliquer pour sélectionner</p>
             <p className="text-xs text-gray-500">Max size: 5MB</p>
           </div>
         )}
       </div>
 
       {errors.length > 0 && (
         <p className="text-red-500 text-sm flex items-center gap-1">
           <AlertCircleIcon className="w-4 h-4" /> {errors[0]}
         </p>
       )}
 
       <button
         type="submit"
         className="bg-blue-600 w-full hover:bg-blue-700 text-white px-4 py-2 rounded"
         disabled={loading}
       >
         {loading ? "Création..." : "Créer la catégorie"}
       </button>
 
       {message && <p className="text-sm text-center">{message}</p>}
     </form>
   )
 }
 