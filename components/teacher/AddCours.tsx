"use client"

import * as React from "react"

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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
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
import { ChartBarStacked, FolderPlus,X } from "lucide-react"
import { ScrollArea } from "../ui/scroll-area"
import { AlertCircleIcon, ImageUpIcon, XIcon } from "lucide-react"

import { useFileUpload } from "@/hooks/use-file-upload"
import Image from "next/image"
import { images } from "@/constants/images"


const AddCours = () => {
  const [open, setOpen] = React.useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <div
            className="group cursor-pointer relative h-44 w-44 flex flex-col gap-4 justify-center items-center py-2 px-4 border border-transparent text-sm font-medium text-white bg-[#ff413a]/90 hover:bg-[#ff413a] rounded-lg text-whitefocus:outline-none focus:ring-2 focus:ring-offset-2  disabled:opacity-50"
          >
            <FolderPlus size={40} />
            <p className="text-lg text-center">Créer un cours</p>
          </div>
        </DialogTrigger>
        <DialogContent className="sm:min-w-[800px] flex flex-col items-center">
          <DrawerHeader>
            <DrawerTitle className="outfit text-center">Crée une nouvelle cours</DrawerTitle>
            <DrawerDescription className="outfit -ml-4 text-center">
              remarquer si tu crée un nouvelle cours cette cours sera visible par tous
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
          className="group cursor-pointer relative h-44 w-44 flex flex-col gap-4 justify-center items-center py-2 px-4 border border-transparent text-sm font-medium text-white bg-[#ff413a]/90 hover:bg-[#ff413a] rounded-lg text-whitefocus:outline-none focus:ring-2 focus:ring-offset-2  disabled:opacity-50"
        >
          <FolderPlus size={40} />
          <p className="text-lg text-center">Créer un cours</p>
        </div>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="outfit text-center ">Crée une nouvelle cours</DrawerTitle>
          <DrawerDescription className="outfit text-center">
            remarquer si tu crée un nouvelle cours cette cours sera visible par tous
          </DrawerDescription>
        </DrawerHeader>
        <ProfileForm className="px-4" />
      </DrawerContent>
    </Drawer>
  )
}

export default AddCours


function ProfileForm({ className }: React.ComponentProps<"form">) {
  const maxSizeMB = 5
  const maxSize = maxSizeMB * 1024 * 1024 // 5MB default

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
    },
  ] = useFileUpload({
    accept: "image/*",
    maxSize,
  })

  const previewUrl = files[0]?.preview || null

  return (
    <form className={cn(" w-full  outfit", className)}>
      <ScrollArea className=" h-[65vh] lg:h-auto  items-start space-y-6 w-full ">
        <div className="w-full flex flex-wrap-reverse lg:flex-wrap items-center gap-6 ">
          <div className="lg:w-[40%] w-full ">
            <div className="flex flex-col gap-2 w-full h-[200px]">
              <div className="relative">
                {/* Drop area */}
                <div
                  role="button"
                  onClick={openFileDialog}
                  onDragEnter={handleDragEnter}
                  onDragLeave={handleDragLeave}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  data-dragging={isDragging || undefined}
                  className="border-input hover:bg-accent/50 data-[dragging=true]:bg-accent/50 has-[input:focus]:border-ring has-[input:focus]:ring-ring/50 relative flex min-h-52 flex-col items-center justify-center overflow-hidden rounded border p-4 transition-colors has-disabled:pointer-events-none has-disabled:opacity-50 has-[img]:border-none has-[input:focus]:ring-[3px]"
                >
                  <input
                    {...getInputProps()}
                    className="sr-only"
                    aria-label="Upload file"
                  />
                  {previewUrl ? (
                    <div className="absolute inset-0">
                      <img
                        src={previewUrl}
                        alt={files[0]?.file?.name || "Image téléchargée"}
                        className="size-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center px-4 py-3 text-center">
                      <div
                        className="bg-background mb-2 flex size-11 shrink-0 items-center justify-center rounded-full border"
                        aria-hidden="true"
                      >
                        <ImageUpIcon className="size-4 opacity-60" />
                      </div>
                      <p className="mb-1.5 text-sm font-medium">
                        Déposez votre image ici ou cliquez pour parcourir
                      </p>
                      <p className="text-muted-foreground text-xs">
                        Taille maximale: {maxSizeMB}Mo
                      </p>
                    </div>
                  )}
                </div>
                {previewUrl && (
                  <div className="absolute top-4 right-4">
                    <button
                      type="button"
                      className="focus-visible:border-ring focus-visible:ring-ring/50 z-50 flex size-8 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white transition-[color,box-shadow] outline-none hover:bg-black/80 focus-visible:ring-[3px]"
                      onClick={() => removeFile(files[0]?.id)}
                      aria-label="Remove image"
                    >
                      <XIcon className="size-4" aria-hidden="true" />
                    </button>
                  </div>
                )}
              </div>

              {errors.length > 0 && (
                <div
                  className="text-destructive flex items-center gap-1 text-xs"
                  role="alert"
                >
                  <AlertCircleIcon className="size-3 shrink-0" />
                  <span>{errors[0]}</span>
                </div>
              )}
            </div>
          </div>
          <div className="lg:w-[55%] w-full space-y-4 ">
            <div className="grid gap-3">
              <Label htmlFor="username">Titre du cours</Label>
              <Input id="username" className="rounded" placeholder="Entre votre nouvelle titre" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="username">Categorie du cours</Label>
              <Select>
                <SelectTrigger className="w-full rounded">
                  <SelectValue placeholder="Choisir une categorie" />
                </SelectTrigger>
                <SelectContent className="rounded">
                  <SelectItem className="rounded" value="light">Light</SelectItem>
                  <SelectItem className="rounded" value="dark">Dark</SelectItem>
                  <SelectItem className="rounded" value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="username">Prix d' apprentisage</Label>
              <Input id="username" className="rounded" placeholder="Entre votre prix" />
            </div>

          </div>
        </div>
        <div className="grid gap-3 mt-6 pb-7 lg:pb-0">
          <div className="grid gap-3">
            <Label htmlFor="username">Description du cours</Label>
            <Input id="username" className="rounded" placeholder="Entre la description de votre cours" />
          </div>
          <Button className="rounded w-full" type="submit">Valide le cours</Button>
        </div>
      </ScrollArea>
    </form>
  )
}