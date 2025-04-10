import Image from "next/image"
import ladoEsquerdo from "@/assets/ladoesquerdo.png"

export default function ContainerImage () {
    return(
        <div className="bg-blue-900 h-full w-full flex justify-center items-center ">
        <Image
            src={ladoEsquerdo}
            alt=" login illustration"
            className="w-3/4"
        />
        </div>

    )
}