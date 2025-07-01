"use client"

import { useCart } from "@/components/context/CartContext"
import { IconHandClick } from "@tabler/icons-react"
import { ShoppingCart } from "lucide-react"
import { useRouter } from "next/navigation"

type Props = {
    cours: {
        id: string
        titre: string
        prix: number
        imageUrl: string
    }
    redirect?: boolean
}

export function AddToCartButton({ cours, redirect = true }: Props) {
    const { addToCart } = useCart()
    const router = useRouter()

    const handleAdd = () => {
        addToCart({
            id: cours.id,
            titre: cours.titre,
            prix: cours.prix,
            imageUrl: cours.imageUrl
        })
        router.push(`/detaille-cours/${cours.id}`)
    }

    return (
        <button
            onClick={handleAdd}
                  className="bg-orangeme items-center lg:w-fit w-full cursor-pointer flex gap-2 rounded hover:bg-orangeme/90 text-white py-3 px-8"
        >
            <IconHandClick size={18}  /> Ajouter au panier
        </button>
    )
}
