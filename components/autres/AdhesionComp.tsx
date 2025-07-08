import { images } from "@/constants/images"
import Image from "next/image"
import Link from "next/link"

const AdhesionComp = () => {
    return(
<div className="bg-[#06141c] space-y-6 lg:flex justify-between w-full lg:px-9 px-4 py-9 text-white ">
            <div className="flex w-full lg:self-center lg:w-[40%] flex-col gap-4">
                <h1 className="text-3xl"><span className="text-orangeme">Adhésion</span> à Falarohy</h1>
                <p>Devenez un membre apprécié de Tutorials Point et profitez d'un accès illimité à notre vastDevenez instructeur sur notre plateforme pour créer des cours captivants et partager votre expertise avec des apprenants du monde entier. Postulez pour enseigner avec nous dès aujourd'hui et accédez à des outils puissants ainsi qu'à d'autres avantages.e bibliothèque de cours vidéo les mieux notés.</p>
                <Link href="/auth/signup" className="lg:w-fit w-full py-2 px-10 text-center bg-orangeme/90 hover:bg-orangeme rounded">Inscrivez-vous maintenant</Link>
            </div>
            <Image src={images.instructorTow} alt="instructor" width={500} height={500}/>
        </div>
    )
}

export default AdhesionComp