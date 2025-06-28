"use client"

import { Button } from "@/components/ui/button"
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
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { SquarePen, X, AlertCircleIcon, ImageIcon, UploadIcon, XIcon, Loader2 } from "lucide-react"
import Image from "next/image"
import { useFileUpload } from "@/hooks/use-file-upload"
import { useSidebar } from "../ui/sidebar"
import AddSoutitre from "./AddSoutitre"
import { Label } from "../ui/label"
import { Textarea } from "../ui/textarea"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { IconCircleDashedCheck, IconError404, IconTrash } from "@tabler/icons-react"
import ReactPlayer from 'react-player';


type Cours = {
    cours: {
        id: string
        titre: string
        prix: number
        description: string
        imageUrl: string
        publicId: string
        categorie: string
        createdAt: string
        user: {
            name: string | null
            email: string
            image: string | null
        }
    }
}
type Soutitre = {
    id: string
    titre: string
    description : string
    videoUrl: string
    publicId: string
    coursId: string
    createdAt: string
    cours: {
        id: string
        titre: string
        imageUrl: string
        publicId: string
    }
}

const CoursEdits = ({ cours }: Cours) => {
    const [titre, setTitre] = useState(cours.titre)
    const [prix, setPrix] = useState(String(cours.prix))
    const [description, setDescription] = useState(cours.description)
    const maxSizeMB = 2
    const maxSize = maxSizeMB * 1024 * 1024 // 2MB default
    const maxFiles = 6
    const [
        { files, isDragging, errors },
        {
            handleDragEnter,
            handleDragLeave,
            handleDragOver,
            handleDrop,
            openFileDialog,
            removeFile,
            clearFiles,
            getInputProps,
        },
    ] = useFileUpload({
        accept: "image/svg+xml,image/png,image/jpeg,image/jpg,image/gif",
        maxSize,
        multiple: true,
        maxFiles
    })
    const previewUrl = files[0]?.preview || null
    const fileName = files[0]?.file.name || null
    const { isMobile } = useSidebar()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append("titre", titre)
        formData.append("prix", prix)
        formData.append("description", description)

        if (files.length > 0 && files[0].file) {
            formData.append("image", files[0].file as File)
        }

        const res = await fetch(`/api/cours/${cours.id}`, {
            method: "PUT",
            body: formData,
        })

        if (res.ok) {
            //  alert("Cours modifié avec succès !")
            toast(<div className="text-green-700 font-outfit text-sm flex gap-2 items-center"><IconCircleDashedCheck /> Cours modifié avec succès !</div>)
            setTitre("")
            setPrix("")
            setDescription("")
        } else {
            const error = await res.json()
            //alert("Erreur: " + error.message)
            toast(<div className="text-red-700 font-outfit text-sm flex gap-2 items-center"><IconError404 /> {error.message} !</div>)
        }
    }

    const [soutitre, setSoutire] = useState<Soutitre[]>([])
    const [loading, setLoading] = useState(true)


    const fetchCours = async () => {
        try {
            const res = await fetch(`/api/soustitres/${cours.id}`)
            const data = await res.json()
            setSoutire(data)
        } catch (error) {
            console.error("Erreur chargement des cours:", error)
        } finally {
            setLoading(false)
        }
    }



    const handleDelete = async (coursId: string) => {
        const res = await fetch(`/api/soustitres/${coursId}`, {
            method: "DELETE",
        })

        if (res.ok) {
            //  alert("Sous-titre supprimé !")
            toast(<div className="text-green-700 font-outfit text-sm flex gap-2 items-center"><IconCircleDashedCheck /> Sous-titre supprimé !</div>)
        } else {
            //alert("Erreur lors de la suppression")
            toast(<div className="text-red-700 font-outfit text-sm flex gap-2 items-center"><IconError404 /> Erreur lors de la suppression</div>)
        }

    }
    useEffect(() => {
        fetchCours()
    }, [])
    if (loading) {
        return (
            <div className="flex w-ful h-full justify-center items-center">
                <Loader2 className="animate-spin h-8 w-8 text-muted-foreground" />
            </div>
        )
    }

    return (
        <Drawer>
            <DrawerTrigger>
                <div className="h-9 px-4 py-2 has-[>svg]:px-3 rounded border bg-green-700 text-white shadow-xs hover:bg-green-700/90 hover:text-accent-foreground dark:bg-green-700 dark:border-input dark:hover:bg-green-700/90">
                    <SquarePen size={45} className="text-white" />
                </div>
            </DrawerTrigger>
            <DrawerContent>

                <DrawerHeader>
                    <div className="w-full flex justify-between">
                        <DrawerTitle className="outfit">Modification du cours de {cours.titre}</DrawerTitle>
                        <DrawerClose>
                            <X className="hover:text-red-600" />
                        </DrawerClose>
                    </div>
                </DrawerHeader>
                <ScrollArea className="px-4 h-[65vh] w-full font-outfit">
                    <div className="flex gap-7 lg:gap-0 flex-wrap justify-between w-full h-full">
                        <ScrollArea className="shadow m-1 p-4 rounded-lg lg:w-[45%] w-full h-[64vh]">
                            <div className="flex flex-wrap w-full gap-6">
                                <Image src={cours.imageUrl} width={500} height={500} className="lg:w-64 lg:h-32 rounded-md w-full h-48" alt={cours.titre} />
                                <div className="space-y-3">
                                    <p className="text-xl flex"><span className="block lg:hidden mr-2">Titre : </span> {cours.titre}</p>
                                    <div className="space-y-1">
                                        <p className="text-gray-600 flex"><span className="block lg:hidden mr-2">Prix :</span>{cours.prix} Ar</p>
                                        <p className="text-gray-600 flex"><span className="block lg:hidden mr-2">Date :</span>{cours.createdAt.slice(0, 10)}</p>
                                        <div className="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:grayscale">
                                            <Avatar>
                                                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                                <AvatarFallback>CN</AvatarFallback>
                                            </Avatar>
                                            <Avatar>
                                                <AvatarImage src="https://github.com/leerob.png" alt="@leerob" />
                                                <AvatarFallback>LR</AvatarFallback>
                                            </Avatar>
                                            <Avatar>
                                                <AvatarImage
                                                    src="https://github.com/evilrabbit.png"
                                                    alt="@evilrabbit"
                                                />
                                                <AvatarFallback>ER</AvatarFallback>
                                            </Avatar>
                                            <Avatar>
                                                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                                <AvatarFallback>CN</AvatarFallback>
                                            </Avatar>
                                        </div>
                                    </div>
                                </div>
                                <DrawerDescription className="h-[60px] overflow-hidden text-ellipsis" >
                                    {cours.description}
                                </DrawerDescription>
                                <Accordion type="single" className="w-full" collapsible>
                                    {soutitre.map((soutitre) => (
                                        <AccordionItem key={soutitre.id} value="item-1" className="w-full">
                                            <AccordionTrigger>{soutitre.titre}</AccordionTrigger>
                                            <AccordionContent className="space-y-6">
                                                {/* {soutitre.videoUrl && <video controls className="w-full h-48 object-cover rounded" src={soutitre.videoUrl} />} */}
                                                <ReactPlayer url={soutitre.videoUrl} controls width="100%" className="w-full h-48 object-cover rounded" height="192px" />
                                                <p>{soutitre.description}</p>
                                            </AccordionContent>
                                            <div className="flex justify-end">
                                                <button
                                                onClick={() => handleDelete(soutitre.id)}
                                                className="bg-[#ff413a] px-2 py-2 rounded hover:bg-[#ff413a]/90"
                                            >
                                                <IconTrash size={15} className="text-white" />
                                            </button>
                                            </div>
                                        </AccordionItem>
                                    ))}
                                </Accordion>
                            </div>
                        </ScrollArea>

                        <ScrollArea className="w-full shadow m-1 rounded-lg lg:w-[53%] h-[64vh] p-4">
                            <Tabs defaultValue="modif" className="w-full">
                                <TabsList className="w-full rounded mt-2">
                                    <TabsTrigger className="rounded" value="modif">Modification du cours</TabsTrigger>
                                    <TabsTrigger className="rounded" value="soutitre">Plus de soutitre</TabsTrigger>
                                </TabsList>
                                <TabsContent value="modif">
                                    <form onSubmit={handleSubmit} className="w-full space-y-4 h-full pb-4" >
                                        <div className="w-full h-full">
                                            <div className="space-y-2">
                                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                                    Changer le titre
                                                </label>
                                                <input
                                                    id="titrechanger"
                                                    name="titrechanger"
                                                    type="text"
                                                    value={titre}
                                                    onChange={(e) => setTitre(e.target.value)}
                                                    placeholder="Entre votre nouvell titre"
                                                    required
                                                    className="mt-1 block w-full px-3 py-1.5 placeholder:text-sm border border-gray-300 rounded  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                                />
                                            </div>
                                        </div>
                                        <div className="w-full h-full">
                                            <div className="space-y-2">
                                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                                    Changer le prix
                                                </label>
                                                <input
                                                    id="prixchanger"
                                                    name="prixchanger"
                                                    type="number"
                                                    value={prix}
                                                    onChange={(e) => setPrix(e.target.value)}
                                                    placeholder="Entre votre nouvell prix"
                                                    required
                                                    className="mt-1 block w-full px-3 py-1.5 placeholder:text-sm border border-gray-300 rounded  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                                changer l'image
                                            </label>
                                            <div className="relative">
                                                <div
                                                    onDragEnter={handleDragEnter}
                                                    onDragLeave={handleDragLeave}
                                                    onDragOver={handleDragOver}
                                                    onDrop={handleDrop}
                                                    data-dragging={isDragging || undefined}
                                                    className="border-input data-[dragging=true]:bg-accent/50 has-[input:focus]:border-ring has-[input:focus]:ring-ring/50 relative flex min-h-52 flex-col items-center justify-center overflow-hidden rounded border p-4 transition-colors has-[input:focus]:ring-[3px]"
                                                >
                                                    <input
                                                        {...getInputProps()}
                                                        className="sr-only"
                                                        aria-label="Télécharger le fichier image"
                                                    />
                                                    {previewUrl ? (
                                                        <div className="absolute inset-0 flex items-center justify-center p-4">
                                                            <img
                                                                src={previewUrl}
                                                                alt={files[0]?.file?.name || "Image téléchargée"}
                                                                className="mx-auto max-h-full rounded object-contain"
                                                            />
                                                        </div>
                                                    ) : (
                                                        <div className="flex flex-col items-center justify-center px-4 py-3 text-center">
                                                            <div
                                                                className="bg-background mb-2 flex size-11 shrink-0 items-center justify-center rounded-full border"
                                                                aria-hidden="true"
                                                            >
                                                                <ImageIcon className="size-4 opacity-60" />
                                                            </div>
                                                            <p className="mb-1.5 text-sm font-medium">Déposez votre image ici</p>
                                                            <p className="text-muted-foreground text-xs">
                                                                SVG, PNG, JPG ou GIF (max. {maxSizeMB}Mo)
                                                            </p>
                                                            <Button
                                                                variant="outline"
                                                                className="mt-4 rounded shadow-none px-8!"
                                                                onClick={openFileDialog}
                                                            >
                                                                <UploadIcon
                                                                    className="-ms-1 size-4 opacity-60"
                                                                    aria-hidden="true"
                                                                />
                                                                Sélectionnez une image
                                                            </Button>
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
                                        <div className="w-full h-full">
                                            <div className="grid w-full gap-3">
                                                <Label htmlFor="message">Description du cours</Label>
                                                <Textarea placeholder="Entre la description de votre cours"
                                                    id="description"
                                                    value={description}
                                                    onChange={(e) => setDescription(e.target.value)}
                                                    className="rounded w-[99.5%] min-h-20 m-auto" />
                                            </div>
                                        </div>
                                        <button
                                            type="submit"
                                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                                        >
                                            Valide les modification
                                        </button>
                                    </form>
                                </TabsContent>
                                <TabsContent value="soutitre">
                                    <AddSoutitre coursId={cours.id} />
                                </TabsContent>
                            </Tabs>

                        </ScrollArea>
                    </div>
                </ScrollArea>
                <DrawerFooter>
                    <p className="qualyneue text-center text-orangeme">falarohy</p>
                </DrawerFooter>

            </DrawerContent>
        </Drawer>

    )
}

export default CoursEdits