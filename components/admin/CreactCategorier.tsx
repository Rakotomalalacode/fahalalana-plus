// "use client"

// import { useState } from 'react'
// import { AlertCircleIcon, ImageUpIcon, XIcon } from "lucide-react"
// import { useFileUpload } from "@/hooks/use-file-upload"
// import { CreateCategorieRequest, UpdateCategorieRequest, CategorieResponse } from '@/types/categorie'

// interface CategoryFormProps {
//   initialData?: CategorieResponse
//   onSubmit: (data: CreateCategorieRequest | UpdateCategorieRequest) => Promise<void>
//   onCancel: () => void
//   isSubmitting: boolean
// }

// export default function CategoryForm({ 
//   initialData, 
//   onSubmit, 
//   onCancel, 
//   isSubmitting 
// }: CategoryFormProps) {
//   const [nom, setNom] = useState(initialData?.nom || '')
//   const [usercreat, setUsercreat] = useState(initialData?.usercreat || '')
//   const [submitError, setSubmitError] = useState<string | null>(null)

//   const maxSizeMB = 5
//   const maxSize = maxSizeMB * 1024 * 1024 // 5MB default

//   const [
//     { files, isDragging, errors },
//     {
//       handleDragEnter,
//       handleDragLeave,
//       handleDragOver,
//       handleDrop,
//       openFileDialog,
//       removeFile,
//       getInputProps,
//     },
//   ] = useFileUpload({
//     accept: "image/*",
//     maxSize,
//   })

//   const previewUrl = files[0]?.preview || initialData?.imageUrl || null

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setSubmitError(null)

//     if (!nom.trim()) {
//       setSubmitError('Le nom de la catégorie est requis')
//       return
//     }

//     try {
//       const submitData: CreateCategorieRequest | UpdateCategorieRequest = {
//         nom: nom.trim(),
//         usercreat: usercreat.trim() || undefined,
//         image: files[0]?.file as File
//       }

//       await onSubmit(submitData)
//     } catch (error) {
//       setSubmitError(error instanceof Error ? error.message : 'Une erreur est survenue')
//     }
//   }

//   return (
//     <form onSubmit={handleSubmit} className="space-y-6">
//       {/* Nom de la catégorie */}
//       <div className="space-y-2">
//         <label htmlFor="nom" className="block text-sm font-medium">
//           Nom de la catégorie *
//         </label>
//         <input
//           type="text"
//           id="nom"
//           value={nom}
//           onChange={(e) => setNom(e.target.value)}
//           className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//           placeholder="Entrez le nom de la catégorie"
//           required
//         />
//       </div>

//       {/* Utilisateur créateur */}
//       <div className="space-y-2">
//         <label htmlFor="usercreat" className="block text-sm font-medium">
//           Utilisateur créateur
//         </label>
//         <input
//           type="text"
//           id="usercreat"
//           value={usercreat}
//           onChange={(e) => setUsercreat(e.target.value)}
//           className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//           placeholder="Nom de l'utilisateur (optionnel)"
//         />
//       </div>

//       {/* Upload d'image */}
//       <div className="space-y-2">
//         <label className="block text-sm font-medium">
//           Image de la catégorie
//         </label>
//         <div className="flex flex-col gap-2">
//           <div className="relative">
//             {/* Drop area */}
//             <div
//               role="button"
//               onClick={openFileDialog}
//               onDragEnter={handleDragEnter}
//               onDragLeave={handleDragLeave}
//               onDragOver={handleDragOver}
//               onDrop={handleDrop}
//               data-dragging={isDragging || undefined}
//               className="border-input hover:bg-accent/50 data-[dragging=true]:bg-accent/50 has-[input:focus]:border-ring has-[input:focus]:ring-ring/50 relative flex min-h-52 flex-col items-center justify-center overflow-hidden rounded-xl border border-dashed p-4 transition-colors has-disabled:pointer-events-none has-disabled:opacity-50 has-[img]:border-none has-[input:focus]:ring-[3px]"
//             >
//               <input
//                 {...getInputProps()}
//                 className="sr-only"
//                 aria-label="Upload file"
//               />
//               {previewUrl ? (
//                 <div className="absolute inset-0">
//                   <img
//                     src={previewUrl}
//                     alt={files[0]?.file?.name || "Image de la catégorie"}
//                     className="size-full object-cover"
//                   />
//                 </div>
//               ) : (
//                 <div className="flex flex-col items-center justify-center px-4 py-3 text-center">
//                   <div
//                     className="bg-background mb-2 flex size-11 shrink-0 items-center justify-center rounded-full border"
//                     aria-hidden="true"
//                   >
//                     <ImageUpIcon className="size-4 opacity-60" />
//                   </div>
//                   <p className="mb-1.5 text-sm font-medium">
//                     Déposez votre image ici ou cliquez pour parcourir
//                   </p>
//                   <p className="text-muted-foreground text-xs">
//                     Taille max: {maxSizeMB}MB
//                   </p>
//                 </div>
//               )}
//             </div>
//             {previewUrl && (
//               <div className="absolute top-4 right-4">
//                 <button
//                   type="button"
//                   className="focus-visible:border-ring focus-visible:ring-ring/50 z-50 flex size-8 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white transition-[color,box-shadow] outline-none hover:bg-black/80 focus-visible:ring-[3px]"
//                   onClick={() => removeFile(files[0]?.id)}
//                   aria-label="Supprimer l'image"
//                 >
//                   <XIcon className="size-4" aria-hidden="true" />
//                 </button>
//               </div>
//             )}
//           </div>

//           {errors.length > 0 && (
//             <div
//               className="text-destructive flex items-center gap-1 text-xs"
//               role="alert"
//             >
//               <AlertCircleIcon className="size-3 shrink-0" />
//               <span>{errors[0]}</span>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Erreur de soumission */}
//       {submitError && (
//         <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md border border-red-200">
//           {submitError}
//         </div>
//       )}

//       {/* Boutons d'action */}
//       <div className="flex gap-4 justify-end">
//         <button
//           type="button"
//           onClick={onCancel}
//           className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500"
//           disabled={isSubmitting}
//         >
//           Annuler
//         </button>
//         <button
//           type="submit"
//           disabled={isSubmitting}
//           className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
//         >
//           {isSubmitting ? 'Enregistrement...' : (initialData ? 'Mettre à jour' : 'Créer')}
//         </button>
//       </div>
//     </form>
//   )
// }