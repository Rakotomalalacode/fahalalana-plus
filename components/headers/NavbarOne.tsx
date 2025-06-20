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

const NavbarOne = () => {
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
                        <Link href="/formation" className="mt-2 hover:underline" >Formations</Link>
                        <Link href="/bibliotheque" className="mt-2 hover:underline" >Biblioteque</Link>
                        <Link href="/auth/signin"
                            className="bg-orangeme/90 hover:bg-orangeme rounded text-white px-6 h-9 flex flex-col justify-center items-centre"
                        ><p>Se connecter </p></Link>
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
                                <Link href="/formation" className="mt-2 hover:underline text-xl text-black" >Formations</Link>
                                <Link href="/bibliotheque" className="mt-2 hover:underline text-xl text-black" >Bibliothèque</Link>
                                <Link href="/auth/signin" className="mt-2 hover:underline text-xl text-black" >Se connecter</Link>
                            </SheetDescription>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
            
        </div>
    )
}

export default NavbarOne