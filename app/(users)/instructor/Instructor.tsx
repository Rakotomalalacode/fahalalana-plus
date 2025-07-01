"use client"

import { images } from '@/constants/images';
import Image from 'next/image';
import {  signOut } from "next-auth/react"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { IconCheck, IconCircleDashedCheck } from '@tabler/icons-react';

import { useState } from 'react';
import { toast } from 'sonner';

export default function Intructor ({ session }: {session : string}) {
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState("")
   // const newSession = await getSession()
    const handleUpgrade = async () => {
        setLoading(true)
        try {
            const res = await fetch("/api/payerment/instructor", {
                method: "POST",
            })

            if (!res.ok) {
                throw new Error("Erreur lors de la mise à jour du rôle")
            }

            const data = await res.json()
            setMessage(data.message)
            signOut({callbackUrl: "/"})
            toast(<div className="text-green-700 font-outfit text-sm  items-center"><IconCircleDashedCheck /> La mise à jour du rôle a effectué avec succès et reconnectez-vous !</div>)
        } catch (err: any) {
            setMessage(err.message || "Une erreur est survenue")
        } finally {
            setLoading(false)
        }
    }
    return (
        <div className="font-outfit space-y-8">
            <div className="w-full lg:h-[500px] bg-[url(/images/bg-continue.png)] pt-8 lg:flex justify-end bg-cover bg-no-repeat">
                <div className='lg:w-[89%] w-full flex flex-wrap justify-between items-center px-4'>
                    <div className='lg:w-[40%] w-full flex flex-col gap-4'>
                        <h1 className="lg:text-5xl text-2xl">Joignez-vous à nous <span className='text-orangeme'>pour enseigner</span></h1>
                        <p>Nous offrons aux enseignants et aux jeunes les meilleures solutions d'apprentissage et générons des expériences positives qui mènent au succès.</p>
                        {session == "student" ? <button
                            onClick={handleUpgrade}
                            disabled={loading}
                            className="group relative cursor-pointer w-full lg:w-fit flex justify-center py-2 px-6 border border-transparent text-sm font-medium rounded text-white bg-orangeme/90 hover:bg-orangeme focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orangeme/80 disabled:opacity-50"
                        >{loading ? "Mise à jour en cours..." : "Devenir enseignant"}</button> : <p className="group relative cursor-pointer w-full lg:w-fit flex justify-center py-2 px-6 border border-transparent text-sm font-medium rounded text-white bg-orangeme/90 hover:bg-orangeme focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orangeme/80 disabled:opacity-50">Vous avez d&eacute;j&agrave; enseign&eacute;r</p> }
                    </div>
                    <Image src={images.virtualclassroom} alt="formation" width={600} height={600} className='self-end w-full lg:w-[50%] object-cover' />
                </div>
            </div>
            <div className="space-y-8 w-full lg:w-[95%] m-auto text-center px-4">
                <p className="text-2xl lg:text-4xl">Permettez à votre passion pour l'enseignement de s'épanouir,dévoilez votre aptitude véritable à nos côtés</p>
                <div className="flex  flex-wrap space-y-8 lg:space-y-0 lg:items-end items-center justify-center lg:justify-between">
                    <div className='flex border hover:bg-sidebar rounded-lg p-4 lg:pt-11 w-full lg:w-[330px]  shadow flex-col h-fit space-y-4 items-center justify-center'>
                        <Image src={images.imagesame} alt="formation" width={600} height={600} className='w-[50%] object-cover' />
                        <p className="text-lg">Améliorez votre parcours éducatif.</p>
                    </div>
                    <div className='flex border hover:bg-sidebar rounded-lg p-4 w-full lg:w-[330px] shadow flex-col h-fit space-y-4 items-center justify-center'>
                        <Image src={images.images__1} alt="formation" width={600} height={600} className='w-[50%] object-cover' />
                        <p className="text-lg">Toucher des apprenants à l'échelle mondiale.</p>
                    </div>
                    <div className='flex border hover:bg-sidebar rounded-lg p-4 w-full lg:w-[330px] shadow flex-col h-fit space-y-4 items-center justify-center'>
                        <Image src={images.téléchargement} alt="formation" width={600} height={600} className='w-[50%] object-cover' />
                        <p className="text-lg">Enseignez sur internet et recevez une rémunération</p>
                    </div>
                </div>
            </div>
            <div className='mt-8 px-4 bg-orangeme/20 lg:px-9 pt-8 w-full space-y-6 m-auto'>
                <p className="lg:text-5xl text-2xl">Comment devenir <span className='text-orangeme'>instructeur</span></p>
                <div className="flex flex-wrap justify-between">
                    <div className="w-full lg:w-[45%] ">
                        <Accordion type="single" defaultValue="item-1" className="w-full" collapsible>
                            <AccordionItem value="item-1" className="w-full">
                                <AccordionTrigger className='lg:text-3xl text-xl'>Élaborez votre programme</AccordionTrigger>
                                <AccordionContent className="space-y-3" >
                                    <p className='flex gap-2 items-center'><IconCheck className='text-green-500' /> Sélectionnez un thème qui s'aligne avec votre domaine de compétence et vos centres d'intérêt en tant qu'enseignant.</p>
                                    <p className='flex gap-2 items-center'><IconCheck className='text-green-500' /> Élaborer un programme exhaustif qui englobe les notions cruciales et les acquis d'apprentissage en relation avec le thème.</p>
                                    <p className='flex gap-2 items-center'><IconCheck className='text-green-500' /> Élaborer le programme de façon structurée et progressive, garantissant une transmission fluide des connaissances afin que les étudiants puissent aisément saisir le contenu.</p>
                                    <p className='flex gap-2 items-center'><IconCheck className='text-green-500' /> Intégrez une variété de matériel pédagogique, tels que des cours magistraux, des devoirs, des questionnaires et des ressources supplémentaires, pour améliorer l’expérience d’apprentissage.</p>
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-2" className="w-full">
                                <AccordionTrigger className='lg:text-3xl text-xl'>Création et publication de cours</AccordionTrigger>
                                <AccordionContent className="space-y-3" >
                                    <p className='flex gap-2 items-center'><IconCheck className='text-green-500' /> Enregistrez votre nouveau cours ou publiez vos cours existants. Inscrivez-vous/Connectez-vous pour accéder à votre espace auteur.</p>
                                    <p className='flex gap-2 items-center'><IconCheck className='text-green-500' /> Créez votre brouillon de cours, ajoutez les informations, téléchargez les vidéos et soumettez-le à la modération. (Remarque : l'ajout d'informations détaillées sur le cours permet aux étudiants de mieux le comprendre.)</p>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                    <Image src={images.rereer} alt="formation" width={600} height={600} className='lg:w-[50%] object-cover' />
                </div>
            </div>
        </div>
    )
}
