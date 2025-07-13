"use client"

import {
    formatBytes,
    useFileUpload
} from '@/hooks/use-file-upload'
import { AlertCircleIcon, FileVideo, UploadIcon, XIcon } from 'lucide-react'
import { Button } from '../ui/button'
import Image from 'next/image'
import { images } from '@/constants/images'
import { useState } from 'react'
import { toast } from "sonner"
import { IconCircleDashedCheck } from '@tabler/icons-react'
import { Textarea } from '../ui/textarea'

const AddSoutitre = ({ coursId }: { coursId: string }) => {
    const [sousTitre, setSousTitre] = useState("")
    const [sousDescription, setSousDescription] = useState("")
    const maxSizeMB = 2048
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
        accept: "video/*",
        maxSize,
        multiple: true,
        maxFiles,
        // initialFiles,
    })
    const previewUrl = files[0]?.preview || null
    const fileName = files[0]?.file.name || null

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!files[0] || !coursId) return

        const formData = new FormData()
        formData.append("titrechanger", sousTitre)
        formData.append("descriptionchanger", sousDescription)
        formData.append("coursId", coursId)
        formData.append("file", files[0].file as File) // fichier vidéo

        const res = await fetch("/api/soustitres", {
            method: "POST",
            body: formData,
        })

        const data = await res.json()
        if (res.ok) {
            //alert("Sous-titre ajouté !")
            toast(<div className="text-green-700 font-outfit text-sm flex gap-2 items-center"><IconCircleDashedCheck /> Cours ajouté avec succès !</div>)
            clearFiles()
            setSousTitre("")
            setSousDescription("")
            removeFile(files[0]?.id)
        } else {
            console.error("Erreur :", data.error)
        }
    }


    return (
        <form onSubmit={handleSubmit} className="w-full space-y-4 h-full pb-4" >
            <div className="w-full h-full">
                <div className="space-y-2">
                    <label htmlFor="soutitre" className="block text-sm font-medium text-gray-700">
                        Nouvaux soutitre
                    </label>
                    <input
                        id="soutitrechanger"
                        name="sousTitrechanger"
                        value={sousTitre}
                        onChange={(e) => setSousTitre(e.target.value)}
                        type="text"
                        placeholder="Entre votre nouvell soutitre"
                        required
                        className="mt-1 block w-full px-3 py-1.5 placeholder:text-sm border border-gray-300 rounded  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>
                <div className="space-y-2">
                    <label htmlFor="soutitre" className="block text-sm font-medium text-gray-700">
                        Description du soutitre
                    </label>
                    <Textarea name="sousDescription" className="rounded" value={sousDescription} onChange={(e) => setSousDescription(e.target.value)} placeholder="Description" />
                </div>
            </div>
            <div className="flex flex-col gap-2">
                {/* Drop area */}
                <label htmlFor="soutitre" className="block text-sm font-medium text-gray-700">
                    Ajoute les contenues
                </label>
                <div
                    onDragEnter={handleDragEnter}
                    onDragLeave={handleDragLeave}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    data-dragging={isDragging || undefined}
                    data-files={files.length > 0 || undefined}
                    className="border-input data-[dragging=true]:bg-accent/50 has-[input:focus]:border-ring has-[input:focus]:ring-ring/50 relative flex min-h-52 flex-col items-center overflow-hidden rounded border border-dashed p-4 transition-colors not-data-[files]:justify-center has-[input:focus]:ring-[3px]"
                >
                    <input
                        {...getInputProps()}
                        className="sr-only"
                        aria-label="Upload image file"
                    />
                    <div className="flex flex-col items-center justify-center px-4 py-3 text-center">
                        <div
                            className="bg-background mb-2 flex size-11 shrink-0 items-center justify-center rounded-full border"
                            aria-hidden="true"
                        >
                            <FileVideo className="size-4 opacity-60" />
                            {/* <ImageIcon className="size-4 opacity-60" /> */}
                        </div>
                        <p className="mb-1.5 text-sm font-medium">Déposez votre fichier ici</p>
                        <p className="text-muted-foreground text-xs">
                            MP4, WEBM, MKV ... (max. {maxSizeMB}Mo)
                        </p>
                        <Button
                            variant="outline"
                            className="mt-4 rounded shadow-none px-8!"
                            onClick={openFileDialog}>
                            <UploadIcon className="-ms-1 opacity-60" aria-hidden="true" />
                            Sélectionner le fichier
                        </Button>
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
                {files.length > 0 && (
                    <div className="space-y-2">
                        {files.map((file) => (
                            <div
                                key={file.id}
                                className="bg-background flex items-center justify-between gap-2 rounded border p-2 pe-3"
                            >
                                <div className="flex items-center gap-3 overflow-hidden">
                                    <div className="bg-accent aspect-square shrink-0 rounded">
                                        <Image
                                            src={images.videonew}
                                            alt={file.file.name}
                                            width={500}
                                            height={500}
                                            className="size-10 w-full rounded-[inherit] object-cover"
                                        />
                                    </div>
                                    <div className="flex min-w-0 flex-col gap-0.5">
                                        <p className="truncate text-[13px] block lg:hidden font-medium">
                                            {file.file.name.split(" ").slice(0, 2).join(" ")}...
                                        </p>
                                        <p className="truncate text-[13px] lg:block hidden font-medium">
                                            {file.file.name}
                                        </p>
                                        <p className="text-muted-foreground text-xs">
                                            {formatBytes(file.file.size)}
                                        </p>
                                    </div>
                                </div>

                                <Button
                                    size="icon"
                                    variant="ghost"
                                    className="text-muted-foreground/80 hover:text-foreground -me-2 size-8 rounded hover:bg-transparent"
                                    onClick={() => removeFile(file.id)}
                                    aria-label="Remove file"
                                >
                                    <XIcon aria-hidden="true" />
                                </Button>
                            </div>
                        ))}

                        {/* Remove all files button */}
                        {files.length > 1 && (
                            <div>
                                <Button size="sm" variant="outline" onClick={clearFiles}>
                                    Remove all files
                                </Button>
                            </div>
                        )}
                    </div>
                )}
            </div>
            <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
                Valide le soutitre
            </button>
        </form>
    )
}

export default AddSoutitre