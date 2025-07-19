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
        {/* Mobile icon */}
        <IconSearch
          className="text-orangeme lg:hidden block -ms-1 me-3 cursor-pointer"
          size={30}
          onClick={() => setOpen(true)}
        />

        {/* Desktop search bar */}
        <button
          className="bg-transparent text-foreground hidden placeholder:text-muted-foreground/70 focus-visible:border-ring focus-visible:ring-ring/50 lg:inline-flex h-9 rounded border border-orangeme/50 px-3 py-2 text-sm transition outline-none focus-visible:ring-[3px] w-full"
          onClick={() => setOpen(true)}
        >
          <span className="flex grow items-center">
            <SearchIcon className="text-orangeme/50 -ms-1 me-3" size={16} />
            <span className="font-outfit">Recherchez vos tutoriels préférés ...</span>
          </span>
          <kbd className="ms-12 -me-1 inline-flex h-5 items-center rounded border px-1 text-[0.625rem]">
            ⌘ K
          </kbd>
        </button>
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
//   SearchIcon,
//   ArrowUpRightIcon,
// } from "lucide-react"
// import {
//   CommandDialog,
//   CommandEmpty,
//   CommandGroup,
//   CommandInput,
//   CommandItem,
//   CommandList,
// } from "@/components/ui/command"
// import { IconSearch } from "@tabler/icons-react"
// import { useRouter } from "next/navigation"

// export default function SearchBar() {
//   const [open, setOpen] = React.useState(false)
//   const [search, setSearch] = React.useState("")
//   const [results, setResults] = React.useState<{ cours: any[]; busines: any[] }>({
//     cours: [],
//     busines: [],
//   })
//   const [loading, setLoading] = React.useState(false)

//   const router = useRouter()

//   // Ouvrir avec ⌘K
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

//   // Rechercher avec debounce
//   React.useEffect(() => {
//     const delayDebounce = setTimeout(() => {
//       if (search.trim().length > 1) {
//         setLoading(true)
//         fetch(`/api/search?q=${encodeURIComponent(search)}`)
//           .then(res => res.json())
//           .then(data => setResults(data))
//           .catch(err => console.error("Search error:", err))
//           .finally(() => setLoading(false))
//       } else {
//         setResults({ cours: [], busines: [] })
//       }
//     }, 300)

//     return () => clearTimeout(delayDebounce)
//   }, [search])

//   const handleClick = (type: string, id: string) => {
//     setOpen(false)
//     if (type === "cours") {
//       router.push(`/detail-cours/${id}`)
//     } else {
//       router.push(`/detaille-cours/${id}`)
//     }
//   }

//   return (
//     <>
//       <div>
//         {/* Icône pour mobile */}
//         <IconSearch
//           className="text-orangeme lg:hidden block -ms-1 me-3 cursor-pointer"
//           size={30}
//           onClick={() => setOpen(true)}
//         />

//         {/* Barre visible sur grand écran */}
//         <button
//           className="bg-transparent text-foreground hidden placeholder:text-muted-foreground/70 focus-visible:border-ring focus-visible:ring-ring/50 lg:inline-flex h-9 rounded border border-orangeme/50 px-3 py-2 text-sm transition-[color,box-shadow] outline-none focus-visible:ring-[3px] w-full"
//           onClick={() => setOpen(true)}
//         >
//           <span className="flex grow items-center">
//             <SearchIcon className="text-orangeme/50 -ms-1 me-3" size={16} />
//             <span className="font-outfit">Recherchez vos tutoriels préférés ...</span>
//           </span>
//           <kbd className="bg-transparent text-muted-foreground/70 ms-12 -me-1 inline-flex h-5 max-h-full items-center rounded border px-1 text-[0.625rem] font-outfit">
//             ⌘K
//           </kbd>
//         </button>
//       </div>

//       {/* Fenêtre de recherche */}
//       <CommandDialog open={open} onOpenChange={setOpen} className="rounded font-outfit">
//         <CommandInput
//           placeholder="Rechercher un cours ou un business..."
//           value={search}
//           onValueChange={setSearch}
//         />
//         <CommandList>
//           {loading && (
//             <CommandItem disabled>
//               <span className="text-muted-foreground">Chargement...</span>
//             </CommandItem>
//           )}
//           {!loading && results.busines.length === 0 && results.cours.length === 0 && search.length > 1 && (
//             <CommandEmpty>Aucun résultat</CommandEmpty>
//           )}

//           {results.busines.length > 0 && (
//             <CommandGroup heading="Business">
//               {results.busines.map((b) => (
//                 <CommandItem key={b.id} onSelect={() => handleClick("busines", b.id)}>
//                   <ArrowUpRightIcon className="mr-2" size={16} />
//                   {b.titre}
//                 </CommandItem>
//               ))}
//             </CommandGroup>
//           )}

//           {results.cours.length > 0 && (
//             <CommandGroup heading="Cours">
//               {results.cours.map((c) => (
//                 <CommandItem key={c.id} onSelect={() => handleClick("cours", c.id)}>
//                   <ArrowUpRightIcon className="mr-2" size={16} />
//                   {c.titre}
//                 </CommandItem>
//               ))}
//             </CommandGroup>
//           )}
//         </CommandList>
//       </CommandDialog>
//     </>
//   )
// }