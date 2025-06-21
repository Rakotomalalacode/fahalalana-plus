import { images } from "@/constants/images"
import { IconCertificate } from "@tabler/icons-react"
import { CalendarArrowDown } from "lucide-react"
import Image from "next/image"

const Categories = () => {
    return (
        <div className="font-outfit space-y-6">
            <div className="space-y-3 lg:px-9 px-4">
                <h1 className="lg:text-5xl text-3xl">Principales catégories</h1>
            </div>
            <hr />
            <div className="flex flex-wrap space-y-6 h-fit lg:space-x-3.5 px-4 justify-center lg:justify-start lg:px-[15px]">

                <div className="text-accent-foreground shadow w-full lg:w-80 border p-4  rounded space-y-4 hover:bg-primary-foreground">
                    <div className="flex gap-4">
                        <Image src={`${images.LangagePython}`} alt="formation" className="h-20 w-20 rounded-sm object-cover" width={100} height={100} />
                        <div className="flex flex-col gap-3">
                            <p className="text-xl text-black font-meduim">titre du cours</p>
                            <div className="flex flex-col text-sm text-gray-600">
                                <p className="flex gap-2 items-center"><CalendarArrowDown size={16} />12/06/2023</p>
                                <p className="flex gap-2 items-center"><IconCertificate size={16} />100 cours</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Categories