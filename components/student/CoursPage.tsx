"use client";

import { useEffect, useRef, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { IconChecks } from "@tabler/icons-react";
import ReactPlayer from "react-player";
import Image from "next/image";
import { images } from "@/constants/images";
import { gifs } from "@/constants/gif";
import { Icons } from "@/constants/icons";
import { Calendar } from "@/components/ui/calendar"

type SousTitre = {
  id: string;
  titre: string;
  videoUrl: string;
  description: string;
};

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
  sousTitres: SousTitre[];
};

function formatSecondsToMinSec(seconds: number): string {
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60);
  return `${min} min ${sec} s`;
}

export default function CoursPage({ coursCible }: { coursCible: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [cours, setCours] = useState<Cours | null>(null);
  const [currentVideo, setCurrentVideo] = useState<SousTitre | null>(null);
  const [completed, setCompleted] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [durations, setDurations] = useState<Record<string, number>>({});
const [highlightedDates, setHighlightedDates] = useState<Date[]>([]);

const handleVideoEnd = async () => {
  if (currentVideo && !completed.includes(currentVideo.id)) {
    setCompleted((prev) => [...prev, currentVideo.id]);

    const today = new Date();

    setHighlightedDates((prev) => [...prev, today]);

    try {
      await fetch("/api/progression", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          coursId: cours?.id,
          videoId: currentVideo.id,
          date: today,
        }),
      });
    } catch (error) {
      console.error("Erreur progression :", error);
    }
  }
};


 useEffect(() => {
  const fetchCours = async () => {
    try {
      const res = await fetch(`/api/cours/detaille/${coursCible}`);
      const data: Cours = await res.json();
      setCours(data);
      if (data.sousTitres.length > 0) {
        setCurrentVideo(data.sousTitres[0]);
      }

      // Récupère la progression de l'utilisateur
      const resProgression = await fetch(`/api/progression?coursId=${coursCible}`);
      const progressionData = await resProgression.json();

      const ids: string[] = progressionData.map((item: any) => item.videoId);
      const dates: Date[] = progressionData.map((item: any) => new Date(item.date));

      setCompleted(ids);
      setHighlightedDates(dates); // utilisé pour le calendrier

      setLoading(false);
    } catch (err: any) {
      setError(err.message || "Une erreur est survenue");
      setLoading(false);
    }
  };

  fetchCours();
}, [coursCible]);


  const changeVideo = (video: SousTitre) => {
    setCurrentVideo(video);
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.load();
        videoRef.current.play();
      }
    }, 100);
  };

  const progress = cours?.sousTitres.length
    ? Math.round((completed.length / cours.sousTitres.length) * 100)
    : 0;

  const handleDuration = (id: string, seconds: number) => {
    setDurations((prev) => ({
      ...prev,
      [id]: seconds,
    }));
  };

  const totalSeconds = Object.values(durations).reduce((acc, curr) => acc + curr, 0);
  const totalDurationFormatted = formatSecondsToMinSec(totalSeconds);


  if (loading) return <p className="text-center mt-10">Chargement...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;
  if (!cours) return <p>Aucun cours trouvé.</p>;

  return (
    <div className="flex flex-col w-full  mx-auto p-4 lg:p-0 gap-6">
      
      <div className="flex flex-col lg:flex-row gap-6 mt-2">
        
        <div className="flex-1">
          {currentVideo ? (
            <div className="space-y-5">
              <video
                ref={videoRef}
                onEnded={handleVideoEnd}
                controls
                controlsList="nodownload"
                className="w-full rounded-lg shadow-md"
              >
                <source src={currentVideo.videoUrl} type="video/mp4" />
              </video>
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-lg">{currentVideo.titre}</AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    {currentVideo.description}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          ) : (
            <p>Pas de vidéo disponible.</p>
          )}
          <div className="w-full relative lg:flex justify-between">
            <div className="space-y-3 w-full lg:w-[57%] p-7 bg-accent rounded-lg">
              <h1 className="text-2xl font-medium">Progression</h1>
              <p className="text-gray-700 text-sm">Terminez votre formation à 100% afin d'obtenir votre certification de fin de formation <span className="qualyneue text-orangeme">falorohy</span>.</p>
              <div className=" text-sm font-medium text-blue-600">
                Vous êtes actuellement à {progress}% de réussite.
              </div>
              <div className="flex items-center">
                { progress == 100 ? <Image src={gifs.celebration} alt="progress" width={500} height={500} className="w-6 h-6 -ml-2 -mt-1" />  : <Image src={gifs.run} alt="progress" width={500} height={500} className="w-6 h-6 -ml-2" /> }
                <div className="w-full h-3 bg-white rounded-sm overflow-hidden">
                  <div
                    className="h-full bg-green-500 transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <Image src={Icons.certificate} alt="progress" width={500} height={500} className="w-7 h-7 ml-1.5" />
              </div>
{ progress == 100 ?<Image src={Icons.certyf} alt="progress" width={500} height={500} className="w-24 -ml-2 absolute top-4 z-0 right-4 opacity-75" />: null}
              <div className="w-full flex justify-center mt-7">
                <div className="flex  w-fit text-5xl gap-1 qualyneue items-center">
                  <p>falar</p>
                  <Image
                    src={images.LogoFalarohy}
                    width={200}
                    height={200}
                    className="w-10 h-10"
                    alt={"LogoFalarohy"} />
                  <p>hy</p>
                </div>
              </div>
            </div>
            <div>

              <Calendar
  mode="single"
  selected={date}
  onSelect={setDate}
  className="rounded-lg border w-full lg:w-auto mt-4 lg:mt-0"
  modifiers={{
    red: highlightedDates,
  }}
  modifiersClassNames={{
    red: "bg-orangeme rounded-lg text-white", // style personnalisé
  }}
/>

            </div>
          </div>
        </div>

       
        <div className="w-full lg:w-[350px] bg-gray-100 dark:bg-sidebar p-4 rounded-lg overflow-y-auto max-h-full">
          <h2 className="text-xl font-semibold mb-4">
            {cours.titre.slice(0, 30)}
          </h2>
          {cours.sousTitres.map((video) => (
            <div
              key={video.id}
              onClick={() => changeVideo(video)}
              className={`p-3 mb-2 rounded cursor-pointer border ${currentVideo?.id === video.id
                ? "bg-blue-100 dark:bg-accent border-blue-500"
                : "hover:bg-gray-200"
                }`}
            >
              <div className="flex justify-between items-center">
                <Accordion type="single" collapsible>
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="font-medium flex justify-between w-full py-0 ">
                      <div className="lg:not-first:flex hidden gap-2">
                        {completed.includes(video.id) ? <IconChecks className="text-green-500" /> : ""}
                        {video.titre}
                      </div>
                      <div className="flex lg:hidden gap-2">
                        {completed.includes(video.id) ? <IconChecks className="text-green-500" /> : ""}
                        {video.titre}..
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="flex gap-3 items-center mt-4 text-sm text-gray-700">
                      <Image src={images.videonew} alt={video.titre} width={500} height={500} className="w-6 h-6 object-cover" />
                      Durée : {formatSecondsToMinSec(durations[video.id])}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                <ReactPlayer
                  url={video.videoUrl}
                  controlsList="nodownload"
                  controls
                  width="100%"
                  height="192px"
                  className="w-full h-48 object-cover hidden rounded"
                  onDuration={(seconds) => handleDuration(video.id, seconds)}
                />
              </div>
              
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}





// "use client";

// import { useEffect, useRef, useState } from "react";
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion"
// import { IconChecks } from "@tabler/icons-react";
// import ReactPlayer from "react-player";
// import Image from "next/image";
// import { images } from "@/constants/images";
// import { gifs } from "@/constants/gif";
// import { Icons } from "@/constants/icons";
// import { Calendar } from "@/components/ui/calendar"

// type SousTitre = {
//   id: string;
//   titre: string;
//   videoUrl: string;
//   description: string;
// };

// type Cours = {
//   id: string;
//   titre: string;
//   description: string;
//   imageUrl: string;
//   publicId: string;
//   prix: number;
//   categorie: string;
//   user: {
//     name: string;
//     email: string;
//   };
//   createdAt: string;
//   sousTitres: SousTitre[];
// };

// function formatSecondsToMinSec(seconds: number): string {
//   const min = Math.floor(seconds / 60);
//   const sec = Math.floor(seconds % 60);
//   return `${min} min ${sec} s`;
// }

// export default function CoursPage({ coursCible }: { coursCible: string }) {
//   const videoRef = useRef<HTMLVideoElement>(null);
//   const [date, setDate] = useState<Date | undefined>(new Date())
//   const [cours, setCours] = useState<Cours | null>(null);
//   const [currentVideo, setCurrentVideo] = useState<SousTitre | null>(null);
//   const [completed, setCompleted] = useState<string[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [durations, setDurations] = useState<Record<string, number>>({});

//   useEffect(() => {
//     const fetchCours = async () => {
//       try {
//         const res = await fetch(`/api/cours/detaille/${coursCible}`);
//         if (!res.ok) throw new Error("Erreur lors du chargement du cours");

//         const data: Cours = await res.json();
//         setCours(data);
//         if (data.sousTitres.length > 0) {
//           setCurrentVideo(data.sousTitres[0]);
//         }
//         setLoading(false);
//       } catch (err: any) {
//         setError(err.message || "Une erreur est survenue");
//         setLoading(false);
//       }
//     };

//     fetchCours();
//   }, [coursCible]);

//   const changeVideo = (video: SousTitre) => {
//     setCurrentVideo(video);
//     setTimeout(() => {
//       if (videoRef.current) {
//         videoRef.current.load();
//         videoRef.current.play();
//       }
//     }, 100);
//   };

//   const handleVideoEnd = () => {
//     if (currentVideo && !completed.includes(currentVideo.id)) {
//       setCompleted((prev) => [...prev, currentVideo.id]);
//     }
//   };

//   const progress = cours?.sousTitres.length
//     ? Math.round((completed.length / cours.sousTitres.length) * 100)
//     : 0;

//   const handleDuration = (id: string, seconds: number) => {
//     setDurations((prev) => ({
//       ...prev,
//       [id]: seconds,
//     }));
//   };

//   const totalSeconds = Object.values(durations).reduce((acc, curr) => acc + curr, 0);
//   const totalDurationFormatted = formatSecondsToMinSec(totalSeconds);


//   if (loading) return <p className="text-center mt-10">Chargement...</p>;
//   if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;
//   if (!cours) return <p>Aucun cours trouvé.</p>;

//   return (
//     <div className="flex flex-col w-full  mx-auto p-4 lg:p-0 gap-6">
      
//       <div className="flex flex-col lg:flex-row gap-6 mt-2">
        
//         <div className="flex-1">
//           {currentVideo ? (
//             <div className="space-y-5">
//               <video
//                 ref={videoRef}
//                 onEnded={handleVideoEnd}
//                 controls
//                 className="w-full rounded-lg shadow-md"
//               >
//                 <source src={currentVideo.videoUrl} type="video/mp4" />
//               </video>
//               <Accordion type="single" collapsible>
//                 <AccordionItem value="item-1">
//                   <AccordionTrigger className="text-lg">{currentVideo.titre}</AccordionTrigger>
//                   <AccordionContent className="text-gray-600">
//                     {currentVideo.description}
//                   </AccordionContent>
//                 </AccordionItem>
//               </Accordion>
//             </div>
//           ) : (
//             <p>Pas de vidéo disponible.</p>
//           )}
//           <div className="w-full relative lg:flex justify-between">
//             <div className="space-y-3 w-full lg:w-[57%] p-7 bg-accent rounded-lg">
//               <h1 className="text-2xl font-medium">Progression</h1>
//               <p className="text-gray-700 text-sm">Terminez votre formation à 100% afin d'obtenir votre certification de fin de formation <span className="qualyneue text-orangeme">falorohy</span>.</p>
//               <div className=" text-sm font-medium text-blue-600">
//                 Vous êtes actuellement à {progress}% de réussite.
//               </div>
//               <div className="flex items-center">
//                 <Image src={gifs.run} alt="progress" width={500} height={500} className="w-6 h-6" />
//                 <div className="w-full h-3 bg-white rounded-sm overflow-hidden">
//                   <div
//                     className="h-full bg-green-500 transition-all duration-300"
//                     style={{ width: `${progress}%` }}
//                   />
//                 </div>
//                 <Image src={Icons.certificate} alt="progress" width={500} height={500} className="w-7 h-7 ml-1.5" />
//               </div>
//               <div className="w-full flex justify-center mt-7">
//                 <div className="flex  w-fit text-5xl gap-1 qualyneue items-center">
//                   <p>falar</p>
//                   <Image
//                     src={images.LogoFalarohy}
//                     width={200}
//                     height={200}
//                     className="w-10 h-10"
//                     alt={"LogoFalarohy"} />
//                   <p>hy</p>
//                 </div>
//               </div>
//             </div>
//             <div>

//               <Calendar
//                 mode="single"
//                 selected={date}
//                 onSelect={setDate}
//                 className="rounded-lg border mt-4 lg:mt-0"
//               />
//             </div>
//           </div>
//         </div>

       
//         <div className="w-full lg:w-[350px] bg-gray-100 p-4 rounded-lg overflow-y-auto max-h-full">
//           <h2 className="text-xl font-semibold mb-4">
//             {cours.titre.slice(0, 30)}
//           </h2>
//           {cours.sousTitres.map((video) => (
//             <div
//               key={video.id}
//               onClick={() => changeVideo(video)}
//               className={`p-3 mb-2 rounded cursor-pointer border ${currentVideo?.id === video.id
//                 ? "bg-blue-100 border-blue-500"
//                 : "hover:bg-gray-200"
//                 }`}
//             >
//               <div className="flex justify-between items-center">
//                 <Accordion type="single" collapsible>
//                   <AccordionItem value="item-1">
//                     <AccordionTrigger className="font-medium flex justify-between w-full py-0 ">
//                       <div className="flex gap-2">
//                         {completed.includes(video.id) ? <IconChecks className="text-green-500" /> : ""}
//                         {video.titre}
//                       </div>
//                     </AccordionTrigger>
//                     <AccordionContent className="flex gap-3 items-center mt-4 text-sm text-gray-700">
//                       <Image src={images.videonew} alt={video.titre} width={500} height={500} className="w-6 h-6 object-cover" />
//                       Durée : {formatSecondsToMinSec(durations[video.id])}
//                     </AccordionContent>
//                   </AccordionItem>
//                 </Accordion>
//                 <ReactPlayer
//                   url={video.videoUrl}
//                   controls
//                   width="100%"
//                   height="192px"
//                   className="w-full h-48 object-cover hidden rounded"
//                   onDuration={(seconds) => handleDuration(video.id, seconds)}
//                 />
//               </div>
              
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

