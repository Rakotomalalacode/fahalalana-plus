import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import Link from "next/link"
import { Menu } from "lucide-react"
const Mobilemenu = () => {
    return (
        <div className="w-full px-4 bg-orangeme text-white items-center">
            <Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>
        <div className="flex gap-2 items-center"><Menu /><p>Menu</p></div>
    </AccordionTrigger>
    <AccordionContent className="w-full grid grid-cols-2 space-y-6 justify-between">
      <Link href="/" className="mt-1 hover:underline hover:text-orangeme text-white" >Accueil</Link>
                                <div className="flex justify-end"><Link href="/formation" className="mt-1 mr-2.5 hover:underline hover:text-orangeme text-white" >Formations</Link></div>
                                <Link href="/bibliotheque" className="mt-1 hover:underline hover:text-orangeme text-white" >Bibliothèque</Link>
                                <div className="flex justify-end"><Link href="/auth/signin" className="mt-1 hover:underline  hover:text-orangeme text-white" >Se connecter</Link></div>
                                <Link href="/auth/signup" className="mt-1 hover:underline hover:text-orangeme text-white" >S'inscrire</Link>
                                <div className="flex justify-end"><Link href="/panier" className="mt-1 mr-10 hover:underline  hover:text-orangeme text-white" >Panier</Link></div>
    </AccordionContent>
  </AccordionItem>
</Accordion>
</div>
    )
}

export default Mobilemenu