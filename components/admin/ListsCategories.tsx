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



// "use client"

// import { useState, useEffect } from 'react'
// import { PlusIcon, EditIcon, TrashIcon, ImageIcon } from 'lucide-react'
// import { CategorieResponse } from '@/types/categorie'

// interface CategoryListProps {
//   onEdit: (category: CategorieResponse) => void
//   onDelete: (id: number) => void
//   onCreate: () => void
//   isLoading?: boolean
// }

// export default function CategoryList({ 
//   onEdit, 
//   onDelete, 
//   onCreate, 
//   isLoading = false 
// }: CategoryListProps) {
//   const [categories, setCategories] = useState<CategorieResponse[]>([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)
//   const [deletingId, setDeletingId] = useState<number | null>(null)

//   const fetchCategories = async () => {
//     try {
//       setLoading(true)
//       setError(null)
      
//       const response = await fetch('/api/categories')
//       const data = await response.json()

//       if (!response.ok) {
//         throw new Error(data.error || `Erreur ${response.status}`)
//       }

//       if (!data.success) {
//         throw new Error(data.error || 'Erreur lors du chargement')
//       }

//       setCategories(data.data || [])
//     } catch (err) {
//       console.error('Erreur lors du chargement des catégories:', err)
//       setError(err instanceof Error ? err.message : 'Erreur inconnue')
//     } finally {
//       setLoading(false)
//     }
//   }

//   useEffect(() => {
//     fetchCategories()
//   }, [])

//   const handleDelete = async (id: number) => {
//     const category = categories.find(c => c.id === id)
//     if (!category) return

//     const confirmMessage = `Êtes-vous sûr de vouloir supprimer la catégorie "${category.nom}" ?`
//     if (!confirm(confirmMessage)) {
//       return
//     }

//     try {
//       setDeletingId(id)
      
//       const response = await fetch(`/api/categories/${id}`, {
//         method: 'DELETE'
//       })

//       const data = await response.json()

//       if (!response.ok) {
//         throw new Error(data.error || `Erreur ${response.status}`)
//       }

//       if (!data.success) {
//         throw new Error(data.error || 'Erreur lors de la suppression')
//       }

//       // Mettre à jour la liste localement
//       setCategories(prev => prev.filter(cat => cat.id !== id))
      
//       // Notifier le parent
//       onDelete(id)
      
//       // Optionnel: notification de succès
//       alert('Catégorie supprimée avec succès!')
      
//     } catch (err) {
//       console.error('Erreur lors de la suppression:', err)
//       alert(err instanceof Error ? err.message : 'Erreur lors de la suppression')
//     } finally {
//       setDeletingId(null)
//     }
//   }

//   const formatDate = (dateString: string) => {
//     try {
//       return new Date(dateString).toLocaleDateString('fr-FR', {
//         day: '2-digit',
//         month: '2-digit',
//         year: 'numeric',
//         hour: '2-digit',
//         minute: '2-digit'
//       })
//     } catch {
//       return 'Date invalide'
//     }
//   }

//   const refreshCategories = () => {
//     fetchCategories()
//   }

//   if (loading) {
//     return (
//       <div className="flex flex-col items-center justify-center py-12">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
//         <p className="text-gray-600">Chargement des catégories...</p>
//       </div>
//     )
//   }

//   if (error) {
//     return (
//       <div className="text-center py-12">
//         <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
//           <h3 className="text-red-800 font-semibold mb-2">Erreur de chargement</h3>
//           <p className="text-red-600 mb-4">{error}</p>
//           <button
//             onClick={refreshCategories}
//             disabled={loading}
//             className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50"
//           >
//             {loading ? 'Chargement...' : 'Réessayer'}
//           </button>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="space-y-6">
//       {/* En-tête avec statistiques */}
//       <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
//         <div>
//           <h2 className="text-3xl font-bold text-gray-900">Catégories</h2>
//           <p className="text-gray-600 mt-1">
//             {categories.length} catégorie{categories.length > 1 ? 's' : ''} au total
//           </p>
//         </div>
//         <div className="flex gap-3">
//           <button
//             onClick={refreshCategories}
//             disabled={loading}
//             className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 disabled:opacity-50"
//           >
//             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
//             </svg>
//             Actualiser
//           </button>
//           <button
//             onClick={onCreate}
//             disabled={isLoading}
//             className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             <PlusIcon className="w-4 h-4" />
//             Nouvelle catégorie
//           </button>
//         </div>
//       </div>

