"use client"

import Link from "next/link"
import LogoFalarohy from "../logo"
import SearchBar from "../search/page"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { IconMenuDeep } from "@tabler/icons-react"
import { images } from "@/constants/images"
import Image from "next/image"
import Decouvrir from "../Decouvrir/Decouvrir"
import { useRouter } from "next/navigation"

const NavbarOne = () => {
    const route = useRouter()
    return (
        <div className="w-screen lg:backdrop-blur-sm px-4 lg:px-9 py-5 lg:bg-transparent bg-primary-foreground">
            <div className="w-full flex justify-between">
                <LogoFalarohy />
                <div className="w-[88%] hidden lg:flex justify-between  font-outfit">
                    <div className="mt-2">
                        <Decouvrir />
                    </div>
                    <div className="w-[50%]">
                        <SearchBar />
                    </div>
                    <div className="flex gap-12">
                        <Link href="/formation" className="mt-2 hover:underline hover:text-orangeme" >Formations</Link>
                        <Link href="/bibliotheque" className="mt-2 hover:underline hover:text-orangeme" >Biblioteque</Link>
                        <button 
                            onClick={() => route.push("/auth/signin")}
                           // className="group cursor-pointer relative w-full flex justify-center py-2 px-5 items-center border border-transparent text-sm font-medium rounded text-white bg-orangeme/90 hover:bg-orangeme h-9 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orangeme-500 "
                        className="group relative w-full flex justify-center h-9 items-center py-2 px-5 border border-transparent text-sm font-medium rounded text-white bg-orangeme/90 hover:bg-orangeme focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orangeme/80 disabled:opacity-50"
                        ><p>Se connecter </p></button>
                    </div>
                </div>
                <div className="lg:hidden flex items-center">
                    <SearchBar />
                    <Sheet>
                        <SheetTrigger><IconMenuDeep className="text-orangeme" size={40} /></SheetTrigger>
                        <SheetContent>
                            <SheetHeader>
                                <SheetTitle className="flex w-fit text-sm! gap-0.5 qualyneue items-center">

                                    <p>falar</p>
                                    <Image
                                        src={images.LogoFalarohy}
                                        width={200}
                                        height={200}
                                        className="w-3 h-3"
                                        alt={"LogoFalarohy"} />
                                    <p>hy</p>

                                </SheetTitle>
                            </SheetHeader>
                            <SheetDescription className="flex h-[50%] flex-col justify-center items-center gap-12">
                                <Link href="/formation" className="mt-2 hover:underline text-xl hover:text-orangeme text-black" >Formations</Link>
                                <Link href="/bibliotheque" className="mt-2 hover:underline text-xl hover:text-orangeme text-black" >Bibliothèque</Link>
                                <Link href="/auth/signin" className="mt-2 hover:underline text-xl hover:text-orangeme text-black" >Se connecter</Link>
                            </SheetDescription>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>

        </div>
    )
}

export default NavbarOne