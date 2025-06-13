import ApprenezEff from "../autres/ApprenezEff"
import { ListeCours } from "./ListeCours"
import AddCours from "./AddCours"
import { CreactCategorier } from "./CreactCategorier"
import Addbusiness from "./Addbusiness"
const CoursPages = () => {
    return (
        <div className="space-y-4">
            <ApprenezEff />
            <div className="flex flex-wrap space-y-7 justify-between">
                <div className="lg:w-[43%] w-full flex flex-col items-center lg:items-start">
                    <p className="text-xl mb-4">Avoir plus de connaissances à partager ?</p>
                    <div className="w-fit lg:w-full space-x-6 grid space-y-6 grid-cols-2">
                        <div className="space-y-4" >
                            <CreactCategorier />
                        </div>
                        <div className="space-y-4 ml-1 lg:ml-0" >
                            <AddCours />
                        </div>
                    </div>
                    <div className="w-full lg:w-[90.6%]" >
                        <Addbusiness />
                    </div>
                </div>
                <div className="lg:w-[55%] w-full">
                    <ListeCours />
                </div>
            </div>
        </div>
    )
}

export default CoursPages