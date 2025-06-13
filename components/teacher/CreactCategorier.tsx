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
import { ChartBarStacked } from "lucide-react"

export function CreactCategorier() {
  const [open, setOpen] = React.useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <div
            className="group cursor-pointer relative h-44 w-44 flex flex-col gap-4 justify-center items-center py-2 px-4 border border-transparent text-sm font-medium text-white bg-[#00ac69]/90 hover:bg-[#00ac69] rounded-lg text-whitefocus:outline-none focus:ring-2 focus:ring-offset-2  disabled:opacity-50"
          >
            <ChartBarStacked size={40} />
            <p className="text-lg text-center">Créer un catégorie</p>
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DrawerHeader>
            <DrawerTitle className="outfit text-center">Crée un nouvelle catégorie</DrawerTitle>
            <DrawerDescription className="outfit -ml-4">
              remarquer si tu crée un nouvelle catégorie cette catégorie sera visible par tous
            </DrawerDescription>
          </DrawerHeader>
          <ProfileForm />
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
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="outfit text-center">Crée un nouvelle catégorie</DrawerTitle>
          <DrawerDescription className="outfit">
            remarquer si tu crée un nouvelle catégorie cette catégorie sera visible par tous
          </DrawerDescription>
        </DrawerHeader>
        <ProfileForm className="px-4" />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Anuler</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

function ProfileForm({ className }: React.ComponentProps<"form">) {
  return (
    <form className={cn("grid items-start gap-6 outfit", className)}>
      <div className="grid gap-3">
        <Label htmlFor="username">Catégorie</Label>
        <Input id="username" className="rounded" placeholder="Entre votre nouvelle catégorie" />
      </div>
      <Button className="rounded" type="submit">Valide le catégorie</Button>
    </form>
  )
}
