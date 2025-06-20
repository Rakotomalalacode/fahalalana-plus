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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ChartBarStacked } from "lucide-react"
import Image from "next/image"
import { images } from "@/constants/images"

export function CreactCategorier() {
  const [open, setOpen] = React.useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <div
            className="group cursor-pointer relative h-44 w-44 lg:w-full flex flex-col gap-4 justify-center items-center py-2 px-4 border border-transparent text-sm font-medium text-white bg-[#00ac69]/90 hover:bg-[#00ac69] rounded-lg text-whitefocus:outline-none focus:ring-2 focus:ring-offset-2  disabled:opacity-50"
          >
            <ChartBarStacked size={40} />
            <p className="text-lg text-center">Créer un catégorie</p>
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] flex flex-col items-center">
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
          className="group cursor-pointer relative h-44 w-44 flex flex-col gap-4 justify-center items-center py-2 px-4 border border-transparent text-sm font-medium text-white bg-[#00ac69]/90 hover:bg-[#00ac69] rounded-lg text-whitefocus:outline-none focus:ring-2 focus:ring-offset-2  disabled:opacity-50"
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
        <ProfileForm className="px-4" />
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


export function ProfileForm({ className }: React.ComponentProps<"form">) {
  const [nom_, setNom] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setMessage("")

    try {
      const nom = nom_.toLowerCase()
      const res = await fetch("/api/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ nom })
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Erreur inconnue")
      
      setMessage("Catégorie créée avec succès 🎉")
      setNom("")
    } catch (err: any) {
      setMessage(`Erreur : ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("grid items-start w-full lg:-mt-3 gap-6 outfit", className)}
    >
      <div className="grid gap-3">
        <Label htmlFor="username">Catégorie</Label>
        <Input
          id="username"
          className="rounded"
          placeholder="Entre votre nouvelle catégorie"
          value={nom_}
          onChange={(e) => setNom(e.target.value)}
        />
      </div>
      <Button className="rounded" type="submit" disabled={loading}>
        {loading ? "En cours..." : "Valider la catégorie"}
      </Button>
      {message && <p className="text-sm text-center text-green-500 ">{message}</p>}
    </form>
  )
}


// function ProfileForm({ className }: React.ComponentProps<"form">) {
//   return (
//     <form className={cn("grid items-start w-full lg:-mt-3 gap-6 outfit", className)}>
//       <div className="grid gap-3">
//         <Label htmlFor="username">Catégorie</Label>
//         <Input id="username" className="rounded" placeholder="Entre votre nouvelle catégorie" />
//       </div>
//       <Button className="rounded" type="submit">Valide le catégorie</Button>
//     </form>
//   )
// }
