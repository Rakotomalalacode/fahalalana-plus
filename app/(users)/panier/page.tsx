"use client"

import { useCart } from "@/components/context/CartContext"
import { IconMoodCry, IconTrash } from "@tabler/icons-react"
import Image from "next/image"
import Link from "next/link"

export default function PanierPage() {
  const { cart, removeFromCart, clearCart } = useCart()

  const total = cart.reduce((sum, item) => sum + item.prix, 0)
  const count = cart.length
  return (
    <div className=" w-full flex flex-wrap justify-between font-outfit h-fit">
      <div className="w-full lg:px-9 py-9 px-4 lg:w-[50%]">
        <h1 className="text-3xl font-bold mb-4">Mon <span className="text-orangeme">Panier</span></h1>
      <div className="w-full flex flex-wrap pb-4 border-b mb-6 justify-between">
        <p>Résumé de la commande</p>
        <p className="flex gap-2">{count > 0 && (
        <span className="">
          {count}
        </span>
      )} Cours</p>
      </div>
      
      {cart.length === 0 ? (
        <div className="w-full h-[250px] flex items-center justify-center">
          <div className="space-y-4 flex flex-col items-center">
            <IconMoodCry className="text-gray-400" size={100} />
          <p>votre panier est vide</p>
          <p className="text-sm w-[300px] text-center" >vous devez ajouter des articles au panier avant de procéder au paiement <Link href="/busines-cours" className="text-blue-500 hover:underline">voire cours</Link></p>
          </div>
        </div>
      ) : (
        <>
          <ul className="space-y-4">
            {cart.map((item) => (
              <li key={item.id} className="flex items-center justify-between bg-white p-2 border rounded ">
                <div className="flex gap-4 items-center">
                  <Image src={item.imageUrl} alt={item.titre} width={500} height={500} className="rounded w-20 h-12 object-cover" />
                  <div>
                    <p className="font-semibold">{item.titre.slice(0, 17)}...</p>
                    <p className="text-muted-foreground">{item.prix.toLocaleString()} Ar</p>
                    
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  //className="text-red-500 hover:underline"
                className="bg-[#ff413a] h-9 px-2.5 py-1.5 has-[>svg]:px-3  rounded hover:bg-[#ff413a]/90"
                >
                  <IconTrash size={15} className="text-white" />
                </button>
              </li>
            ))}
          </ul>

          <div className="text-right flex justify-end mt-6">
            <button
              onClick={clearCart}
              className="bg-red-600 w-full lg:w-fit justify-center flex gap-2 mt-2 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Vider le panier 
            </button>
          </div>
        </>
      )}
      </div>
      <div className="w-full lg:w-[40%] px-4 py-9 lg:px-16 space-y-4 bg-accent">
        <div className="w-full flex justify-between">
          <p>Total</p>
          <p>{total.toLocaleString()} Ar</p>
        </div>
        <div className="w-full flex justify-between">
          <p>Remise totale (20%)</p>
          <p>{((25 * total)/100).toLocaleString()} Ar</p>
        </div>
        <div  className="w-full flex justify-between bg-white/50 p-3">
          <p>Montant à payer</p>
          <p>{(total - ((25 * total)/100)).toLocaleString()} Ar</p>
        </div>
        <div>
          <p className="text-xl">Modes de paiement</p>
        </div>
        <div className="bg-white h-16 w-full"></div>
        <button className="w-full h-12 bg-orangeme hover:bg-orangeme/90 text-white">VÉRIFIER</button>
      </div>
    </div>
  )
}
