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
                        <NavigationMenuTrigger className="bg-transparent rounded data-[state=open]:bg-transparent focus:bg-transparent! active:bg-transparent! hover:bg-transparent!">Decouvrir</NavigationMenuTrigger>
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
                            </div>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
            <Accordion type="single" className="lg:hidden block" collapsible>
                <AccordionItem value="item-1">
                    <AccordionTrigger>Decouvrir</AccordionTrigger>
                    <AccordionContent>
                        Yes. It adheres to the WAI-ARIA design pattern.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    )
}

export default Decouvrir