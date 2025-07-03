import { prisma } from "@/lib/prisma"
import Image from "next/image"
import { notFound } from "next/navigation"
import { ShoppingCart, User } from "lucide-react"
import { AddToCartButton } from "@/components/coursBuy/AddToCartButton" // bouton personnalisé


type Params = Promise<{ id: string }>

export default async function BusinesDetailPage( context : {params : Params}) {
  const params = await context.params
  const cours = await prisma.busines.findUnique({
    where: { id: params.id },
    include: {
      user: {
        select: {
          name: true,
          email: true,
        }
      }
    }
  })
// type Props = {
//   params: {
//     id: string
//   }
// }

// export default async function BusinesDetailPage({ params }: Props) {
//   const cours = await prisma.busines.findUnique({
//     where: { id: params.id },
//     include: {
//       user: {
//         select: {
//           name: true,
//           email: true,
//         }
//       }
//     }
//   })

  if (!cours) return notFound()

  return (
    <div className="w-full mx-auto h-fit lg:h-[500px] bg-[url(/images/bg-continue.png)] bg-cover font-outfit">
      <div className="bg-black/80 flex flex-wrap  justify-between px-4 lg:px-9 py-9 w-full h-full">
        <div className="flex flex-col lg:self-center h-fit gap-4 w-full lg:w-[45%] text-white">
          <div className="lg:flex gap-4">
            <Image
              src={cours.imageUrl}
              alt={cours.titre}
              width={400}
              height={500}
              className="rounded-lg w-full lg:w-32 lg:h-32 object-cover"
            />
            <div className="space-y-5 lg:mt-0 mt-8">
              <p className="text-2xl lg:text-5xl text-orangeme font-bold">{cours.titre.slice(0, 17)}</p>
              <div className="space-y-2">
                <p>Mis à jour le {cours.createdAt.toLocaleString('fr-FR', { dateStyle: 'long' })}</p>
                <p className="hover:underline flex gap-2 items-center"> <User size={16} className="inline" /> {cours.user?.name || "Inconnu"}</p>
              </div>
            </div>
          </div>
          <div>
            <p className="h-[98px] overflow-hidden line-clamp-4">{cours.description}</p>
          </div>
        </div>
        <div className="bg-white lg:w-[475px] lg:mt-0  mt-9 rounded lg:self-center w-full h-fit p-6 space-y-4">
                    <p className="text-3xl font-bold text-orange-600">{cours.prix.toLocaleString()} Ar</p>
          <div className="lg:flex justify-between mt-4">
            <div>
              <AddToCartButton cours={cours} redirect={false} />
            </div>
            <form action="" method="POST" className="w-full lg:w-[45%]">
              <input type="hidden" name="coursId" value={cours.id} />
              <button type="submit"                   className="bg-green-600 lg:w-fit w-full lg:mt-0 mt-5 cursor-pointer flex gap-2 rounded hover:bg-green-700 text-white py-3 px-6">
                Acheter maintenant 
              </button>
            </form>
          </div>
          <h1 className="text-3xl font-bold">{cours.titre}</h1>
          <div className="flex flex-wrap gap-4 mt-4">
          <p className="text-gray-600 hover:underline">Catégorie : {cours.categorie}</p>
          <p className="text-gray-700 hover:underline flex items-center gap-2">Par : <User size={16} className="inline" /> {cours.user?.name || "Inconnu"}</p>
          </div>
          
        </div>
      </div>
    </div>
  )
}


// const DetailleCours = () => {
//     return (
//         <div>DetailleCours</div>
//     )
// }

// export default DetailleCours