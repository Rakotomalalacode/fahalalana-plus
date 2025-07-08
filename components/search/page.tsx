"use client"

import * as React from "react"
import {
  SearchIcon,
  ArrowUpRightIcon,
} from "lucide-react"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { IconSearch } from "@tabler/icons-react"
import { useRouter } from "next/navigation"

export default function SearchBar() {
  const [open, setOpen] = React.useState(false)
  const [search, setSearch] = React.useState("")
  const [results, setResults] = React.useState<{ cours: any[]; busines: any[] }>({
    cours: [],
    busines: [],
  })
  const [loading, setLoading] = React.useState(false)

  const router = useRouter()

  // Ouvrir avec ⌘K
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

  // Rechercher avec debounce
  React.useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (search.trim().length > 1) {
        setLoading(true)
        fetch(`/api/search?q=${encodeURIComponent(search)}`)
          .then(res => res.json())
          .then(data => setResults(data))
          .catch(err => console.error("Search error:", err))
          .finally(() => setLoading(false))
      } else {
        setResults({ cours: [], busines: [] })
      }
    }, 300)

    return () => clearTimeout(delayDebounce)
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
        {/* Icône pour mobile */}
        <IconSearch
          className="text-orangeme lg:hidden block -ms-1 me-3 cursor-pointer"
          size={30}
          onClick={() => setOpen(true)}
        />

        {/* Barre visible sur grand écran */}
        <button
          className="bg-transparent text-foreground hidden placeholder:text-muted-foreground/70 focus-visible:border-ring focus-visible:ring-ring/50 lg:inline-flex h-9 rounded border border-orangeme/50 px-3 py-2 text-sm transition-[color,box-shadow] outline-none focus-visible:ring-[3px] w-full"
          onClick={() => setOpen(true)}
        >
          <span className="flex grow items-center">
            <SearchIcon className="text-orangeme/50 -ms-1 me-3" size={16} />
            <span className="font-outfit">Recherchez vos tutoriels préférés ...</span>
          </span>
          <kbd className="bg-transparent text-muted-foreground/70 ms-12 -me-1 inline-flex h-5 max-h-full items-center rounded border px-1 text-[0.625rem] font-outfit">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* Fenêtre de recherche */}
      <CommandDialog open={open} onOpenChange={setOpen} className="rounded font-outfit">
        <CommandInput
          placeholder="Rechercher un cours ou un business..."
          value={search}
          onValueChange={setSearch}
        />
        <CommandList>
          {loading && (
            <CommandItem disabled>
              <span className="text-muted-foreground">Chargement...</span>
            </CommandItem>
          )}
          {!loading && results.busines.length === 0 && results.cours.length === 0 && search.length > 1 && (
            <CommandEmpty>Aucun résultat</CommandEmpty>
          )}

          {results.busines.length > 0 && (
            <CommandGroup heading="Business">
              {results.busines.map((b) => (
                <CommandItem key={b.id} onSelect={() => handleClick("busines", b.id)}>
                  <ArrowUpRightIcon className="mr-2" size={16} />
                  {b.titre}
                </CommandItem>
              ))}
            </CommandGroup>
          )}

          {results.cours.length > 0 && (
            <CommandGroup heading="Cours">
              {results.cours.map((c) => (
                <CommandItem key={c.id} onSelect={() => handleClick("cours", c.id)}>
                  <ArrowUpRightIcon className="mr-2" size={16} />
                  {c.titre}
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
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
//   const [results, setResults] = React.useState<{ cours: any[]; busines: any[] }>({ cours: [], busines: [] })
//   const router = useRouter()

//   React.useEffect(() => {
//     const down = (e: KeyboardEvent) => {
//       if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
//         e.preventDefault()
//         setOpen((open) => !open)
//       }
//     }

//     document.addEventListener("keydown", down)
//     return () => document.removeEventListener("keydown", down)
//   }, [])

//   React.useEffect(() => {
//   const delayDebounce = setTimeout(() => {
//     if (search.trim().length > 1) {
//       fetch(`/api/search?q=${search}`)
//         .then(res => res.json())
//         .then(data => setResults(data))
//     } else {
//       setResults({ cours: [], busines: [] })
//     }
//   }, 300) // ← délai de 300 ms
//   return () => clearTimeout(delayDebounce)
// }, [search])


//   // React.useEffect(() => {
//   //   const delayDebounce = setTimeout(() => {
//   //     if (search.trim().length > 1) {
//   //       fetch(`/api/search?q=${search}`)
//   //         .then(res => res.json())
//   //         .then(data => setResults(data))
//   //     } else {
//   //       setResults({ cours: [], busines: [] })
//   //     }
//   //   }, 300)

//   //   return () => clearTimeout(delayDebounce)
//   // }, [search])

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
//         <IconSearch
//           className="text-orangeme lg:hidden block -ms-1 me-3"
//           size={30}
//           aria-hidden="true"
//           onClick={() => setOpen(true)}
//         />
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

//       <CommandDialog open={open} onOpenChange={setOpen} className="rounded font-outfit">
//         <CommandInput
//           placeholder="Search your favourite tutorials ..."
//           value={search}
//           onValueChange={setSearch}
//         />
//         <CommandList>
//           <CommandEmpty>Aucun résultat</CommandEmpty>

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



// "use client"

// import * as React from "react"
// import {
//   ArrowUpRightIcon,
//   CircleFadingPlusIcon,
//   FileInputIcon,
//   FolderPlusIcon,
//   SearchIcon,
// } from "lucide-react"

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
// import { IconSearch } from "@tabler/icons-react"

// export default function SearchBar() {
//   const [open, setOpen] = React.useState(false)

//   React.useEffect(() => {
//     const down = (e: KeyboardEvent) => {
//       if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
//         e.preventDefault()
//         setOpen((open) => !open)
//       }
//     }

//     document.addEventListener("keydown", down)
//     return () => document.removeEventListener("keydown", down)
//   }, [])

//   return (
//     <>
//       <div>
//         <IconSearch
//             className="text-orangeme lg:hidden block -ms-1 me-3"
//             size={30}
//             aria-hidden="true"
//             onClick={() => setOpen(true)}
//           />
//         <button
//         className="bg-transparent text-foreground hidden placeholder:text-muted-foreground/70 focus-visible:border-ring focus-visible:ring-ring/50 lg:inline-flex h-9 rounded border border-orangeme/50 px-3 py-2 text-sm transition-[color,box-shadow] outline-none focus-visible:ring-[3px] w-full"
//         onClick={() => setOpen(true)}
//       >
//         <span className="flex grow items-center">
//           <SearchIcon
//             className="text-orangeme/50 -ms-1 me-3"
//             size={16}
//             aria-hidden="true"
//           />
//           <span className="font-outfit">Recherchez vos tutoriels préférés ...</span>
//         </span>
//         <kbd className="bg-transparent text-muted-foreground/70 ms-12 -me-1 inline-flex h-5 max-h-full items-center rounded border px-1 text-[0.625rem] font-outfit">
//           ⌘K
//         </kbd>
//       </button>
//       </div>
//       <CommandDialog open={open} onOpenChange={setOpen} className="rounded font-outfit">
//         <CommandInput placeholder="Search your favourite tutorials ..." />
//         <CommandList>
//           <CommandEmpty>No results found.</CommandEmpty>
//           <CommandGroup heading="Quick start">
//             <CommandItem>
//               <FolderPlusIcon
//                 size={16}
//                 className="opacity-60"
//                 aria-hidden="true"
//               />
//               <span>New folder</span>
//               <CommandShortcut className="justify-center">⌘N</CommandShortcut>
//             </CommandItem>
//             <CommandItem>
//               <FileInputIcon
//                 size={16}
//                 className="opacity-60"
//                 aria-hidden="true"
//               />
//               <span>Import document</span>
//               <CommandShortcut className="justify-center">⌘I</CommandShortcut>
//             </CommandItem>
//             <CommandItem>
//               <CircleFadingPlusIcon
//                 size={16}
//                 className="opacity-60"
//                 aria-hidden="true"
//               />
//               <span>Add block</span>
//               <CommandShortcut className="justify-center">⌘B</CommandShortcut>
//             </CommandItem>
//           </CommandGroup>
//           <CommandSeparator />
//           <CommandGroup heading="Navigation">
//             <CommandItem>
//               <ArrowUpRightIcon
//                 size={16}
//                 className="opacity-60"
//                 aria-hidden="true"
//               />
//               <span>Go to dashboard</span>
//             </CommandItem>
//             <CommandItem>
//               <ArrowUpRightIcon
//                 size={16}
//                 className="opacity-60"
//                 aria-hidden="true"
//               />
//               <span>Go to apps</span>
//             </CommandItem>
//             <CommandItem>
//               <ArrowUpRightIcon
//                 size={16}
//                 className="opacity-60"
//                 aria-hidden="true"
//               />
//               <span>Go to connections</span>
//             </CommandItem>
//           </CommandGroup>
//         </CommandList>
//       </CommandDialog>
//     </>
//   )
// }
