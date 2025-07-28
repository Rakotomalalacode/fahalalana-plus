"use client"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { useEffect, useState } from "react"
import { IconCategory, IconCell } from "@tabler/icons-react"
import Link from "next/link"
import { ScrollArea } from "../ui/scroll-area"

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
        console.error("Erreur lors du chargement des catégories:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  return (
    <div>
      {/* Version Desktop */}
      <NavigationMenu className="hidden lg:block">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="bg-transparent rounded data-[state=open]:bg-transparent focus:bg-transparent! active:bg-transparent! hover:bg-transparent! space-x-2 hover:text-orangeme!">
              <IconCategory size={16} />
              Catégorie
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ScrollArea className="h-[500px] w-80">
                {loading ? (
                  <p className="font-outfit">Chargement...</p>
                ) : categories.length === 0 ? (
                  <p className="font-outfit">Aucune catégorie trouvée.</p>
                ) : (
                  <ul className="space-y-2 font-outfit">
                    {categories.map((cat) => (
                      <NavigationMenuLink key={cat.id} asChild>
                        <Link href={`/categories/${cat.id}`} className="hover:underline">
                          {cat.nom}
                        </Link>
                      </NavigationMenuLink>
                    ))}
                  </ul>
                )}
                <div className="w-full mt-4">
                  <Link
                    href="/categories"
                    className="w-full flex text-white bg-orangeme hover:bg-orangeme/90 px-4 py-2 items-center gap-2 rounded"
                  >
                    <IconCell size={18} /> Toutes les catégories
                  </Link>
                </div>
              </ScrollArea>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      {/* Version Mobile */}
      <Accordion type="single" collapsible className="lg:hidden block">
        <AccordionItem value="item-1">
          <AccordionTrigger>
            <div className="flex gap-2 items-center">
              <IconCategory className="text-orangeme" size={16} />
              Catégorie
            </div>
          </AccordionTrigger>
          <AccordionContent className="space-y-4">
            {loading ? (
              <p className="font-outfit">Chargement...</p>
            ) : categories.length === 0 ? (
              <p className="font-outfit">Aucune catégorie trouvée.</p>
            ) : (
              <ul className="flex flex-col gap-2 font-outfit">
                {categories.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/categories/${cat.id}`}
                    className="w-full text-start p-2 rounded bg-accent hover:bg-accent/80"
                  >
                    {cat.nom}
                  </Link>
                ))}
              </ul>
            )}
            <div className="w-full">
              <Link
                href="/categories"
                className="w-full flex text-white bg-orangeme px-4 py-2 items-center gap-2 rounded"
              >
                <IconCell size={18} /> Toutes les catégories
              </Link>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

export default Decouvrir
