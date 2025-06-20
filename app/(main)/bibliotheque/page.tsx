import Saerchlib from "@/components/search/Saerchlib"

const bibliotheque = () => {
    return (
        <div className="font-outfit space-y-6">
            <div className="space-y-3 lg:px-9 px-4">
                <h1 className="text-5xl">Bibliothèque</h1>
            </div>
            <hr />
            <div className="lg:px-9 px-4">
                <Saerchlib />
            </div>

            <div className="flex flex-wrap space-y-6 h-fit lg:space-x-3.5 px-4 justify-center lg:justify-start lg:px-[15px]">


            </div>
        </div>
    )
}

export default bibliotheque