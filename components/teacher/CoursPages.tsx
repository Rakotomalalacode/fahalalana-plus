import ApprenezEff from "../autres/ApprenezEff"
import { ListeCours } from "./ListeCours"
import AddCours from "./AddCours"
import { CreactCategorier } from "./CreactCategorier"
import Addbusiness from "./Addbusiness"
const CoursPages = () => {
    return (
        <div className="space-y-4">
            <ApprenezEff background="" />
            <div className="flex flex-wrap justify-between">
                <div className="lg:w-[43%] w-full flex flex-col items-center lg:items-start">
                    <p className="text-xl mb-4">Avoir plus de connaissances à partager ?</p>
                    <div className="w-fit lg:w-full justify-between flex flex-wrap-reverse space-y-6">
                        <div className="space-y-4 w-[47%]" >
                            <CreactCategorier />
                        </div>
                        <div className="space-y-4 w-[47%] lg:ml-0" >
                            <AddCours />
                        </div>
                    </div>
                    <div className="w-full h-44 items-center lg:w-full" >
                        <Addbusiness />
                    </div>
                </div>
                <div className="lg:w-[55%] mt-7 lg:mt-0 w-full">
                    <ListeCours />
                </div>
            </div>
        </div>
    )
}

export default CoursPages