"use client"

import TowCours from "@/components/autres/TowCours";
import StatistiquesGenerales from "@/components/autres/StatistiquesGenerales";
import CoursBuy from "@/components/coursBuy/coursBuy";
import Link from "next/link"
import AdhesionComp from "@/components/autres/AdhesionComp"
import { images } from "@/constants/images"
import { IconCalendarEventFilled, IconDeviceNintendoOff, IconError404, IconLoader } from "@tabler/icons-react"
import { useEffect, useState } from "react";
import Image from "next/image";
import { CalendarArrowDown, Loader2, Timer, User } from "lucide-react"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import TopCategories from "@/components/autres/TopCategories";
import PopulairesBusiness from "@/components/coursBuy/PopulairesBusiness";
import { useSidebar } from "@/components/context/SidebarContext";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import bcrypt from "bcryptjs"
import { toast } from "sonner";
import InstructorComp from "@/components/autres/InstructorComp";

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
    }[];
};

type Pointeur<T> = {
    value: T
}

export default function Home() {
    const [cours, setCours] = useState<Cours[]>([]);
    const [loading, setLoading] = useState(true);
    const { setCurrentMenu } = useSidebar()
    const { setSelectedCours } = useSidebar()
    const { data: session, status } = useSession()
    const route = useRouter()

    useEffect(() => {
        const fetchCours = async () => {
            const res = await fetch("/api/cours");
            const data = await res.json();
            const shuffled = data.sort(() => Math.random() - 0.5);
            setCours(shuffled);
            setLoading(false);
        };
        fetchCours();
    }, []);

    async function handleClick(coursCible: string) {
if (status !== "authenticated") {
                route.push('/auth/signin')
            }
        if (session?.user?.role) {
            const hashMotDePasse = await bcrypt.hash(session.user.role, 10)

            const role = session.user.role

            function modifierPointeur(p: Pointeur<string>, role: string) {
                if (role === "teacher") {
                    p.value = "t"
                } else if (role === "student") {
                    p.value = "s"
                } else if (role === "admin") {
                    p.value = "a"
                }
            }
            if (session.user.role === "student") {
                const p: Pointeur<string> = { value: "" }
                modifierPointeur(p, role)

                route.push(`/dashboard/${p.value}?${hashMotDePasse}${session.user.id}=${session.user.email}`)
                route.refresh()
                setSelectedCours(`${coursCible}`)
                setCurrentMenu("dettailcours")
            } else {
                toast(<div className="text-red-700 font-outfit text-sm flex gap-2 items-center"><IconDeviceNintendoOff />Cette fonctionnalité ne fait pas pour les {role}</div>)
            }
        }
    }

    if (loading) return <div className="h-screen flex justify-center items-center"><IconLoader className="animate-spin h-8 w-8 text-muted-foreground" /></div>
    return (
        <main className="flex flex-col gap-9 font-outfit">
            <div className="z-0 w-full m-auto">
                <TowCours />
            </div>
            <div><StatistiquesGenerales /></div>
            <div className="lg:px-9 px-4">
                <div className="block w-full lg:flex space-y-4 justify-between">
                    <div className="space-y-3">
                        <h1 className="text-5xl">Certification en ligne <span className="text-orangeme">Cours</span></h1>
                        <p className="text-gray-600 text-lg">Acquérez de nouvelles aptitudes grâce à nos formations récompensées.</p>
                    </div>
                    <Link href="/busines-cours" ><button className="bg-orangeme w-full lg:w-fit hover:underline h-fit rounded hover:bg-orangeme/90 text-white py-2 px-4 ">Tout voir</button></Link>
                </div>
                <div className="w-[95%] m-auto">
                    <Carousel className="w-full">
                        <CarouselContent className="lg:p-x4 p-x py-8  ">
                            {cours.map((cours, index) => (
                                <CarouselItem
                                    key={cours.id}
                                    onClick={() => handleClick(cours.id)}
                                    className="md:basis-1/2 relative cursor-pointer lg:basis-[335px]">
                                    <div  className="lg:w-80 w-[99%] space-y-4 p-4 bg-white hover:bg-primary-foreground shadow border rounded">
                                        <div className="flex justify-between">
                                            <Image src={cours.imageUrl} alt="formation" className="h-20 w-20 rounded-sm object-cover" width={100} height={100} />
                                            {index < 5 && (<p className="px-4 py-1 text-green-500 rounded bg-green-100 w-fit h-fit">Nouveau ✨</p>)}
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-xl font-bold h-[28px] overflow-hidden">{cours.titre}</p>
                                            <p className="text-gray-500  h-[142px] overflow-hidden line-clamp-6 ">{cours.description}...</p>
                                        </div>
                                        <div className="flex gap-5 text-sm">
                                            <p className="flex gap-2 items-center"><CalendarArrowDown size={16} />{new Date(cours.createdAt).toLocaleDateString("fr-FR")}</p>
                                            <p className="flex gap-2 items-center"><User size={16} />{cours.user.name.slice(0, 15) || "Inconnu"}</p>
                                        </div>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className="bg-orangeme rounded text-white border-none" />
                        <CarouselNext className="bg-orangeme rounded text-white border-none" />
                    </Carousel>
                </div>
            </div>
            <div className="w-[95%] m-auto mb-9">
                <AdhesionComp />
            </div>
            <div className="lg:px-9 px-4">
                <div className="block w-full lg:flex space-y-4 justify-between">
                    <div className="space-y-3">
                        <h1 className="text-5xl">Populaires <span className="text-orangeme">Cours</span></h1>
                        <p className="text-gray-600 text-lg">Acquérez de nouvelles aptitudes grâce à nos formations récompensées.</p>
                    </div>
                    <Link href="/busines-cours"><button className="bg-orangeme w-full lg:w-fit hover:underline h-fit rounded hover:bg-orangeme/90 text-white py-2 px-4 ">Tout voir</button></Link>
                </div>
                <div className="w-[95%] m-auto">
                    <PopulairesBusiness />
                </div>
            </div>
            <TopCategories />
            <div className="lg:px-9 px-4">
                <div className="block w-full lg:flex space-y-4 justify-between">
                    <div className="space-y-3">
                        <h1 className="text-5xl">Nos <span className="text-orangeme">Formations</span></h1>
                        <p className="text-gray-600 text-lg">Plongez dans nos meilleurs cours soigneusement sélectionnés pour maîtriser des compétences importantes et atteindre vos objectifs plus rapidement.</p>
                    </div>
                    <Link href="/busines-cours"><button className="bg-orangeme w-full lg:w-fit hover:underline h-fit rounded hover:bg-orangeme/90 text-white py-2 px-4 ">Tout voir</button></Link>
                </div>
                <div className="w-[95%] m-auto">
                    <CoursBuy />
                </div>
            </div>
            <div className="w-[95%] m-auto mb-9">
            <InstructorComp />
            </div>
        </main>
    );
}
