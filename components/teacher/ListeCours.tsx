import {
  Calculator,
  Calendar,
  CreditCard,
  Settings,
  Smile,
  SquarePen,
  User,
} from "lucide-react"

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import Image from "next/image"
import { images } from "@/constants/images"
import CoursEdits from "./CoursEdits"

export function ListeCours() {
  return (
    <Command className="rounded-lg border shadow-md md:min-w-[450px]">
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>Aucun résultat trouvé.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem>
            <div className="flex gap-4 w-full">
              <Image src={images.LangagePython} width={200} height={200} className="w-[100px] h-[60px] rounded" alt={"LangagePython"} />
              <div className="w-[90%] flex justify-between items-center">
                <div>
                  <span className="font-medium">Titre du cours</span>
                  <p className="text-gray-400">Description du cours</p>
                  <p className="text-gray-400">16 / 02 / 2025</p>
                </div>
                <div>
                  <CoursEdits />
                </div>
              </div>
            </div>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command >
  )
}
