"use client"

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { useEffect, useState } from "react"
import { IconCategory , IconCell} from "@tabler/icons-react"
import Link from "next/link"

type Categorie = {
    id: number
    nom: string
    createdAt: string
}

const Decouvrir = () => {
    const [categories, setCategories] = useState<Categorie[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch("/api/categories")
                const data = await res.json()
                setCategories(data)
            } catch (err) {
                console.error("Erreur:", err)
            } finally {
                setLoading(false)
            }
        }

        fetchCategories()
    }, [])

    return (
        <div>
            <NavigationMenu className="hidden lg:block">
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <NavigationMenuTrigger className="bg-transparent rounded data-[state=open]:bg-transparent focus:bg-transparent! active:bg-transparent! hover:bg-transparent! space-x-2 hover:text-orangeme!"><IconCategory size={16} /> Catégorie</NavigationMenuTrigger>
                        <NavigationMenuContent>

                            <div className="w-80">
                                {loading ? (
                                <p className="outfit">Chargement...</p>
                            ) : categories.length === 0 ? (
                                <p className="outfit">Aucune catégorie trouvée.</p>
                            ) : (
                                <ul className="space-y-2 outfit">
                                    {categories.map((cat) => (
                                        <NavigationMenuLink
                                            // value={`${cat.nom}`}
                                            key={cat.id}
                                        >
                                            {cat.nom}
                                        </NavigationMenuLink>
                                    ))}
                                </ul>
                            )}
                            <div className="w-full mt-2">
                                <Link href="/categories" className="w-full flex text-white bg-orangeme hover:bg-orangeme/90 px-4 py-2 items-center gap-2 rounded"> <IconCell size={18} /> Toutes les catégories</Link>
                            </div>
                            </div>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
            <Accordion type="single" className="lg:hidden block" collapsible>
                <AccordionItem value="item-1">
                    <AccordionTrigger><div className="flex gap-2  items-center"><IconCategory className="text-orangeme" size={16}/>Catégorie</div></AccordionTrigger>
                    <AccordionContent className="space-y-4">
                         
                                {loading ? (
                                <p className="outfit">Chargement...</p>
                            ) : categories.length === 0 ? (
                                <p className="outfit">Aucune catégorie trouvée.</p>
                            ) : (
                                <ul className="space-y-2 flex w-full  flex-col outfit">
                                    {categories.map((cat) => (
                                        <button
                                            // value={`${cat.nom}`}
                                            key={cat.id}
                                            className="w-full text-start p-2 rounded bg-accent"
                                        >
                                            {cat.nom}
                                        </button>
                                    ))}
                                </ul>
                            )}
                             <div className="w-full">
                                <Link href="/categories" className="w-full flex text-white bg-orangeme px-4 py-2 items-center gap-2 rounded"> <IconCell size={18} /> Toutes les catégories</Link>
                            </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    )
}

export default Decouvrir