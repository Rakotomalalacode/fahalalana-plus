"use client"

import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { SearchIcon, ArrowUpRightIcon } from "lucide-react"
import { IconSearch } from "@tabler/icons-react"

export default function SearchBar() {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState("")
  const [results, setResults] = useState<{ cours: any[]; busines: any[] }>({ cours: [], busines: [] })
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  // Ctrl+K or Cmd+K to open search
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault()
        setOpen(prev => !prev)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  // Debounced fetch
  useEffect(() => {
    const delay = setTimeout(() => {
      if (search.trim().length > 1) {
        setLoading(true)
        fetch(`/api/search?q=${encodeURIComponent(search)}`)
          .then(res => res.json())
          .then(data => setResults(data))
          .catch(err => console.error(err))
          .finally(() => setLoading(false))
      } else {
        setResults({ cours: [], busines: [] })
      }
    }, 300) 

    return () => clearTimeout(delay)
  }, [search])

  const handleClick = (type: string, id: string) => {
    setOpen(false)
    if (type === "cours") {
      router.push(`/detail-cours/${id}`)
    } else {
      router.push(`/detaille-cours/${id}`)
    }
  }

  return (
    <>
      <div>
        {/* Desktop search bar */}
        <div
          role="button"
          className="bg-transparent text-foreground  placeholder:text-muted-foreground/70 focus-visible:border-ring focus-visible:ring-ring/50 inline-flex h-9 py-2 text-sm transition-[color,box-shadow] outline-none focus-visible:ring-[3px]"
          onClick={() => setOpen(true)}
        >
          <span className="flex grow items-center">
            <span className="font-outfit">Recherchez</span>
          </span>
          <kbd className="bg-transparent text-muted-foreground/70 ms-5 -me-1 inline-flex h-5 max-h-full items-center rounded border px-1 text-[0.625rem] font-outfit">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Modal search */}
      {open && (
        <div className="fixed px-4 font-outfit h-screen inset-0 bg-black/50 z-50 flex items-center justify-center pt-20">
          <div className="bg-white dark:bg-zinc-900 w-full max-w-xl rounded p-4">
            <div className="flex items-center border rounded px-3 py-2 mb-4">
              <SearchIcon className="text-muted-foreground mr-2" size={18} />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Rechercher un cours ou un business..."
                className="w-full bg-transparent outline-none text-sm"
              />
              <button onClick={() => setOpen(false)} className="text-sm text-muted-foreground ms-2">✕</button>
            </div>

            <div className="max-h-64 overflow-y-auto">
              {loading && <p className="text-sm text-center text-muted-foreground">Chargement...</p>}
              {!loading && results.cours.length === 0 && results.busines.length === 0 && search.length > 1 && (
                <p className="text-sm text-center text-muted-foreground">Aucun résultat</p>
              )}

              {results.busines.length > 0 && (
                <div className="mb-3">
                  <p className="text-xs font-semibold mb-1">Business</p>
                  {results.busines.map((b) => (
                    <div
                      key={b.id}
                      className="flex items-center gap-2 p-2 cursor-pointer hover:bg-muted/20 rounded"
                      onClick={() => handleClick("busines", b.id)}
                    >
                      <ArrowUpRightIcon size={16} />
                      <span>{b.titre}</span>
                    </div>
                  ))}
                </div>
              )}

              {results.cours.length > 0 && (
                <div>
                  <p className="text-xs font-semibold mb-1">Cours</p>
                  {results.cours.map((c) => (
                    <div
                      key={c.id}
                      className="flex items-center gap-2 p-2 cursor-pointer hover:bg-muted/20 rounded"
                      onClick={() => handleClick("cours", c.id)}
                    >
                      <ArrowUpRightIcon size={16} />
                      <span>{c.titre}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

// "use client"

// import * as React from "react"
// import {
//   ArrowUpRightIcon,
//   CircleFadingPlusIcon,
//   FileInputIcon,
//   FolderPlusIcon,
//   SearchIcon,
// } from "lucide-react"
// import { useRouter } from "next/navigation"
// import {
//   CommandDialog,
//   CommandEmpty,
//   CommandGroup,
//   CommandInput,
//   CommandItem,
//   CommandList,
//   CommandSeparator,
//   CommandShortcut,
// } from '@/components/ui/command'

// type ResultItem = {
//   id: string
//   titre: string
//   imageUrl: string
//   prix: number
//   categorie: string
//   createdAt: string
// }

// export default function SearchDash() {
//   const [open, setOpen] = React.useState(false)
//   const [query, setQuery] = React.useState("")
//   const [cours, setCours] = React.useState<ResultItem[]>([])
//   const [busines, setBusines] = React.useState<ResultItem[]>([])
//   const [loading, setLoading] = React.useState(false)
// const router = useRouter()

//   React.useEffect(() => {
//     const down = (e: KeyboardEvent) => {
//       if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
//         e.preventDefault()
//         setOpen((prev) => !prev)
//       }
//     }

//     document.addEventListener("keydown", down)
//     return () => document.removeEventListener("keydown", down)
//   }, [])

//   React.useEffect(() => {
//     const delayDebounce = setTimeout(() => {
//       if (query.length > 1) {
//         fetchResults(query)
//       } else {
//         setCours([])
//         setBusines([])
//       }
//     }, 500)

//     return () => clearTimeout(delayDebounce)
//   }, [query])

//   const fetchResults = async (search: string) => {
//     setLoading(true)
//     try {
//       const res = await fetch(`/api/search?q=${encodeURIComponent(search)}`)
//       const data = await res.json()
//       setCours(data.cours || [])
//       setBusines(data.busines || [])
//     } catch (err) {
//       console.error("Erreur recherche", err)
//     } finally {
//       setLoading(false)
//     }
//   }
//    const handleClick = (type: string, id: string) => {
//     setOpen(false)
//     if (type === "cours") {
//       window.open(`/detail-cours/${id}`, "_blank", "noopener,noreferrer")
//     } else {
//       window.open(`/detaille-cours/${id}`, "_blank", "noopener,noreferrer")
//     }
//   }

//   return (
//     <>
//       <div>
//         <div
//           role="button"
//           className="bg-transparent text-foreground  placeholder:text-muted-foreground/70 focus-visible:border-ring focus-visible:ring-ring/50 inline-flex h-9 py-2 text-sm transition-[color,box-shadow] outline-none focus-visible:ring-[3px]"
//           onClick={() => setOpen(true)}
//         >
//           <span className="flex grow items-center">
//             <span className="font-outfit">Recherchez</span>
//           </span>
//           <kbd className="bg-transparent text-muted-foreground/70 ms-5 -me-1 inline-flex h-5 max-h-full items-center rounded border px-1 text-[0.625rem] font-outfit">
//             ⌘K
//           </kbd>
//         </div>
//       </div>

//       <CommandDialog open={open} onOpenChange={setOpen}>
//         <CommandInput
//           placeholder="Rechercher un cours ou un business..."
//           value={query}
//           onValueChange={(value) => setQuery(value)}
//         />
//         <CommandList>
//           {loading && <CommandItem>Chargement...</CommandItem>}
//           {!loading && (
//             <>
//               {cours.length === 0 && busines.length === 0 && query.length > 1 ? (
//                 <CommandEmpty>Aucun résultat</CommandEmpty>
//               ) : (
//                 <>
//                   {cours.length > 0 && (
//                     <CommandGroup heading="Cours">
//                       {cours.map((item) => (
//                         <CommandItem onSelect={() => handleClick("cours", item.id)} key={`cours-${item.id}`}>
//                           <img
//                             src={item.imageUrl}
//                             alt={item.titre}
//                             className="w-6 h-6 rounded object-cover mr-2"
//                           />
//                           <span>{item.titre}</span>
//                           <CommandShortcut>{item.prix} Ar</CommandShortcut>
//                         </CommandItem>
//                       ))}
//                     </CommandGroup>
//                   )}
//                   {busines.length > 0 && (
//                     <CommandGroup heading="Business">
//                       {busines.map((item) => (
//                         <CommandItem onSelect={() => handleClick("busines", item.id)} key={`busines-${item.id}`}>
//                           <img
//                             src={item.imageUrl}
//                             alt={item.titre}
//                             className="w-6 h-6 rounded object-cover mr-2"
//                           />
//                           <span>{item.titre}</span>
//                           <CommandShortcut>{item.prix} Ar</CommandShortcut>
//                         </CommandItem>
//                       ))}
//                     </CommandGroup>
//                   )}
//                 </>
//               )}
//             </>
//           )}
//         </CommandList>
//       </CommandDialog>
//     </>
//   )
// }
