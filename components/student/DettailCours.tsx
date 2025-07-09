"use client";

import { IconBook, IconCircleDashedCheck, IconDevicesDollar, IconSettingsDown } from "@tabler/icons-react";
import { Loader, Timer, User } from "lucide-react";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
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
import ReactPlayer from "react-player";
import { images } from "@/constants/images";
import PaymentForm from "../paiement/PaymentForm";


interface SousTitre {
  videoUrl: string;
}

type Cours = {
  id: string;
  titre: string;
  description: string;
  imageUrl: string;
  publicId: string;
  prix: number;
  categorie: string;
  user: {
    name: string;
    email: string;
  };
  createdAt: string;
  sousTitres: {
    id: string;
    titre: string;
    videoUrl: string;
    description: string;
  }[];
}
function formatSecondsToMinSec(seconds: number): string {
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60);
  return `${min} min ${sec} s`;
}

export default function DettailCours({ coursCible }: { coursCible: string }) {
  const [cours, setCours] = useState<Cours | null>(null)
  const [loading, setLoading] = useState(true);
  const [durations, setDurations] = useState<Record<string, number>>({});

  useEffect(() => {
    fetch(`/api/cours/detaille/${coursCible}`)
      .then((res) => res.json())
      .then((data) => {
        setCours(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [coursCible]);

  const handleDuration = (id: string, seconds: number) => {
    setDurations((prev) => ({
      ...prev,
      [id]: seconds,
    }));
  };



  const totalSeconds = Object.values(durations).reduce((acc, curr) => acc + curr, 0);
  const totalDurationFormatted = formatSecondsToMinSec(totalSeconds);



  if (loading) return (
    <div className="flex w-ful h-screen justify-center items-center">
      <Loader className="animate-spin h-8 w-8 text-muted-foreground" />
    </div>
  )
  if (!cours) return <p>Erreur : cours introuvable</p>;


  return (
    <div className="lg:space-y-14 space-y-7">
      <div className="space-y-4">
        <div className="w-full flex gap-4 lg:gap-0 flex-col-reverse lg:flex-row justify-between">
          <div className="w-full lg:w-[60%] space-y-4">
            <h1 className="lg:text-6xl text-3xl font-bold">{cours.titre}</h1>
            <p className="text-gray-600 text-xl h-[90px] overflow-hidden line-clamp-3">{cours.description}</p>
            <div className="lg:flex flex flex-wrap gap-4">
              <p className="flex gap-2 items-center"><User size={16} />{cours.user.name}</p>
              <p className="flex gap-2 items-center"><IconBook size={16} /><span className="font-bold">45</span> Lectures </p>
              <p className="flex gap-2 items-center"> <IconDevicesDollar size={16} /><span className="font-bold">{cours.prix}</span> Ar seulement</p>
            </div>
          </div>
          <Image src={cours.imageUrl} alt={cours.titre} width={500} height={500} className="lg:w-80 w-full h-52 rounded-2xl object-cover" />
        </div>
        <div className="lg:flex-row flex flex-col gap-7 w-full lg:gap-5 items-center">
          <PaymentForm stylecl="group relative w-full lg:w-fit flex justify-center py-3 lg:px-16 border border-transparent text-lg font-medium rounded-lg text-white bg-indigo-400 hover:bg-indigo-600/80 shadow-2xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer disabled:opacity-50" cours={cours} />
          {/* <button
            className=
          ></button> */}
          <div className="flex gap-2">
            <div className="*:data-[slot=avatar]:ring-background flex -space-x-1.5 *:data-[slot=avatar]:ring-2">
              <Avatar className="w-6 h-6">
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <Avatar className="w-6 h-6">
                <AvatarImage src="https://github.com/leerob.png" alt="@leerob" />
                <AvatarFallback>LR</AvatarFallback>
              </Avatar>
              <Avatar className="w-6 h-6">
                <AvatarImage
                  src="https://github.com/evilrabbit.png"
                  alt="@evilrabbit"
                />
                <AvatarFallback>ER</AvatarFallback>
              </Avatar>
              <Avatar className="w-6 h-6">
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <Avatar className="w-6 h-6">
                <AvatarImage src="https://github.com/leerob.png" alt="@leerob" />
                <AvatarFallback>LR</AvatarFallback>
              </Avatar>
            </div>
            <p>19583 apprenants</p>
          </div>
        </div>
      </div>
      <div className="space-y-4 lg:flex-row flex flex-col">
        <div className="w-full lg:w-1/2">
          <Accordion type="single" className="w-full" collapsible>
            {cours.sousTitres.map((soutitre) => (
              <AccordionItem key={soutitre.id} value={soutitre.id} className="w-full">
                <AccordionTrigger><div className="flex gap-2 items-center"><IconCircleDashedCheck className="text-green-500" /> <p className="text-lg">{soutitre.titre}</p></div></AccordionTrigger>
                <AccordionContent>
                  <ReactPlayer
                    url={soutitre.videoUrl}
                    controls
                    width="100%"
                    height="192px"
                    className="w-full h-48 object-cover hidden rounded"
                    onDuration={(seconds) => handleDuration(soutitre.id, seconds)}
                  />
                  <p className="h-[80px] text-gray-600 overflow-hidden line-clamp-4">
                    {soutitre.description}
                  </p>
                  <div className="flex gap-3 items-center mt-2 text-sm text-gray-700">
                    <Image src={images.videonew} alt={soutitre.titre} width={500} height={500} className="w-6 h-6 object-cover" /> Durée : {formatSecondsToMinSec(durations[soutitre.id])}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        <div className="w-full flex justify-center items-center lg:w-1/2">
          <div className="bg-sidebar-accent p-10 flex justify-center items-center flex-col space-y-6 rounded-2xl sticky bottom-14 lg:-mr-14">
            <div className="flex w-fit text-5xl gap-1 qualyneue items-center">
              <p>falar</p>
              <Image
                src={images.LogoFalarohy}
                width={200}
                height={200}
                className="w-10 h-10"
                alt={"LogoFalarohy"} />
              <p>hy</p>
            </div>
            <div className="space-y-2">
              <div className="flex gap-2 items-center">
                <IconSettingsDown size={20} />
                <p className="flex gap-2 text-gray-600">Contenu à jour au
                  <span>
                    {new Date(cours.createdAt)
                      .toLocaleDateString("fr-FR", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })
                      .replace(/^(\d+)\s(\w+)\s(\d+)$/, (_, d, m, y) => {
                        const moisAvecMajuscule = m.charAt(0).toUpperCase() + m.slice(1);
                        return `${moisAvecMajuscule} ${d} ${y}`;
                      })}
                  </span>
                </p>
              </div>
              <div className="flex gap-2  items-center"><User size={20} /><p className="text-gray-600">{cours.user.email}</p></div>
              {totalSeconds > 0 && (
                <div className="flex gap-2 items-center">
                  <Timer size={20} />
                  <p className=" text-gray-600 ">
                    Durée totale : {totalDurationFormatted}
                  </p>
                </div>
              )}
            </div>


            <PaymentForm stylecl="group relative w-full lg:w-fit flex justify-center py-3 lg:px-16 border border-transparent text-lg font-medium rounded-lg  bg-white hover:bg-gray-400 shadow-2xl focus:outline-none  cursor-pointer dark:text-black disabled:opacity-50" cours={cours} />
          </div>
        </div>
      </div>
    </div>
  )
}
