import TowCours from "@/components/autres/TowCours";
import CoursBuy from "@/components/coursBuy/coursBuy";
import Link from "next/link"

export default function Home() {
  return (
    <main className="flex flex-col gap-9 font-outfit">
      <div className="z-0 w-full m-auto">
        <TowCours />
      </div>
      <div className="lg:px-9 px-4">
        <div className="block w-full lg:flex space-y-4 justify-between">
          <div className="space-y-3">
            <h1 className="text-5xl">Populaires <span className="text-orangeme">Cours</span></h1>
            <p className="text-gray-600 text-lg">Acquérez de nouvelles aptitudes grâce à nos formations récompensées.</p>
          </div>
          <Link href="/busines-cours" className="bg-orangeme w-full lg:w-fit hover:underline h-fit rounded hover:bg-orangeme/90 text-white py-2 px-4 ">Tout voir</Link>
        </div>
        <div className="w-[95%] m-auto">
          <CoursBuy />
        </div>
      </div>
    </main>
  );
}
