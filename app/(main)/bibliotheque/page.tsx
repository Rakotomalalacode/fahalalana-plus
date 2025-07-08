'use client'

import { useEffect, useState } from "react"
import Link from "next/link"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

type Contenu = {
  id: string
  titre: string
}

type CategorieWithContenus = {
  id: string
  nom: string
  cours: Contenu[]
  busines: Contenu[]
}

export default function BibliothequePage() {
  const [categories, setCategories] = useState<CategorieWithContenus[]>([])
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/bibliotheque")
      const data = await res.json()
      setCategories(data)
    }

    fetchData()
  }, [])

  const filteredCategories = categories.map((cat) => {
    if (!searchTerm.trim()) return cat

    const lowerSearch = searchTerm.toLowerCase()

    const filteredCours = cat.cours.filter((c) =>
      c.titre.toLowerCase().includes(lowerSearch)
    )

    const filteredBusines = cat.busines.filter((b) =>
      b.titre.toLowerCase().includes(lowerSearch)
    )

    return {
      ...cat,
      cours: filteredCours,
      busines: filteredBusines,
    }
  })

  return (
    <div className="px-4 py-10 font-outfit max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold mb-10">Page de Bibliothèque</h1>

      <div className="mb-8 flex flex-col gap-3 justify-center">
        <p>Recherchez parmi des milliers de tutoriels</p>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Recherchez un cours ou un business..."
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-1 focus:ring-orangeme"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredCategories.map((cat) => (
          <Table key={cat.id} className="border">
            <TableHeader>
              <TableRow>
                <TableHead className="bg-gray-900 text-white text-center">{cat.nom}</TableHead>

              </TableRow>
            </TableHeader>
            <TableBody>
              
                {cat.cours.map((c) => (
                  <TableRow key={c.id}>
                  <TableCell >
                    <Link href={`/detail-cours/${c.id}`} className=" px-4 w-full" >
                       {c.titre}
                    </Link>
                  </TableCell>
                  </TableRow>
                ))}
                {cat.busines.map((b) => (
                  <TableRow key={b.id}>
                  <TableCell >
                    <Link href={`/detaille-cours/${b.id}`} className=" px-4" >
                       {b.titre}
                    </Link>
                  </TableCell>
                  </TableRow>
                ))}
                {cat.cours.length + cat.busines.length === 0 && (
                  <TableRow>
                  <TableCell className="text-gray-400 italic">Aucun contenu</TableCell>
                  </TableRow>
                )}
              
            </TableBody>
          </Table>
        ))}
      </div>
    </div>
  )
}