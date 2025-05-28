import { images } from "@/constants/images"
import Image from "next/image"
import Link from "next/link"

const LogoFalarohy = () => {
    return (
        <Link className="flex w-fit text-2xl gap-0.5 qualyneue items-center" href={"/"}>
            <p>falar</p>
            <Image
                src={images.LogoFalarohy}
                width={200}
                height={200}
                className="w-7 h-7"
                alt={"LogoFalarohy"} />
            <p>hy</p>
        </Link>
    )
}

export default LogoFalarohy