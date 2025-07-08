import ApprenezEff from "../autres/ApprenezEff"
import VideosCours from "./VideoUploadPages"
import { CategoriesPage } from "./CategoriesPage"
import ListeCategories from "./ListsCategories"
const AddPages = () => {
    return (
        <div className="space-y-4">
            <ApprenezEff background="bg-[#8B5CF6]" />
            <div className="flex flex-wrap justify-between">
                <div className="lg:w-[43%] w-full flex flex-col items-center lg:items-start">
                    <p className="text-xl mb-4">Avoir plus de connaissances à partager ?</p>
                    <div className="w-full h-44 items-center lg:w-full">
                            <CategoriesPage />
                    </div>
                    <div className="w-full h-44 items-center mt-6 lg:w-full" >
                        <VideosCours />
                    </div>
                </div>
                <div className="lg:w-[55%] mt-7 lg:mt-0 w-full">
                    <ListeCategories />
                </div>
            </div>
        </div>
    )
}

export default AddPages
