"use client"

import { useEffect, useState } from "react"
import EditCategoriePage from "./EditsCategories"
import Image from "next/image"
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
import { toast } from "sonner"
import { IconCircleDashedCheck, IconTrash } from "@tabler/icons-react"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
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
import VideoEdit from "./EditVideoPage"
import { images } from "@/constants/images"

interface Categorie {
  id: string
  nom: string
  imageUrl: string
  createdAt: string
}
type Busnis = {
  id: string
  titre: string
  prix: string
  categorie: string
  imageUrl: string
  description: string
  createdAt: string
}
type VideoItem = {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnail: string;
  createdAt : string;
};

export default function ListeCategories() {
  const [categories, setCategories] = useState<Categorie[]>([])
  const [deletid, setDeletid] = useState("")
  const [busnis, setBusnis] = useState<Busnis[]>([])
   const [loading, setLoading] = useState(false)
  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then(setCategories)
  }, [])


  async function handleDeleteCategorie(id: string, name: string) {
  
      const condition = `sudo delete ${name}`;
      if (deletid === condition) {
        const res = await fetch(`/api/categories/${id}`, {
      method: "DELETE",
    })

    if (res.ok) {
      setCategories((prev) => prev.filter((c) => c.id !== id))
        toast(<div className="text-green-700 font-outfit text-sm flex gap-2 items-center"><IconCircleDashedCheck /> Busines supprimé !</div>)

    }
      }
  
    }

     async function handleDeleteBusnis(id: string, name: string) {
    
        const condition = `sudo delete ${name}`;
        if (deletid === condition) {
           const res = await fetch(`/api/admin/videos/${id}`, {
      method: "DELETE",
    });
          toast(<div className="text-green-700 font-outfit text-sm flex gap-2 items-center"><IconCircleDashedCheck /> cours supprimé !</div>)
          fetchVideos();
        }
    
      }

        const [videos, setVideos] = useState<VideoItem[]>([]);
  // const [loading, setLoading] = useState(true);

  const fetchVideos = async () => {
    const res = await fetch("/api/admin/videos");
    const data = await res.json();
    setVideos(data);
    setLoading(false);
  };
  

  useEffect(() => {
    fetchVideos();
  }, []);


  return (
    <div className="w-full flex-col space-y-4">
      <Command className="rounded-lg border shadow-md md:min-w-[450px]">
            <CommandInput placeholder="Type a command or search..." />
            <CommandList>
              <CommandEmpty>Aucun résultat trouvé.</CommandEmpty>
              <CommandGroup heading="Categorie">
                        {categories.map((cat) => (
                          <CommandItem key={cat.id}>
                            <div className="flex gap-4 w-full">
                              <Image src={cat.imageUrl ? cat.imageUrl : images.ImageDefault} width={200} height={200} className="w-[100px] h-[60px] rounded" alt={cat.nom} />
                              <div className="w-[90%] flex justify-between items-center">
                                <div>
                                  <span className="font-medium">{cat.nom}</span>
                                  <p className="text-gray-400 hidden md:block">{new Date(cat.createdAt).toLocaleDateString("fr-FR")}</p>
                                </div>
                                <div className="flex items-center gap-5 justify-center">
                                  <EditCategoriePage CategoriesID={cat.id} />
                                  <Dialog>
              
                                    <DialogTrigger >
                                      <div
                                      className="bg-[#ff413a] h-9 px-2 py-2 has-[>svg]:px-3  rounded hover:bg-[#ff413a]/90"
                                      >
                                        <IconTrash size={45} className="text-white" />
                                      </div>
                                    </DialogTrigger>
                                    <DialogContent className="font-outfit rounded">
                                      <DialogHeader>
                                        <DialogTitle className="text-center">Supprimer le cours</DialogTitle>
                                      </DialogHeader>
                                      <div className="grid gap-3">
                                        <p>Tapez <span className="text-destructive">sudo delete {cat.nom}</span> pour confirmer la suppression de tout.</p>
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
                                          onClick={() => handleDeleteCategorie(cat.id, cat.nom)}
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
                      <CommandSeparator />
              <CommandGroup heading="Cours">
                {videos.map((video) => (
                  <CommandItem key={video.id} className="mb-2">
                    <div className="flex gap-4 w-full">
                      <Image src={`${video.thumbnail}`} width={200} height={200} className="w-[100px] h-[60px] rounded" alt={video.title || "Auteur"} />
                      <div className="w-[90%] flex justify-between items-center">
                        <div>
                          <span className="font-medium">{video.title}</span>
                          <p className="text-gray-400 hidden md:block">{video.description.slice(0, 30)}...</p>
                          <p className="text-gray-400 md:hidden block">{video.description.slice(0, 10)}...</p>
                          <p className="text-gray-400 hidden md:block">{new Date(video.createdAt).toLocaleDateString("fr-FR")}</p>
                        </div>
                        <div className="flex items-center gap-5 justify-center">
                          {/* //<CoursEdits cours={cours} /> */}
                          <VideoEdit video={video} />
                          <Dialog>
                            <DialogTrigger>
                              <div className="bg-[#ff413a] h-9 px-4 py-2 has-[>svg]:px-3  rounded hover:bg-[#ff413a]/90">
                                <IconTrash size={45} className="text-white" />
                              </div>
                            </DialogTrigger>
                            <DialogContent className="font-outfit rounded">
                              <DialogHeader>
                                <DialogTitle className="text-center">Supprimer le cours</DialogTitle>
                              </DialogHeader>
                              <div className="grid gap-3">
                                <p>Tapez <span className="text-destructive">sudo delete {video.title}</span> pour confirmer la suppression de tout.</p>
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
                                      onClick={() => handleDeleteBusnis(video.id, video.title)}
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
    </div>
  )
}