//       {/* Liste des catégories */}
//       {categories.length === 0 ? (
//         <div className="text-center py-12">
//           <div className="bg-gray-50 rounded-lg p-8 max-w-md mx-auto">
//             <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
//               <ImageIcon className="w-8 h-8 text-gray-400" />
//             </div>
//             <h3 className="text-lg font-semibold text-gray-900 mb-2">
//               Aucune catégorie trouvée
//             </h3>
//             <p className="text-gray-600 mb-6">
//               Commencez par créer votre première catégorie pour organiser votre contenu.
//             </p>
//             <button
//               onClick={onCreate}
//               className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               <PlusIcon className="w-4 h-4" />
//               Créer ma première catégorie
//             </button>
//           </div>
//         </div>
//       ) : (
//         <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
//           {categories.map((category) => (
//             <div
//               key={category.id}
//               className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-200 hover:scale-[1.02]"
//             >
//               {/* Image de la catégorie */}
//               <div className="aspect-video bg-gray-100 relative">
//                 {category.imageUrl ? (
//                   <img
//                     src={category.imageUrl}
//                     alt={category.nom}
//                     className="w-full h-full object-cover"
//                     onError={(e) => {
//                       const target = e.target as HTMLImageElement
//                       target.style.display = 'none'
//                       target.nextElementSibling?.classList.remove('hidden')
//                     }}
//                   />
//                 ) : (
//                   <div className="w-full h-full flex items-center justify-center">
//                     <ImageIcon className="w-12 h-12 text-gray-400" />
//                   </div>
//                 )}
                
//                 {/* Placeholder en cas d'erreur d'image */}
//                 <div className="hidden w-full h-full flex items-center justify-center bg-gray-100">
//                   <div className="text-center">
//                     <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
//                     <p className="text-sm text-gray-500">Image non disponible</p>
//                   </div>
//                 </div>
                
//                 {/* Badge ID */}
//                 <div className="absolute top-2 left-2 bg-black bg-opacity-60 text-white px-2 py-1 rounded-md text-xs font-semibold">
//                   #{category.id}
//                 </div>
//               </div>

//               {/* Contenu de la carte */}
//               <div className="p-4 space-y-3">
//                 {/* Nom de la catégorie */}
//                 <div>
//                   <h3 className="font-semibold text-lg text-gray-900 truncate" title={category.nom}>
//                     {category.nom}
//                   </h3>
//                   {category.usercreat && (
//                     <p className="text-sm text-gray-600 mt-1">
//                       Créé par: <span className="font-medium">{category.usercreat}</span>
//                     </p>
//                   )}
//                 </div>

//                 {/* Informations de dates */}
//                 <div className="text-xs text-gray-500 space-y-1 bg-gray-50 p-2 rounded">
//                   <div className="flex justify-between">
//                     <span>Créé le:</span>
//                     <span className="font-medium">{formatDate(category.createdAt)}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span>Modifié le:</span>
//                     <span className="font-medium">{formatDate(category.updatedAt)}</span>
//                   </div>
//                 </div>

//                 {/* Actions */}
//                 <div className="flex gap-2 pt-2">
//                   <button
//                     onClick={() => onEdit(category)}
//                     disabled={isLoading || deletingId === category.id}
//                     className="flex items-center gap-1 px-3 py-2 text-sm text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//                   >
//                     <EditIcon className="w-3 h-3" />
//                     Modifier
//                   </button>
//                   <button
//                     onClick={() => handleDelete(category.id)}
//                     disabled={isLoading || deletingId === category.id}
//                     className="flex items-center gap-1 px-3 py-2 text-sm text-red-600 border border-red-600 rounded-md hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//                   >
//                     {deletingId === category.id ? (
//                       <>
//                         <div className="w-3 h-3 border border-red-400 border-t-transparent rounded-full animate-spin"></div>
//                         Suppression...
//                       </>
//                     ) : (
//                       <>
//                         <TrashIcon className="w-3 h-3" />
//                         Supprimer
//                       </>
//                     )}
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   )
// }