"use client"

import Link from "next/link"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { IconDashboard, IconLogout, IconMenuDeep, IconUsers } from "@tabler/icons-react"
import { images } from "@/constants/images"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { ShoppingCart } from "lucide-react"
import { useCart } from "@/components/context/CartContext"
import Decouvrir from "@/components/Decouvrir/Decouvrir"
import SearchBar from "@/components/search/page"
import LogoFalarohy from "@/components/logo"
import { Icons } from "@/constants/icons"
import bcrypt from "bcryptjs"
import { SignOutButton } from "@/components/sign-out-button"

type Pointeur<T> = {
    value: T
}

const NavebarTowclient = ({ session }: any) => {
    const router = useRouter()
    const { cart } = useCart()
    const count = cart.length

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
    
                router.push(`/dashboard/${p.value}?${hashMotDePasse}${session.user.id}=${session.user.email}`)
                router.refresh()
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
                        <Link href="/panier" className="relative mt-2">
                            <ShoppingCart size={24} />
                            {count > 0 && (
                                <span className="absolute -top-2 -right-2 bg-orangeme text-white text-xs px-2 py-0.5 rounded-full">
                                    {count}
                                </span>
                            )}
                        </Link>
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
                <div className="lg:hidden flex  items-center">
                    <div className="flex items-center gap-6">
                        <Link href="/panier" className="relative mt-1">
                            <ShoppingCart size={24} />
                            {count > 0 && (
                                <span className="absolute -top-2 -right-2 bg-orangeme text-white text-xs px-2 py-0.5 rounded-full">
                                    {count}
                                </span>
                            )}
                        </Link>
                        
                    <SearchBar />
                    </div>
                </div>
            </div>

        </div>
    )
}

export default NavebarTowclient