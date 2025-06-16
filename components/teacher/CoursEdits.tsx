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
import { images } from "@/constants/images"
import { SquarePen, X, AlertCircleIcon, ImageIcon, UploadIcon, XIcon, Settings } from "lucide-react"
import Image from "next/image"
import { useFileUpload } from "@/hooks/use-file-upload"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { SidebarMenuAction, useSidebar } from "../ui/sidebar"
import { IconDots, IconFolder, IconShare3 } from "@tabler/icons-react"
import { DelletCours } from "./DelletCours"
import AddSoutitre from "./AddSoutitre"

const CoursEdits = () => {
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

    return (
        <Drawer>
            <DrawerTrigger>
                <div className="h-9 px-4 py-2 has-[>svg]:px-3 rounded border bg-green-700 text-white shadow-xs hover:bg-green-700/90 hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50">
                    <SquarePen size={45} className="text-white" />
                </div>
            </DrawerTrigger>
            <DrawerContent>

                <DrawerHeader>
                    <div className="w-full flex justify-between">
                        <DrawerTitle className="outfit">Modification du cours de Titre de cours</DrawerTitle>
                        <DrawerClose>
                            <X className="hover:text-red-600" />
                        </DrawerClose>
                    </div>
                </DrawerHeader>
                <ScrollArea className="px-4 h-[65vh] w-full font-outfit">
                    <div className="flex gap-7 lg:gap-0 flex-wrap justify-between w-full h-full">
                        <ScrollArea className="shadow m-1 p-4 rounded-lg lg:w-[45%] w-full h-[64vh]">
                            <div className="flex flex-wrap w-full gap-6">
                                <div className="w-fit flex justify-center items-center absolute right-0 mr-6 mt-1.5 lg:mt-0">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <SidebarMenuAction className="shadow bg-background p-1 w-8 h-8 flex justify-center items-center rounded-full">
                                                <Settings />
                                            </SidebarMenuAction>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent
                                            className="w-24 rounded"
                                            side={isMobile ? "bottom" : "right"}
                                            align={isMobile ? "end" : "start"}
                                        >
                                            <DropdownMenuItem className="rounded">
                                                <IconFolder />
                                                <span>Open</span>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem className="rounded">
                                                <DelletCours />
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                                <Image src={images.LangagePython} width={500} height={500} className="lg:w-64 lg:h-32 rounded-md w-full h-48" alt={"LogoFalarohy"} />
                                <div className="space-y-3">
                                    <p className="text-xl flex"><span className="block lg:hidden mr-2">Titre : </span> Titre du cours</p>
                                    <div className="space-y-1">
                                        <p className="text-gray-600 flex"><span className="block lg:hidden mr-2">Prix :</span>0000 Ar</p>
                                        <p className="text-gray-600 flex"><span className="block lg:hidden mr-2">Date :</span>12 / 02 / 2025</p>
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
                                <DrawerDescription >
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia dignissimos earum dolores tenetur corporis dolorem aliquam doloribus officiis minus maxime beatae ullam possimus eveniet rem repellat et, reprehenderit illum quibusdam.
                                </DrawerDescription>
                                <Accordion type="single" collapsible>
                                    <AccordionItem value="item-1">
                                        <AccordionTrigger>Soutitre du cours</AccordionTrigger>
                                        <AccordionContent>
                                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Distinctio.
                                        </AccordionContent>
                                    </AccordionItem>
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
                                    <form action="" className="w-full space-y-4 h-full pb-4" >
                                        <div className="w-full h-full">
                                            <div className="space-y-2">
                                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                                    Changer le titre
                                                </label>
                                                <input
                                                    id="titrechanger"
                                                    name="titrechanger"
                                                    type="text"
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
                                                    type="text"
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
                                            <div className="space-y-2">
                                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                                    Changer le description
                                                </label>
                                                <input
                                                    id="prixchanger"
                                                    name="prixchanger"
                                                    type="text"
                                                    placeholder="Entre votre nouvell prix"
                                                    required
                                                    className="mt-1 block w-full px-3 py-1.5 placeholder:text-sm border border-gray-300 rounded  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                                />
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
                                    <AddSoutitre />
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