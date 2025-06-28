"use client"

import { images } from "@/constants/images"
import Image from "next/image"
import { useEffect, useState } from "react"

const ApprenezEff = ({background} : {background : string}) => {
      const [data, setData] = useState<{ totalTeachers: number; totalStudents: number } | null>(null)
      const [loading, setLoading] = useState(true)
    
      useEffect(() => {
        const fetchCounts = async () => {
          try {
            const res = await fetch("/api/users/count")
            const json = await res.json()
            setData(json)
          } catch (error) {
            console.error("Erreur de chargement :", error)
          } finally {
            setLoading(false)
          }
        }
    
        fetchCounts()
      }, [])
    
      if (loading) return <div className="w-full h-52 bg-gray-200 dark:bg-sidebar-accent  rounded-lg animate-pulse"></div>
      if (!data) return <div className="w-full h-52 bg-gray-200 dark:bg-sidebar-accent rounded-lg animate-pulse"></div>
    
    return (
        <div>
            <div className={`w-full h-52 flex justify-between pr-4 rounded-lg  shadow-md ${background ? background : "bg-green-700"}`}>
                <div className="p-4 flex flex-col justify-between">
                    <div className="space-y-2">
                        <h1 className="text-white text-xl lg:text-3xl">Apprenez efficacement avec nous !</h1>
                        <p className="text-gray-200">Bienvenue sur <span className="qualyneue">falarohy</span></p>
                    </div>
                    <div className="flex gap-6 lg:gap-16">
                        <div className="flex  items-center gap-3 text-white">
                            {/* <div className="max-w-16 min-w-16 flex flex-col items-center text-white justify-center h-16 bg-[url(/images/students-with.jpg)] bg-cover bg-center bg-no-repeat rounded-full">
                            </div> */}
                            <p className="text-5xl">👨‍🎓</p>
                            <div>
                                <p className="lg:text-xl ">Étudiants</p>
                                <p className="text-md text-gray-200">{data.totalStudents} +</p>
                            </div>
                        </div>
                        <div className="flex  items-center gap-3 text-white">
                           {/* <div className="max-w-16 min-w-16 flex flex-col items-center text-white justify-center h-16 bg-[url(/images/education-students-.jpg)] bg-cover bg-center bg-no-repeat rounded-full">
                            </div> */}
                            <p className="text-5xl">👩‍🏫 </p>
                            <div>
                                <p className="lg:text-xl ">Enseignants</p>
                                <p className="text-md text-gray-200">{data.totalTeachers} +</p>
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