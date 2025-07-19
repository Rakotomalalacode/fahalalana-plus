"use client"

import Link from "next/link"
import LogoFalarohy from "../logo"
import SearchBar from "../search/page"
import { SignOutButton } from "@/components/sign-out-button"
import { IconDashboard, IconLogout, IconUsers } from "@tabler/icons-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Image from "next/image"
import Decouvrir from "../Decouvrir/Decouvrir"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { Icons } from "@/constants/icons"
import bcrypt from "bcryptjs"

type Pointeur<T> = {
    value: T
}

const NavbarOne = () => {
    const route = useRouter()
    const {data:session , status} = useSession()

         async function continuerDash() {
            
            if (session?.user?.role) {
                const hashMotDePasse = await bcrypt.hash(session.user.role, 10)
    
                const role = session.user.role
    
                function modifierPointeur(p: Pointeur<string>, role: string) {
                    if (role === "teacher") {
                        p.value = "t"
                    } else if (role === "student") {
                        p.value = "s"
                    } else if (role === "admin") {
                        p.value = "a"
                    }
                }
    
                const p: Pointeur<string> = { value: "" }
                modifierPointeur(p, role)
    
                route.push(`/dashboard/${p.value}?${hashMotDePasse}${session.user.id}=${session.user.email}`)
                route.refresh()
            }
        }
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
                        className="group relative cursor-pointer w-full flex justify-center h-9 items-center py-2 px-5 border border-transparent text-sm font-medium rounded text-white bg-orangeme/90 hover:bg-orangeme focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orangeme/80 disabled:opacity-50"
                        ><p>Se connecter </p></button>
                    </div>
                </div>
                <div className="lg:hidden flex items-center">
                    <SearchBar />
                    { session ? ( <DropdownMenu>
                            <DropdownMenuTrigger className="-mt-2">
                                <div>
                                    <Image src={session.user.image ? session.user.image : Icons.userdefault} alt="avatar" className="border rounded" width={35} height={35} />
                                </div>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="mr-6 rounded font-outfit">
                                <DropdownMenuLabel className="flex w-[200px] gap-2">
                                    <Image src={session.user.image ? session.user.image : Icons.userdefault} alt="avatar" className="border rounded" width={35} height={35} />
                                    <div>
                                        <p>{session.user.name}</p>
                                        <p className="text-sm text-muted-foreground">{session.user.role}</p>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={continuerDash}>
                                <IconDashboard /> {session.user.role} dashboard
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                <Link href={`/instructor?url=${session.user.email}`} target="_blank" className="w-full flex gap-2 items-center" ><IconUsers /> Instructor Dashboard</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>À propos de Falarohy</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <IconLogout />
                                    <SignOutButton />
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>) : ""}
                </div>
            </div>

        </div>
    )
}

export default NavbarOne