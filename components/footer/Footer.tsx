const Footer = () => {
    return (
        <footer className="flex py-8 text-muted-foreground font-outfit shrink-0  bg-[#06141c] items-center justify-center">
            <div className="w-full flex flex-col gap-6 text-white text-center">
                <p className="lg:w-[90%] w-full m-auto">Falarohy est une entreprise majeure dans le domaine des technologies éducatives, qui travaille à fournir le matériel d'apprentissage le plus performant sur des sujets techniques et non techniques.</p>
           <p className="text-sm ">
                &copy; {new Date().getFullYear()} All rights reserved.
            </p>
            </div>
        </footer>
    )
}

export default Footer