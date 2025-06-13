import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { ScrollArea } from "@/components/ui/scroll-area"
import { images } from "@/constants/images"
import { SquarePen, X } from "lucide-react"
import Image from "next/image"

const CoursEdits = () => {
    return (
        <Drawer>
            <DrawerTrigger><SquarePen size={45} className="text-black hover:text-[#3366ff]" /></DrawerTrigger>
            <DrawerContent>

                <DrawerHeader>
                    <div className="w-full flex justify-between">
                        <DrawerTitle className="outfit">Modification du cours de Titre de cours</DrawerTitle>
                        <DrawerClose>
                            <X className="hover:text-red-600" />
                        </DrawerClose>
                    </div>
                </DrawerHeader>
                <ScrollArea className="px-4 h-[65vh] w-full font-outfit">
                    <div className="flex gap-7 lg:gap-0 flex-wrap justify-between w-full h-full">
                        <ScrollArea className="shadow m-1 p-4 rounded-lg lg:w-[45%] w-full h-[64vh]">
                            <div className="flex flex-wrap w-full gap-6">
                                <Image src={images.LangagePython} width={500} height={500} className="lg:w-64 lg:h-32 rounded-md w-full h-48" alt={"LogoFalarohy"} />
                                <div className="space-y-3">
                                    <p className="text-xl flex"><span className="block lg:hidden mr-2">Titre : </span> Titre du cours</p>
                                    <div className="space-y-1">
                                        <p className="text-gray-600 flex"><span className="block lg:hidden mr-2">Prix :</span>0000 Ar</p>
                                        <p className="text-gray-600 flex"><span className="block lg:hidden mr-2">Date :</span>12 / 02 / 2025</p>
                                        <div className="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:grayscale">
                                            <Avatar>
                                                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                                <AvatarFallback>CN</AvatarFallback>
                                            </Avatar>
                                            <Avatar>
                                                <AvatarImage src="https://github.com/leerob.png" alt="@leerob" />
                                                <AvatarFallback>LR</AvatarFallback>
                                            </Avatar>
                                            <Avatar>
                                                <AvatarImage
                                                    src="https://github.com/evilrabbit.png"
                                                    alt="@evilrabbit"
                                                />
                                                <AvatarFallback>ER</AvatarFallback>
                                            </Avatar>
                                            <Avatar>
                                                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                                <AvatarFallback>CN</AvatarFallback>
                                            </Avatar>
                                        </div>
                                    </div>
                                </div>
                                <DrawerDescription >
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia dignissimos earum dolores tenetur corporis dolorem aliquam doloribus officiis minus maxime beatae ullam possimus eveniet rem repellat et, reprehenderit illum quibusdam.
                                </DrawerDescription>
                                <Accordion type="single" collapsible>
                                    <AccordionItem value="item-1">
                                        <AccordionTrigger>Soutitre du cours</AccordionTrigger>
                                        <AccordionContent>
                                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Distinctio.
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                            </div>
                        </ScrollArea>

                        <ScrollArea className="w-full shadow m-1 rounded-lg lg:w-[53%] h-[64vh] p-4">
                            <div className="w-full h-full">
                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                        Mot de passe
                                    </label>
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        placeholder="votre mot de passe"
                                        required
                                        className="mt-1 block w-full px-3 py-1.5 placeholder:text-sm border border-gray-300 rounded  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                </div>
                            </div>
                        </ScrollArea>
                    </div>
                </ScrollArea>
                <DrawerFooter>
                    <p className="qualyneue text-center text-orangeme">falarohy</p>
                </DrawerFooter>

            </DrawerContent>
        </Drawer>

    )
}

export default CoursEdits