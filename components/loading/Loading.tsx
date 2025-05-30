import { images } from "@/constants/images"
import Image from "next/image"

const Loading = () => {
    return (
        <div className="flex items-center w-screen justify-center h-screen">
            <div className="animate-spin  flex justify-center items-center rounded-full h-24 w-24">
                <Image  src={images.LogoFalarohy} width={200} height={200} alt={"LogoFalarohy"} />
            </div>
        </div>
    )
}

export default Loading