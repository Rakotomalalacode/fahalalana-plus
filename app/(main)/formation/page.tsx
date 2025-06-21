import { images } from "@/constants/images"
import { IconCalendarEventFilled } from "@tabler/icons-react"
import { CalendarArrowDown, Timer } from "lucide-react"
import Image from "next/image"
import CoursBuy from "../../../components/coursBuy/coursBuy";
import Link from "next/link";

const Formation = () => {
    return (
        <div className="font-outfit space-y-6">
            <div className="space-y-3 lg:px-9 px-4">
                <h1 className="text-5xl">Formations</h1>
                <p className="text-gray-600 text-lg">Acquérez de nouvelles aptitudes grâce à nos formations récompensées.</p>
            </div>
            <hr />
            <div className="flex flex-wrap space-y-6 h-fit lg:space-x-3.5 px-4 justify-center lg:justify-start lg:px-[15px]">
                <div className="text-accent-foreground shadow lg:w-80 border p-4  rounded space-y-4 hover:bg-primary-foreground">
                    <div className="flex justify-between">
                        <Image src={`${images.LangagePython}`} alt="formation" className="h-20 w-20 rounded-sm object-cover" width={100} height={100} />
                        <p className="px-4 py-1 text-black rounded bg-accent w-fit h-fit">status</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-xl font-bold">Titre du cours</p>
                        <p className="text-gray-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias accusamus ipsum enim eos earum! Libero inventore illum optio, ullam explicabo velit dicta</p>
                    </div>
                    <div className="flex gap-5 text-sm">
                        <p className="flex gap-2 items-center"><CalendarArrowDown size={16} />12/06/2023</p>
                        <p className="flex gap-2 items-center"><Timer size={16} />100 heures</p>
                    </div>
                </div>
            </div>
            <div className="lg:px-9 px-4">
                <div className="block w-full lg:flex space-y-4 justify-between">
                    <div className="space-y-3">
                        <h1 className="text-5xl">Populaires <span className="text-orangeme">Formations</span></h1>
                        <p className="text-gray-600 text-lg">Acquérez de nouvelles aptitudes grâce à nos formations récompensées.</p>
                    </div>
                    <button className="bg-orangeme w-full lg:w-fit hover:underline h-fit rounded hover:bg-orangeme/90 text-white py-2 px-4 ">Tout voir</button>
                </div>
                <div className="w-[95%] m-auto">
                    <CoursBuy />
                </div>
            </div>
        </div>
    )
}

export default Formation