"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { useMediaQuery } from "@/hooks/use-media-query"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog"
import { AlertCircleIcon, PaperclipIcon, UploadIcon, XIcon } from "lucide-react"
import { useEffect, useState } from "react"
import {
    formatBytes,
    useFileUpload,
} from "@/hooks/use-file-upload"
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
import { toast } from "sonner"
import { HandCoins } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { ScrollArea } from "../ui/scroll-area"
import Image from "next/image"
import { images } from "@/constants/images"
import { Textarea } from "../ui/textarea"
import { IconCircleDashedCheck } from "@tabler/icons-react"

// const initialFiles = [
//     {
//         name: "document.pdf",
//         size: 1528737,
//         type: "application/pdf",
//         url: "https://picsum.photos/1000/800?grayscale&random=1",
//         id: "document.pdf-1744638436563-8u5xuls",
//     },
// ]
type Categorie = {
    id: number
    nom: string
    createdAt: string
}


const Addbusiness = () => {
    const [open, setOpen] = React.useState(false)
    const isDesktop = useMediaQuery("(min-width: 768px)")

    if (isDesktop) {
        return (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <div
                        className="group cursor-pointer relative h-full w-full py-8 flex flex-col gap-4 justify-center items-center px-4 border border-transparent text-sm font-medium text-white bg-[#f4a100]/90 hover:bg-[#f4a100] rounded-lg text-whitefocus:outline-none focus:ring-2 focus:ring-offset-2  disabled:opacity-50"
                    >
                        <HandCoins size={40} />
                        <p className="text-lg text-center">Créer un business</p>
                    </div>
                </DialogTrigger>
                <DialogContent className="sm:min-w-[800px] flex flex-col items-center rounded">
                    <DrawerHeader>
                        <DrawerTitle className="outfit text-center">Crée un nouvelle business</DrawerTitle>
                        <DrawerDescription className="outfit -ml-4">
                            remarquer si tu crée un nouvelle business cette cours sera visible par tous
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
                    className="group cursor-pointer relative h-full w-full py-8 flex flex-col gap-4 justify-center items-center px-4 border border-transparent text-sm font-medium text-white bg-[#f4a100]/90 hover:bg-[#f4a100] rounded-lg text-whitefocus:outline-none focus:ring-2 focus:ring-offset-2  disabled:opacity-50"
                >
                    <HandCoins size={40} />
                    <p className="text-lg text-center">Créer un business</p>
                </div>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle className="outfit text-center">Crée un nouvelle business</DrawerTitle>
                    <DrawerDescription className="outfit text-center">
                        remarquer si tu crée un nouvelle cours cette cours sera visible par tous
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

export default Addbusiness

function ProfileForm({ className }: React.ComponentProps<"form">) {
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [categorie, setCategorie] = useState("")
    const [description, setDescription] = useState("");
    const [coverFile, setCoverFile] = useState<File | null>(null);
    const [introFile, setIntroFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(true)
    const [categories, setCategories] = useState<Categorie[]>([])


    const maxSize = 5024 * 1024 * 1024 // 10MB default

    const [
        { files, isDragging, errors },
        {
            handleDragEnter,
            handleDragLeave,
            handleDragOver,
            handleDrop,
            openFileDialog,
            removeFile,
            getInputProps,
        },
    ] = useFileUpload({
        maxSize,
        // initialFiles,
    })

    const file = files[0]

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch("/api/categories")
                const data = await res.json()
                setCategories(data)
            } catch (err) {
                console.error("Erreur:", err)
            } finally {
                setLoading(false)
            }
        }

        fetchCategories()
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append("titre", title)
        formData.append("prix", price)
        formData.append("categorie", categorie)
        formData.append("description", description)
        formData.append("zip", file.file as File)
        formData.append("image", coverFile as File)
        formData.append("intro", introFile as File)

        try {
            const res = await fetch("/api/busines", {
                method: "POST",
                body: formData,
            })

            if (res.ok) {
                //const data = await res.json()
                //console.log("Business ajouté :", data)
                toast(<div className="text-green-700 font-outfit text-sm flex gap-2 items-center"><IconCircleDashedCheck /> Cours ajouté avec succès !</div>)
                setTitle("")
                setPrice("")
                setCategorie("")
                setDescription("")
                setCoverFile(null)
                setIntroFile(null)
                removeFile(files[0]?.id)
            } else {
                const errorData = await res.json()
                console.error("Erreur API :", errorData)
            }
        } catch (error) {
            console.error("Erreur réseau :", error)
        }
    }


    // const handleSubmit = async (e: React.FormEvent) => {
    //   e.preventDefault();

    //   if (!file || !coverFile || !introFile) {
    //     alert("Tous les fichiers sont requis.");
    //     return;
    //   }

    //   const formData = new FormData();
    //   formData.append("title", title);
    //   formData.append("price", price);
    //   formData.append("category", category);
    //   formData.append("description", description);
    //   formData.append("mainFile", file.file as File); // ZIP
    //   formData.append("coverFile", coverFile); // Image
    //   formData.append("introFile", introFile); // PDF

    //   const res = await fetch("/api/busines", {
    //     method: "POST",
    //     body: formData,
    //   });

    //   if (!res.ok) {
    //      const errorData = await res.json();
    //   console.error("Erreur lors de l'envoi du formulaire :", errorData);
    //   } else {
    //     const data = await res.json();
    //     console.log("Cours créé :", data);
    //   }
    // };



    return (
        <form onSubmit={handleSubmit} className={cn("grid items-start w-full gap-6 outfit", className)}>
            <ScrollArea className=" h-[65vh] items-start space-y-6 w-full " >
                <div className="flex flex-wrap-reverse lg:flex-wrap justify-between gap-6 lg:gap-0 w-full">
                    <div className="flex w-full lg:w-[45%] flex-col gap-2">
                        {/* Drop area */}<Label htmlFor="username">Fichier Principal du Cours (ZIP du dossier)</Label>
                        <div
                            role="button"
                            onClick={openFileDialog}
                            onDragEnter={handleDragEnter}
                            onDragLeave={handleDragLeave}
                            onDragOver={handleDragOver}
                            onDrop={handleDrop}
                            data-dragging={isDragging || undefined}
                            className="border-input hover:bg-accent/50 data-[dragging=true]:bg-accent/50 has-[input:focus]:border-ring has-[input:focus]:ring-ring/50 flex min-h-40 flex-col items-center justify-center rounded border shadow p-4 transition-colors has-disabled:pointer-events-none has-disabled:opacity-50 has-[input:focus]:ring-[3px]"
                        >
                            <input
                                {...getInputProps()}
                                className="sr-only"
                                aria-label="Upload file"
                                disabled={Boolean(file)}
                                accept=".zip, .rar, .7z"
                            />

                            <div className="flex flex-col items-center justify-center text-center">
                                <div
                                    className="bg-background mb-2 flex size-11 shrink-0 items-center justify-center rounded-full border"
                                    aria-hidden="true"
                                >
                                    <UploadIcon className="size-4 opacity-60" />
                                </div>
                                <p className="mb-1.5 text-sm font-medium">Télécharger le fichier</p>
                                <p className="text-muted-foreground text-xs">
                                    Glissez-déposez ou cliquez pour parcourir (max. {formatBytes(maxSize)})
                                </p>
                            </div>
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

                        {/* File list */}
                        {file && (
                            <div className="space-y-2">
                                <div
                                    key={file.id}
                                    className="flex items-center justify-between gap-2 rounded border px-4 py-2"
                                >
                                    <div className="flex items-center gap-3 overflow-hidden">
                                        <PaperclipIcon
                                            className="size-4 shrink-0 opacity-60"
                                            aria-hidden="true"
                                        />
                                        <div className="min-w-0">
                                            <p className="truncate text-[13px] font-medium">
                                                {file.file.name}
                                            </p>
                                        </div>
                                    </div>

                                    <Button
                                        size="icon"
                                        variant="ghost"
                                        className="text-muted-foreground/80 hover:text-foreground -me-2 size-8 hover:bg-transparent"
                                        onClick={() => removeFile(files[0]?.id)}
                                        aria-label="Remove file"
                                    >
                                        <XIcon className="size-4" aria-hidden="true" />
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="space-y-6 w-full lg:w-[50%] ">
                        <div className="grid gap-3.5">
                            <Label htmlFor="titre">Titre du cours</Label>
                            <Input id="titre" value={title} onChange={(e) => setTitle(e.target.value)} className="rounded" placeholder="Entre votre nouvelle cours" />
                        </div>
                        <div className="grid gap-3.5">
                            <Label htmlFor="price">Prix du cours</Label>
                            <Input id="price" value={price} onChange={(e) => setPrice(e.target.value)} className="rounded" placeholder="Entre votre prix du cours" />
                        </div>
                        <div className="grid gap-3.5">
                            <Label htmlFor="category">Categorie du cours</Label>
                            <Select onValueChange={(value) => setCategorie(value)}>
                                <SelectTrigger className="w-full rounded">
                                    <SelectValue placeholder="Choisir une categorie" />
                                </SelectTrigger>
                                <SelectContent className="rounded">

                                    {loading ? (
                                        <p className="outfit">Chargement...</p>
                                    ) : categories.length === 0 ? (
                                        <p className="outfit">Aucune catégorie trouvée.</p>
                                    ) : (
                                        <ul className="space-y-2 outfit">
                                            {categories.map((cat) => (
                                                <SelectItem
                                                    value={cat.nom}
                                                    key={cat.id}
                                                >
                                                    {cat.nom}
                                                </SelectItem>
                                            ))}
                                        </ul>
                                    )}

                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>
                <div className="flex flex-wrap justify-between mt-6 gap-6 lg:gap-0 w-full">
                    <div className="flex w-full lg:w-[45%] flex-col gap-3.5">
                        <Label htmlFor="intro">Fichier d'Introduction (PDF, etc.)</Label>
                        <Input id="intro" onChange={(e) => setIntroFile(e.target.files?.[0] || null)} type="file" className="rounded" placeholder="Entre votre description du cours" />
                    </div>
                    <div className="flex w-full lg:w-[50%] flex-col gap-3.5">
                        <Label htmlFor="couver">Photo de couverture du Cours (Image)</Label>
                        <Input id="couver" onChange={(e) => setCoverFile(e.target.files?.[0] || null)} type="file" className="rounded" placeholder="Entre votre lien du cours" />
                    </div>
                </div>
                <div className="mt-6 w-full flex flex-col gap-3.5">
                    <Label htmlFor="message">Description du cours</Label>
                    <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Entre la description de votre cours" id="message" className="rounded w-[99.5%] min-h-20 m-auto" />
                </div>
                <Button className="rounded mt-6 w-full mb-6 lg:mb-0" type="submit">Valide le business</Button>
            </ScrollArea>
        </form>
    )
} 