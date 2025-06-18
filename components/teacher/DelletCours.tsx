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

export function DelletCours() {
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
          <ProfileForm />
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" className="bg-[#ff413a] rounded hover:bg-[#ff413a]/90"><IconTrash size={45} className="text-white"   /></Button>
      </DrawerTrigger>
      <DrawerContent className="font-outfit">
        <DrawerHeader className="text-center">
          <DrawerTitle>Supprimer le cours</DrawerTitle>
          <DrawerDescription className="text-left">
            Ce cours sera définitivement supprimé. Cette action est irréversible.
          </DrawerDescription>
        </DrawerHeader>
        <ProfileForm className="px-4" />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline" className="rounded">Annuler</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

function ProfileForm({ className }: React.ComponentProps<"form">) {
  return (
    <form className={cn("grid items-start gap-6", className)}>
      <div className="grid gap-3">
        <Label htmlFor="username" className="text-sm"><p>Tapez <span className="text-destructive">sudo delete cours Titre de cours</span> pour confirmer la suppression de tout.</p></Label>
        <Input id="username" className="rounded text-red-500"/>
      </div>
      <Button type="submit" variant={"destructive"} className="rounded">Supprimer le cours</Button>
    </form>
  )
}
