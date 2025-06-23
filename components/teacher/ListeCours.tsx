"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Loader2 } from "lucide-react"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import CoursEdits from "./CoursEdits"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { IconTrash } from "@tabler/icons-react"

type Cours = {
  id: string
  titre: string
  description: string
  imageUrl: string
  prix: number
  publicId: string
  categorie: string
  createdAt: string
  user: {
    name: string | null
    email: string
    image: string | null
  }
}

export function ListeCours() {
  const [cours, setCours] = useState<Cours[]>([])
  const [loading, setLoading] = useState(true)
  const [deletid, setDeletid] = useState("")
  const [reports, setReports] = useState([])
  useEffect(() => {
    const fetchCours = async () => {
      try {
        const res = await fetch("/api/cours/users")
        const data = await res.json()
        setCours(data)
      } catch (error) {
        console.error("Erreur chargement des cours:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchCours()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center py-10">
        <Loader2 className="animate-spin h-8 w-8 text-muted-foreground" />
      </div>
    )
  }

  const fetchReports = async () => {
    const res = await fetch("/api/rapports")
    const data = await res.json()
    setReports(data)
  }

  async function handleDelete(id: string, name: string) {

    const condition = `sudo delete ${name}`;
    if (deletid === condition) {
      await fetch(`/api/cours/${id}`, {
        method: "DELETE",
      })
      fetchReports()
    }

  }

  return (
    <Command className="rounded-lg border shadow-md md:min-w-[450px]">
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>Aucun résultat trouvé.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          {cours.map((cours) => (
            <CommandItem key={cours.id}>
              <div className="flex gap-4 w-full">
                <Image src={cours.imageUrl} width={200} height={200} className="w-[100px] h-[60px] rounded" alt={cours.imageUrl || "Auteur"} />
                <div className="w-[90%] flex justify-between items-center">
                  <div>
                    <span className="font-medium">{cours.titre}</span>
                    <p className="text-gray-400 hidden md:block">{cours.description.slice(0, 30)}...</p>
                    <p className="text-gray-400 md:hidden block">{cours.description.slice(0, 10)}...</p>
                    <p className="text-gray-400 hidden md:block">{cours.createdAt.slice(0, 10)}</p>
                  </div>
                  <div className="flex items-center gap-5 justify-center">
                    <CoursEdits cours={cours} />

                    <Dialog>
                      <DialogTrigger>
                        <div className="bg-[#ff413a] h-9 px-4 py-2 has-[>svg]:px-3  rounded hover:bg-[#ff413a]/90">
                          <IconTrash size={45} className="text-white" />
                        </div>
                      </DialogTrigger>
                      <DialogContent className="font-outfit">
                        <DialogHeader>
                          <DialogTitle className="text-center">Supprimer le cours</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-3">
                          <p>Tapez <span className="text-destructive">sudo delete {cours.titre}</span> pour confirmer la suppression de tout.</p>
                          <Input
                            value={deletid}
                            onChange={(e) => setDeletid(e.target.value)}
                            className="rounded text-red-500"
                            id="name-1" name="name" />
                        </div>
                        <div className="w-full flex justify-between">
                          <div className="w-[48%]">
                            <DialogClose asChild>
                              <Button variant="outline" className="rounded w-full" >Cancel</Button>
                            </DialogClose>
                          </div>
                          <div className="w-[48%]">
                            <DialogClose asChild>
                              <Button
                                variant="destructive"
                                className="rounded w-full"
                                onClick={() => handleDelete(cours.id, cours.titre)}
                                type="submit">Supprimer le cours</Button>
                            </DialogClose>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </div>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command >
  )
}
