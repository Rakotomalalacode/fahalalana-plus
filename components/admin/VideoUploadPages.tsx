"use client"

import * as React from "react"
import { useState } from "react"
import { useMediaQuery } from "@/hooks/use-media-query"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import Image from "next/image"
import { images } from "@/constants/images"
import { useFileUpload } from "@/hooks/use-file-upload"
import { ImageUpIcon, XIcon, HandCoins } from "lucide-react"
import { IconCircleDashedCheck } from "@tabler/icons-react"

const VideosCours = () => {
  const [open, setOpen] = useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <div className="group cursor-pointer h-full w-full py-8 flex flex-col gap-4 justify-center items-center px-4 bg-[#f4a100]/90 hover:bg-[#f4a100] rounded-lg text-white">
            <HandCoins size={40} />
            <p className="text-lg text-center">Créer un cours</p>
          </div>
        </DialogTrigger>
        <DialogContent className="sm:min-w-[800px] flex flex-col items-center rounded">
          <DrawerHeader>
            <DrawerTitle className="outfit text-center">Créer un nouveau cours</DrawerTitle>
            <DrawerDescription className="outfit -ml-4">
              Cette vidéo sera visible par tout le monde après publication.
            </DrawerDescription>
          </DrawerHeader>
          <VideoUploadPage />
          <div className="flex w-fit text-sm! gap-0.5 qualyneue items-center">
            <p>falar</p>
            <Image src={images.LogoFalarohy} width={200} height={200} className="w-3 h-3" alt="LogoFalarohy" />
            <p>hy</p>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <div className="group cursor-pointer h-full w-full py-8 flex flex-col gap-4 justify-center items-center px-4 bg-[#f4a100]/90 hover:bg-[#f4a100] rounded-lg text-white">
          <HandCoins size={40} />
          <p className="text-lg text-center">Créer un cours</p>
        </div>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="outfit text-center">Créer un nouveau cours</DrawerTitle>
          <DrawerDescription className="outfit text-center">
            Cette vidéo sera visible par tout le monde après publication.
          </DrawerDescription>
        </DrawerHeader>
        <VideoUploadPage className="px-4" />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Annuler</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export default VideosCours

function VideoUploadPage({ className }: React.ComponentProps<"form">) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [video, setVideo] = useState<File | null>(null)

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
    const formData = new FormData()
    formData.append("title", title)
    formData.append("description", description)
    if (video) formData.append("video", video)
    if (files[0]?.file) formData.append("thumbnail", files[0].file as File)

    const res = await fetch("/api/admin/videos", {
      method: "POST",
      body: formData,
    })

    if (res.ok) {
      toast(
        <div className="text-green-700 font-outfit text-sm flex gap-2 items-center">
          <IconCircleDashedCheck /> Cours ajouté avec succès !
        </div>
      )
      setTitle("")
      setDescription("")
      setVideo(null)
      removeFile(files[0].id)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="font-outfit w-full px-4 lg:px-0 space-y-6" >
      <div className="flex flex-wrap justify-between w-full">
        <div
          role="button"
          onClick={openFileDialog}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          className="border border-dashed w-full lg:w-[47%] rounded p-4 min-h-48 text-center cursor-pointer"
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
              <p className="text-xs text-gray-500">Taille max : 5MB</p>
            </div>
          )}
        </div>

        <div className="w-full lg:w-1/2 space-y-6">
          <div className="grid gap-3">
            <Label htmlFor="titre">Titre du cours</Label>
            <Input
              type="text"
              placeholder="Titre"
              value={title}
            className="w-full p-2 border rounded"
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="description">Description du cours</Label>
            <Textarea
              placeholder="Description"
              value={description}
              className="w-full p-2 border rounded"
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="video">Vidéo du cours</Label>
            <Input
              type="file"
              accept="video/*"
              className="w-full p-2 border rounded"
              onChange={(e) => setVideo(e.target.files?.[0] || null)}
              required
            />
          </div>
        </div>
      </div>

      <button type="submit" className="bg-blue-600 w-full text-white px-4 py-2 rounded">
        Ajouter la vidéo
      </button>
    </form>
  )
}