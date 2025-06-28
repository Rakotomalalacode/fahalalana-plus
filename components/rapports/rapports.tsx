"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import EditReportPage from "./edit/page"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Calculator,
  Calendar,
  CreditCard,
  Settings,
  Smile,
  User,
} from "lucide-react"

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

import { IconPlus, IconTrash } from "@tabler/icons-react"
import { Textarea } from "../ui/textarea"
import { DialogClose } from "@radix-ui/react-dialog"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import ApprenezEff from '../autres/ApprenezEff';
export default function Rapports() {
  const [reports, setReports] = useState([])
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [deletid, setDeletid] = useState("")
  const router = useRouter()

  const fetchReports = async () => {
    const res = await fetch("/api/rapports")
    const data = await res.json()
    setReports(data)
  }

  const handleCreate = async () => {
    await fetch("/api/rapports", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Obligatoire !
      },
      body: JSON.stringify({ title: content.split(" ").slice(0, 3).join(" "), content }),
    })
    setTitle("")
    setContent("")
    fetchReports()
  }

  const handleDelete = async (id: string, title: string) => {
    const condition = `sudo delete ${title}`;
    if (deletid === condition) {
      await fetch(`/api/rapports/${id}`, {
        method: "DELETE",
      })
      fetchReports()
    }
  }

  useEffect(() => {
    fetchReports()
  }, [])

  return (
    <div className="w-full space-y-4 font-outfit">
      <div>
        <ApprenezEff background="bg-blue-600" />
      </div>

      <div className="flex flex-wrap justify-between">
        <div className="w-full lg:w-[45%]">
          <h1 className="text-xl font-bold mb-4">Avoir plus de rapport enregistrer ?</h1>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger><div className="flex gap-2 hover:bg-primary-foreground py-2 px-4 rounded"><IconPlus className="text-amber-500 " />Crée une rapport</div></AccordionTrigger>
              <AccordionContent>
                <Textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Contenu"
                  className="border rounded h-[174px] p-2 mb-2 w-full"
                />

                <button
                  onClick={handleCreate}
                  className="bg-blue-600 w-full text-white px-6 py-2 rounded"
                >
                  Terminé
                </button>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <Command className="w-full lg:w-[53%] rounded-lg border shadow">
          <CommandInput placeholder="Rechercher une rapport..." />
          <CommandList className="space-y-4">
            <CommandEmpty>Aucun résultat trouvé.</CommandEmpty>
            <CommandGroup heading="Liste des rapports">
              {reports.map((report: any) => (
                <CommandItem key={report.id} className="border text-start items-start flex-col p-4 mb-2 rounded">
                  <span className="font-bold text-lg">{report.title}</span>
                  <p className="max-h-[60px] overflow-hidden text-ellipsis  text-gray-700">{report.content}</p>
                  <div className="flex gap-4 w-full justify-end">
                    <EditReportPage idRapports={report.id} />

                    <Dialog>
                      <DialogTrigger>
                        <div className="bg-[#ff413a] h-9 px-4 py-2 has-[>svg]:px-3  rounded hover:bg-[#ff413a]/90">
                          <IconTrash size={45} className="text-white" />
                        </div>
                      </DialogTrigger>
                      <DialogContent className="font-outfit rounded">
                        <DialogHeader>
                          <DialogTitle className="text-center">Supprimer le rapports</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-3">
                          <p>Tapez <span className="text-destructive">sudo delete {report.title}</span> pour confirmer la suppression de tout.</p>
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
                                onClick={() => handleDelete(report.id, report.title)}
                                type="submit">Supprimer le rapports</Button>
                            </DialogClose>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>

                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </div>
    </div>
  )
}