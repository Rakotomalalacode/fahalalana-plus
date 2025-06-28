"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { useMediaQuery } from "@/hooks/use-media-query"
import { Button } from "@/components/ui/button"
import { useState } from "react"
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
import { IconTrash } from '@tabler/icons-react';

export function DelletCours({cours , name}: {cours: string , name: string}) {
  const [open, setOpen] = React.useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="bg-[#ff413a] rounded hover:bg-[#ff413a]/90"><IconTrash size={45} className="text-white"   /></Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] font-outfit">
          <DialogHeader>
            <DialogTitle>Supprimer le cours</DialogTitle>
            <DialogDescription>
             Ce cours sera définitivement supprimé. Cette action est irréversible.
            </DialogDescription>
          </DialogHeader>
          <ProfileForm name={name} cours={cours} />
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" className="bg-[#ff413a] rounded hover:bg-[#ff413a]/90"><IconTrash size={45} className="text-white"   /></Button>
      </DrawerTrigger>
      <DrawerContent className="font-outfit rounded">
        <DrawerHeader className="text-center">
          <DrawerTitle>Supprimer le cours</DrawerTitle>
          <DrawerDescription className="text-left">
            Ce cours sera définitivement supprimé. Cette action est irréversible.
          </DrawerDescription>
        </DrawerHeader>
        <ProfileForm name={name} cours={cours} className="px-4" />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline" className="rounded">Annuler</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
type ProfileFormProps = React.ComponentProps<"form"> & {
  cours: string,
  name: string
}

function ProfileForm({ className, cours, name }: ProfileFormProps) {
const [validedellet, setValidedellet] = useState("")
const [reports, setReports] = useState([])
  const fetchReports = async () => {
    const res = await fetch("/api/rapports")
    const data = await res.json()
    setReports(data)
  }
  async function handleDelete(cours: string, name: string) {
    const condition = `sudo delete cours ${name}`
    alert(`sudo delete cours ${name}`)
    if (condition === cours) {
      await fetch(`/api/cours/${cours}`, {
        method: "DELETE",
      })
      alert("Cours supprimé avec succès !")
      fetchReports()
    }
  }
  
  return (
    <form className={cn("grid items-start gap-6", className)}>
      <div className="grid gap-3">
        <p className="text-sm">Tapez <span className="text-destructive">sudo delete cours {name}</span> pour confirmer la suppression de tout.</p>
        <Input 
        value={validedellet}
                onChange={(e) => setValidedellet(e.target.value)}
        id="username" className="rounded text-red-500"/>
      </div>
      <p onClick={() => handleDelete(cours, name)}  className="rounded">Supprimer le cours</p>
    </form>
  )
}
