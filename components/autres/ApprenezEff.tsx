
import { images } from "@/constants/images"
import Image from "next/image"

const ApprenezEff = () => {
    return (
        <div>
            <div className="w-full h-52 flex justify-between pr-4 rounded-lg bg-green-700 shadow">
                <div className="p-4 flex flex-col justify-between">
                    <div className="space-y-2">
                        <h1 className="text-white text-xl lg:text-3xl">Apprenez efficacement avec nous !</h1>
                        <p className="text-gray-200">Bienvenue sur <span className="outfit">Falarohy</span></p>
                    </div>
                    <div className="flex gap-6 lg:gap-16">
                        <div className="flex  items-center gap-3 text-white">
                            <div className="max-w-16 min-w-16 flex flex-col items-center text-white justify-center h-16 bg-[url(/images/students-with.jpg)] bg-cover bg-center bg-no-repeat rounded-full">
                            </div>
                            <div>
                                <p className="lg:text-2xl ">Étudiants</p>
                                <p className="text-md text-gray-200">5000 +</p>
                            </div>
                        </div>
                        <div className="flex  items-center gap-3 text-white">
                           <div className="max-w-16 min-w-16 flex flex-col items-center text-white justify-center h-16 bg-[url(/images/education-students-.jpg)] bg-cover bg-center bg-no-repeat rounded-full">
                            </div>
                            <div>
                                <p className="lg:text-2xl ">Professeurs</p>
                                <p className="text-md text-gray-200">3000 +</p>
                            </div>
                        </div>
                    </div>
                </div>
                <Image
                    src={images.portraitteacher}
                    alt={"teacher-preview"}
                    width={500}
                    height={500}
                    className="w-auto hidden lg:block" />
            </div>
        </div>
    )
}

export default ApprenezEff