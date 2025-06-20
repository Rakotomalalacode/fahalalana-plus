"use client"

import * as React from "react"
import {
  ArrowUpRightIcon,
  CircleFadingPlusIcon,
  FileInputIcon,
  FolderPlusIcon,
  SearchIcon,
} from "lucide-react"

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
import { IconSearch } from "@tabler/icons-react"

export default function SearchBar() {
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  return (
    <>
      <div>
        <IconSearch
            className="text-orangeme lg:hidden block -ms-1 me-3"
            size={30}
            aria-hidden="true"
            onClick={() => setOpen(true)}
          />
        <button
        className="bg-transparent text-foreground hidden placeholder:text-muted-foreground/70 focus-visible:border-ring focus-visible:ring-ring/50 lg:inline-flex h-9 rounded border border-orangeme/50 px-3 py-2 text-sm transition-[color,box-shadow] outline-none focus-visible:ring-[3px] w-full"
        onClick={() => setOpen(true)}
      >
        <span className="flex grow items-center">
          <SearchIcon
            className="text-orangeme/50 -ms-1 me-3"
            size={16}
            aria-hidden="true"
          />
          <span className="font-outfit">Recherchez vos tutoriels préférés ...</span>
        </span>
        <kbd className="bg-transparent text-muted-foreground/70 ms-12 -me-1 inline-flex h-5 max-h-full items-center rounded border px-1 text-[0.625rem] font-outfit">
          ⌘K
        </kbd>
      </button>
      </div>
      <CommandDialog open={open} onOpenChange={setOpen} className="rounded font-outfit">
        <CommandInput placeholder="Search your favourite tutorials ..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Quick start">
            <CommandItem>
              <FolderPlusIcon
                size={16}
                className="opacity-60"
                aria-hidden="true"
              />
              <span>New folder</span>
              <CommandShortcut className="justify-center">⌘N</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <FileInputIcon
                size={16}
                className="opacity-60"
                aria-hidden="true"
              />
              <span>Import document</span>
              <CommandShortcut className="justify-center">⌘I</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <CircleFadingPlusIcon
                size={16}
                className="opacity-60"
                aria-hidden="true"
              />
              <span>Add block</span>
              <CommandShortcut className="justify-center">⌘B</CommandShortcut>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Navigation">
            <CommandItem>
              <ArrowUpRightIcon
                size={16}
                className="opacity-60"
                aria-hidden="true"
              />
              <span>Go to dashboard</span>
            </CommandItem>
            <CommandItem>
              <ArrowUpRightIcon
                size={16}
                className="opacity-60"
                aria-hidden="true"
              />
              <span>Go to apps</span>
            </CommandItem>
            <CommandItem>
              <ArrowUpRightIcon
                size={16}
                className="opacity-60"
                aria-hidden="true"
              />
              <span>Go to connections</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}
