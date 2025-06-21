import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { images } from "@/constants/images"
import { IconHandClick } from "@tabler/icons-react"
import { ShoppingCart, User } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const coursBuy = () => {
  return (
    <Carousel className="w-full">
      <CarouselContent className="lg:p-x4 p-x py-8  ">
        <CarouselItem className="md:basis-1/2 lg:basis-[335px]">
          <div className="w-80 space-y-4 hover:bg-primary-foreground shadow border rounded">
            <Image src={images.LangagePython} className="w-full rounded-t h-[170px]" width={500} height={500} alt="cours" />
            <div className="space-y-1 px-4">
              <p className="text-xl font-bold">Titre du cours</p>
              <p className="flex gap-2 items-center"><User size={16} /> Nom du professeur</p>
              <p><span className="font-bold">45</span> Lectures <span className="font-bold">521</span> Ar</p>
            </div>
            <hr />
            <div className="flex justify-between px-4 pb-4 items-center">
              <button
                className="bg-orangeme cursor-pointer flex gap-2 hover:bg-orangeme/90 text-white py-3 px-6"
              ><IconHandClick />Acheter maintenant</button>
              <Link href="/" className="bg-orangeme hover:bg-orangeme/90 text-white py-3 px-4"><ShoppingCart /></Link>
            </div>
          </div>
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious className="bg-orangeme rounded text-white border-none" />
      <CarouselNext className="bg-orangeme rounded text-white border-none" />
    </Carousel>
  )
}

export default coursBuy