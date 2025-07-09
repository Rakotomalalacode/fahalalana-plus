"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { IconChevronsRight } from "@tabler/icons-react";
import { useSidebar } from "../context/SidebarContext";
import { gifs } from "@/constants/gif";
import { Icons } from "@/constants/icons";
import { User ,Loader } from "lucide-react";

type CoursAvecProgression = {
  coursId: string;
  titre: string;
  imageUrl: string;
  enseignant: string;
  progress: number;
};

type Cours = {
  id: string;
  titre: string;
  description: string;
  imageUrl: string;
  user: {
    name: string;
    email: string;
  };
};


type Achat = {
  id: string;
  cours: Cours;
};

export default function CoursPage() {
  // const [mesCours, setMesCours] = useState<Achat[]>([]);
  const [loading, setLoading] = useState(true);
  const { setCurrentMenu } = useSidebar()
  const { setSelectedCours } = useSidebar()
  const [mesCours, setMesCours] = useState<CoursAvecProgression[]>([]);

  useEffect(() => {
    const fetchMesCours = async () => {
      try {
        const res = await fetch("/api/progression/global");
        const data = await res.json();
        setMesCours(data);
      } catch (err) {
        console.error("Erreur lors du chargement des cours :", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMesCours();
  }, []);

  useEffect(() => {
    const fetchMesCours = async () => {
      try {
        const res = await fetch("/api/payerment");
        const data = await res.json();
        setMesCours(data);
      } catch (err) {
        console.error("Erreur lors du chargement des cours :", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMesCours();
  }, []);

  const handleClick = (coursCible: string) => {
    setSelectedCours(`${coursCible}`) // id du cours sélectionné
    setCurrentMenu("cours")
  }

  if (loading) return (
      <div className="flex w-ful h-screen justify-center items-center">
            <Loader className="animate-spin h-8 w-8 text-muted-foreground" />
        </div>
  );

  if (mesCours.length === 0)
    return <p className="text-gray-500">Vous n'avez encore acheté aucun cours.</p>;

  return (
    <div className="flex flex-wrap space-y-6 h-fit lg:space-x-3.5  justify-center lg:justify-start lg:px-0 ">
      {mesCours.map((cours) => (
        <div
          key={cours.coursId}
          onClick={() => handleClick(cours.coursId)}
          className="group transition-all relative cursor-pointer w-full  h-fit lg:w-[307.7px] border p-4 items-start rounded hover:bg-primary-foreground"
        >
          <div className="flex w-full gap-4">
            {/* <Image
      src={cours.imageUrl}
      alt={"cours"}
      width={100}
      height={100}
      className="w-16 h-16 object-cover rounded"
    /> */}
            {cours.imageUrl && cours.imageUrl !== "" && (
              <Image
                src={cours.imageUrl}
                alt="cours"
                width={100}
                height={100}
                className="w-16 h-16 object-cover rounded"
              />
            )}

            <div className="flex-1 z-50">
              {cours?.titre ? (
                <h2 className="text-lg font-semibold">{cours.titre.slice(0, 18)}...</h2>
              ) : (
                <h2 className="text-lg font-semibold">Titre indisponible</h2>
              )}
              <p className="text-gray-500 flex gap-2 items-center text-sm mt-1">
                <User size={16} /> {cours.enseignant}
              </p>
            </div>
          </div>
          <div className="w-full flex items-center justify-between mt-3">
            {cours.progress == 100 ? <Image src={gifs.celebration} alt="progress" width={500} height={500} className="w-6 h-6 -ml-2 -mt-1" /> : <Image src={gifs.run} alt="progress" width={500} height={500} className="w-6 h-6 -ml-2" />}
            <div className="w-[80%] text-sm">
              <div className="h-2 w-full bg-gray-300 rounded overflow-hidden">
                <div
                  className="h-full w-full bg-green-500 transition-all"
                  style={{ width: `${cours.progress}%` }}
                ></div>
              </div>
            </div>
            <span className="font-bold text-green-600 ml-2">{cours.progress}%</span>
          </div>
          {cours.progress == 100 ? <Image src={Icons.certyf} alt="progress" width={500} height={500} className="w-24 -ml-2 absolute top-1 z-0 right-4 opacity-75" /> : null}
          <span className="inline-block absolute top-3 right-4 text-orangeme transform group-hover:translate-x-1 transition-transform duration-300">
            <IconChevronsRight />
          </span>
        </div>
      ))}

    </div>
  );
}


// "use client";

// import { useEffect, useState } from "react";
// import Image from "next/image";
// import { IconChevronsRight } from "@tabler/icons-react";
// import { useSidebar } from "../context/SidebarContext";

// type Cours = {
//   id: string;
//   titre: string;
//   description: string;
//   imageUrl: string;
//   user: {
//     name: string;
//     email: string;
//   };
// };


// type Achat = {
//   id: string;
//   cours: Cours;
// };

// export default function CoursPage() {
//   const [mesCours, setMesCours] = useState<Achat[]>([]);
//   const [loading, setLoading] = useState(true);
//   const { setCurrentMenu } = useSidebar()
//       const { setSelectedCours } = useSidebar()

//   useEffect(() => {
//     const fetchMesCours = async () => {
//       try {
//         const res = await fetch("/api/payerment");
//         const data = await res.json();
//         setMesCours(data);
//       } catch (err) {
//         console.error("Erreur lors du chargement des cours :", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMesCours();
//   }, []);

//       const handleClick = (coursCible: string) => {
//         setSelectedCours(`${coursCible}`) // id du cours sélectionné
//         setCurrentMenu("cours")
//     }

//   if (loading) return <p>Chargement...</p>;

//   if (mesCours.length === 0)
//     return <p className="text-gray-500">Vous n'avez encore acheté aucun cours.</p>;

//   return (
//     <div className="flex flex-wrap space-y-6 h-fit lg:space-x-3.5 px-4 justify-center lg:justify-start lg:px-0 ">
//       {mesCours.map((achat) => (
//         <div
//           key={achat.id}
//            onClick={() => handleClick(achat.cours.id)}
//           className="text-accent-foreground group transition-all cursor-pointer flex  lg:w-[307.7px] gap-4 border p-4 items-start rounded hover:bg-primary-foreground"
//         >
//           <Image
//             src={achat.cours.imageUrl}
//             alt={achat.cours.titre}
//             width={100} height={100}
//             className="w-16 h-16 object-cover rounded"
//           />
//           <div>
//             <h2 className="text-lg font-semibold">{achat.cours.titre.slice(0, 12)}</h2>
//             <p className=" text-gray-500 mt-3.5">
//               Enseignant : {achat.cours.user.name}
//             </p>
//           </div>
//           <span className="inline-block text-orangeme transform group-hover:translate-x-1 transition-transform duration-300">
//             <IconChevronsRight />
//           </span>
//         </div>
//       ))}
//     </div>
//   );
// }