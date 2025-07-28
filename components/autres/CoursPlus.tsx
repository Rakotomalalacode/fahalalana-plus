"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import { IconPlayerPlayFilled } from "@tabler/icons-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import Image from "next/image"

type Props = {
  cours: {
    title: string
    description: string
    videoUrl: string
    thumbnail: string
  }
}

const CoursPlus = ({ cours }: Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex items-center cursor-pointer gap-5 lg:px-5 py-2 bg-transparent rounded transition">
          <span className="absolute inline-flex h-8 w-8 animate-ping rounded-full bg-orangeme opacity-75"></span>
          <p className="w-8 h-8 bg-orangeme items-center flex justify-center rounded-full">
            <IconPlayerPlayFilled size="15" />
          </p>
          <p className="text-orangeme text-lg">Regarder</p>
        </div>
      </DialogTrigger>

      <DialogContent className="w-full h-[90vh] lg:max-w-[1200px] font-outfit rounded overflow-hidden bg-white p-0">
        <div className="relative w-full h-full flex flex-col lg:flex-row">
          <div className="w-full lg:w-2/3 h-[300px] lg:h-full bg-black">
            <video
              src={cours.videoUrl}
              controls
              controlsList="nodownload"
              autoPlay
              className="w-full h-full object-contain"
            />
          </div>
          <div className="w-full lg:w-1/3 p-6 overflow-y-auto">
            <DialogHeader className="space-y-2">
               <Image
                    src={cours.thumbnail}
                    alt={cours.title}
                    width={500}
                    height={500}
                    className="w-full h-40 object-cover rounded-md"
                  />
              <DialogTitle className="text-2xl font-bold">{cours.title}</DialogTitle>
              <DialogDescription className="mt-4 text-gray-600">
                <ScrollArea className="h-[260px] w-full">
                  {cours.description}
                </ScrollArea>
              </DialogDescription>
            </DialogHeader>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default CoursPlus
