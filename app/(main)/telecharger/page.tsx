"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image";
import { images } from "@/constants/images"
export default function TelechargerPage() {
  const [os, setOs] = useState<string>("")

  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase()

    if (/android/.test(userAgent)) setOs("android")
    else if (/windows/.test(userAgent)) setOs("windows")
    else if (/mac/.test(userAgent)) setOs("mac")
    else if (/linux/.test(userAgent)) setOs("linux")
  }, [])

  const links = {
    android: "https://tonsite.com/download/app.apk",
    windows: "https://tonsite.com/download/app.exe",
    linux: "https://tonsite.com/download/app.deb",
    mac: "https://tonsite.com/download/app.dmg",
    ipĥone: "https://tonsite.com/download/app.dmg",
  }

  return (
    <div className="flex flex-col font-outfit items-center justify-center p-8">
      <h1 className="text-2xl flex font-bold gap-3 mb-4"><p>Téléchargement de l'application</p> <p className="qualyneue">falar<span className="text-orangeme">o</span>hy</p></h1>

      {os && (
        <Link
          href={links[os as keyof typeof links]}
          className="group relative w-full lg:w-fit flex justify-center py-3 lg:px-16 border border-transparent text-lg font-medium rounded-lg text-white bg-indigo-400 hover:bg-indigo-600/80 shadow-2xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer disabled:opacity-50"
          //className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow mt-4"
        >
          Télécharger pour {os.charAt(0).toUpperCase() + os.slice(1)}
        </Link>
      )}

      <p className="text-gray-500 mt-6">Ou choisissez manuellement :</p>

      <div className="flex flex-wrap space-x-16 mt-6 space-y-10">
        <Link href={links.android} className="text-blue-500 space-y-5 bg-sidebar-accent p-4 felx flex-col justify-center items-center text-center w-32 rounded underline">
            <p>Android</p>
            <Image src={images.applicationdescandroid} alt="formation" className="h-20 w-20 self-center object-cover" width={100} height={100} />
        </Link>
        <Link href={links.windows} className="text-blue-500 space-y-5 bg-sidebar-accent p-4 felx flex-col justify-center items-center text-center w-32 rounded underline">
        <p>Windows</p>
        <Image src={images.applicationdescwindows} alt="formation" className="h-20 w-20 rounded-sm object-cover" width={100} height={100} />
        </Link>
        <Link href={links.linux} className="text-blue-500 space-y-5 bg-sidebar-accent p-4 felx flex-col justify-center items-center text-center w-32 rounded underline">
        <p>Linux</p>
        <Image src={images.applicationdesclinux} alt="formation" className="h-20 w-20 rounded-sm object-cover" width={100} height={100} />
        </Link>
        <Link href={links.mac} className="text-blue-500 h-fit space-y-5 bg-sidebar-accent p-4 felx flex-col justify-center items-center text-center w-32 rounded underline">
        <p>macOS</p>
        <Image src={images.applicationdescpngegg} alt="formation" className="h-20 w-20 rounded-sm object-cover" width={100} height={100} />
        </Link>
        <Link href={links.ipĥone} className="text-blue-500 h-fit space-y-5 bg-sidebar-accent p-4 felx flex-col justify-center items-center text-center w-32 rounded underline">
        <p>Iphone</p>
        <Image src={images.applicationdescpngegg} alt="formation" className="h-20 w-20 rounded-sm object-cover" width={100} height={100} />
        </Link>
      </div>
    </div>
  )
}
