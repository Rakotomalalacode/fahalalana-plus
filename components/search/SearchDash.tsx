"use client"

import * as React from "react"
import {
  ArrowUpRightIcon,
  CircleFadingPlusIcon,
  FileInputIcon,
  FolderPlusIcon,
  SearchIcon,
} from "lucide-react"
import { useRouter } from "next/navigation"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '@/components/ui/command'

type ResultItem = {
  id: string
  titre: string
  imageUrl: string
  prix: number
  categorie: string
  createdAt: string
}

export default function SearchDash() {
  const [open, setOpen] = React.useState(false)
  const [query, setQuery] = React.useState("")
  const [cours, setCours] = React.useState<ResultItem[]>([])
  const [busines, setBusines] = React.useState<ResultItem[]>([])
  const [loading, setLoading] = React.useState(false)
const router = useRouter()

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((prev) => !prev)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  React.useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (query.length > 1) {
        fetchResults(query)
      } else {
        setCours([])
        setBusines([])
      }
    }, 500)

    return () => clearTimeout(delayDebounce)
  }, [query])

  const fetchResults = async (search: string) => {
    setLoading(true)
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(search)}`)
      const data = await res.json()
      setCours(data.cours || [])
      setBusines(data.busines || [])
    } catch (err) {
      console.error("Erreur recherche", err)
    } finally {
      setLoading(false)
    }
  }
   const handleClick = (type: string, id: string) => {
    setOpen(false)
    if (type === "cours") {
      window.open(`/detail-cours/${id}`, "_blank", "noopener,noreferrer")
    } else {
      window.open(`/detaille-cours/${id}`, "_blank", "noopener,noreferrer")
    }
  }

  return (
    <>
      <div>
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

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="Rechercher un cours ou un business..."
          value={query}
          onValueChange={(value) => setQuery(value)}
        />
        <CommandList>
          {loading && <CommandItem>Chargement...</CommandItem>}
          {!loading && (
            <>
              {cours.length === 0 && busines.length === 0 && query.length > 1 ? (
                <CommandEmpty>Aucun résultat</CommandEmpty>
              ) : (
                <>
                  {cours.length > 0 && (
                    <CommandGroup heading="Cours">
                      {cours.map((item) => (
                        <CommandItem onSelect={() => handleClick("cours", item.id)} key={`cours-${item.id}`}>
                          <img
                            src={item.imageUrl}
                            alt={item.titre}
                            className="w-6 h-6 rounded object-cover mr-2"
                          />
                          <span>{item.titre}</span>
                          <CommandShortcut>{item.prix} Ar</CommandShortcut>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  )}
                  {busines.length > 0 && (
                    <CommandGroup heading="Business">
                      {busines.map((item) => (
                        <CommandItem onSelect={() => handleClick("busines", item.id)} key={`busines-${item.id}`}>
                          <img
                            src={item.imageUrl}
                            alt={item.titre}
                            className="w-6 h-6 rounded object-cover mr-2"
                          />
                          <span>{item.titre}</span>
                          <CommandShortcut>{item.prix} Ar</CommandShortcut>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  )}
                </>
              )}
            </>
          )}
        </CommandList>
      </CommandDialog>
    </>
  )
}



// "use client"

// import * as React from "react"
// import {
//     ArrowUpRightIcon,
//     CircleFadingPlusIcon,
//     FileInputIcon,
//     FolderPlusIcon,
//     SearchIcon,
// } from "lucide-react"

// import {
//     CommandDialog,
//     CommandEmpty,
//     CommandGroup,
//     CommandInput,
//     CommandItem,
//     CommandList,
//     CommandSeparator,
//     CommandShortcut,
// } from '@/components/ui/command'
// import { IconSearch } from "@tabler/icons-react"


// const SearchDash = () => {
//     const [open, setOpen] = React.useState(false)

//     React.useEffect(() => {
//         const down = (e: KeyboardEvent) => {
//             if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
//                 e.preventDefault()
//                 setOpen((open) => !open)
//             }
//         }

//         document.addEventListener("keydown", down)
//         return () => document.removeEventListener("keydown", down)
//     }, [])

//     return (
//         <>
//             <div>
//                 <div
//                     className="bg-transparent text-foreground  placeholder:text-muted-foreground/70 focus-visible:border-ring focus-visible:ring-ring/50 inline-flex h-9 py-2 text-sm transition-[color,box-shadow] outline-none focus-visible:ring-[3px] "
//                     onClick={() => setOpen(true)}
//                 >
//                     <span className="flex grow items-center">
//                         <span className="font-outfit">Recherchez</span>
//                     </span>
//                     <kbd className="bg-transparent text-muted-foreground/70 ms-5 -me-1 inline-flex h-5 max-h-full items-center rounded border px-1 text-[0.625rem] font-outfit">
//                         ⌘K
//                     </kbd>
//                 </div>
//             </div>
//             <CommandDialog open={open} onOpenChange={setOpen} className="rounded font-outfit">
//                 <CommandInput placeholder="Search your favourite tutorials ..." />
//                 <CommandList>
//                     <CommandEmpty>No results found.</CommandEmpty>
//                     <CommandGroup heading="Quick start">
//                         <CommandItem>
//                             <FolderPlusIcon
//                                 size={16}
//                                 className="opacity-60"
//                                 aria-hidden="true"
//                             />
//                             <span>New folder</span>
//                             <CommandShortcut className="justify-center">⌘N</CommandShortcut>
//                         </CommandItem>
//                         <CommandItem>
//                             <FileInputIcon
//                                 size={16}
//                                 className="opacity-60"
//                                 aria-hidden="true"
//                             />
//                             <span>Import document</span>
//                             <CommandShortcut className="justify-center">⌘I</CommandShortcut>
//                         </CommandItem>
//                         <CommandItem>
//                             <CircleFadingPlusIcon
//                                 size={16}
//                                 className="opacity-60"
//                                 aria-hidden="true"
//                             />
//                             <span>Add block</span>
//                             <CommandShortcut className="justify-center">⌘B</CommandShortcut>
//                         </CommandItem>
//                     </CommandGroup>
//                     <CommandSeparator />
//                     <CommandGroup heading="Navigation">
//                         <CommandItem>
//                             <ArrowUpRightIcon
//                                 size={16}
//                                 className="opacity-60"
//                                 aria-hidden="true"
//                             />
//                             <span>Go to dashboard</span>
//                         </CommandItem>
//                         <CommandItem>
//                             <ArrowUpRightIcon
//                                 size={16}
//                                 className="opacity-60"
//                                 aria-hidden="true"
//                             />
//                             <span>Go to apps</span>
//                         </CommandItem>
//                         <CommandItem>
//                             <ArrowUpRightIcon
//                                 size={16}
//                                 className="opacity-60"
//                                 aria-hidden="true"
//                             />
//                             <span>Go to connections</span>
//                         </CommandItem>
//                     </CommandGroup>
//                 </CommandList>
//             </CommandDialog>
//         </>
//     )
// }

// export default SearchDash