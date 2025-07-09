"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { CalendarArrowDown, Loader, Timer } from "lucide-react"
import { useSidebar } from "../context/SidebarContext";


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



export default function FormationsPage() {
    const [cours, setCours] = useState<Cours[]>([]);
    const [loading, setLoading] = useState(true);
    const { setCurrentMenu } = useSidebar()
    const { setSelectedCours } = useSidebar()

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

    const handleClick = (coursCible: string) => {
        setSelectedCours(`${coursCible}`) // id du cours sélectionné
        setCurrentMenu("dettailcours")
    }

    if (loading) return (
        <div className="flex w-ful h-screen justify-center items-center">
            <Loader className="animate-spin h-8 w-8 text-muted-foreground" />
        </div>
    )

    return (
        <div className="font-outfit space-y-6">
            <div className="space-y-3">
                <h1 className="text-5xl font-medium">Formations</h1>
                <p className="text-gray-600 text-lg">Acquérez de nouvelles aptitudes grâce à nos formations récompensées.</p>
            </div>
            <hr />
            <div className="flex flex-wrap space-y-6 h-fit lg:space-x-3.5 px-4 justify-center lg:justify-start lg:px-0 ">
                {cours.map((cours, index) => (
                    <div
                        key={cours.id}
                        onClick={() => handleClick(cours.id)}
                        className="text-accent-foreground cursor-pointer shadow lg:w-[307.7px] justify-between border p-4  rounded space-y-4 hover:bg-primary-foreground">
                        <div className="flex justify-between">
                            <Image src={cours.imageUrl} alt="formation" className="h-20 w-20 rounded-sm object-cover" width={100} height={100} />
                            {index < 5 && (<p className="px-4 py-1 text-green-500 rounded bg-green-100 w-fit h-fit">Nouveau ✨</p>)}
                        </div>
                        <div className="space-y-1">
                            <p className="text-xl font-bold">{cours.titre}</p>
                            <p className="text-gray-500  h-[142px] overflow-hidden line-clamp-6 ">{cours.description}...</p>
                        </div>
                        <div className="flex gap-5 text-sm">
                            <p className="flex gap-2 items-center"><CalendarArrowDown size={16} />{new Date(cours.createdAt).toLocaleDateString("fr-FR")}</p>
                            <p className="flex gap-2 items-center"><Timer size={16} />100 heures</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}


// import Image from "next/image"
// import { images } from "@/constants/images"
// import { IconCalendarEventFilled } from "@tabler/icons-react"
// import { CalendarArrowDown, Timer } from "lucide-react"

// const FormationsPage = () => {
//     return (
//         <div className="font-outfit space-y-6">
//             <div className="space-y-3 lg:px-9 px-4">
//                 <h1 className="text-5xl">Formations</h1>
//                 <p className="text-gray-600 text-lg">Acquérez de nouvelles aptitudes grâce à nos formations récompensées.</p>
//             </div>
//             <hr />
//             <div className="flex flex-wrap space-y-6 h-fit lg:space-x-3.5 px-4 justify-center lg:justify-start lg:px-[15px]">
// {cours.map((cours) => (               
//  <div
// key={cours.id}
//  className="text-accent-foreground shadow lg:w-80 border p-4  rounded space-y-4 hover:bg-primary-foreground">
//                     <div className="flex justify-between">
//                         <Image src={`${images.LangagePython}`} alt="formation" className="h-20 w-20 rounded-sm object-cover" width={100} height={100} />
//                         <p className="px-4 py-1 text-black rounded bg-accent w-fit h-fit">status</p>
//                     </div>
//                     <div className="space-y-1">
//                         <p className="text-xl font-bold">Titre du cours</p>
//                         <p className="text-gray-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias accusamus ipsum enim eos earum! Libero inventore illum optio, ullam explicabo velit dicta</p>
//                     </div>
//                     <div className="flex gap-5 text-sm">
//                         <p className="flex gap-2 items-center"><CalendarArrowDown size={16} />12/06/2023</p>
//                         <p className="flex gap-2 items-center"><Timer size={16} />100 heures</p>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default FormationsPage