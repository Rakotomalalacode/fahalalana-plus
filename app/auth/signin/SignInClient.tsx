"use client"

import { useState } from "react"
import { getSession, signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Icons as icons } from "@/constants/icons"
import { images } from "@/constants/images"
import { SignOutButton } from "@/components/sign-out-button"
import bcrypt from "bcryptjs"
import { toast } from "sonner"

type Pointeur<T> = {
    value: T
}

export default function SignInClient({ session }: any) {



    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError("")

        try {
            const result = await signIn("credentials", {
                email: formData.email,
                password: formData.password,
                redirect: false,
            })

            if (result?.error) {
                setError("Informations d'identification non valides")
            } else {
                const newSession = await getSession()

                if (newSession?.user?.role) {
                    const hashMotDePasse = await bcrypt.hash(newSession.user.role, 10)

                    const role = newSession.user.role

                    function modifierPointeur(p: Pointeur<string>, role: string) {
                        if (role === "teacher") {
                            p.value = "t"
                        } else if (role === "student") {
                            p.value = "s"
                        } else if (role === "admin") {
                            p.value = "a"
                        }
                    }

                    const p: Pointeur<string> = { value: "" }
                    modifierPointeur(p, role)

                    router.push(`/dashboard/${p.value}?${hashMotDePasse}${newSession.user.id}=${newSession.user.email}`)
                    router.refresh()
                } else {
                    setError("Impossible de récupérer le rôle utilisateur")
                }
            }
        } catch (error) {
            setError("Erreur de connexion")
        } finally {
            setLoading(false)
        }
    }

    const handleSocialSignIn = (provider: string) => {
        signIn(provider, { callbackUrl: `/dashboard` })

        //signIn(provider, { callbackUrl: `/dashboard/${session?.user?.role}` })
    }

    async function continuerDash() {
        const newSession = await getSession()
        if (newSession?.user?.role) {
            const hashMotDePasse = await bcrypt.hash(newSession.user.role, 10)

            const role = newSession.user.role

            function modifierPointeur(p: Pointeur<string>, role: string) {
                if (role === "teacher") {
                    p.value = "t"
                } else if (role === "student") {
                    p.value = "s"
                } else if (role === "admin") {
                    p.value = "a"
                }
            }

            const p: Pointeur<string> = { value: "" }
            modifierPointeur(p, role)

            router.push(`/dashboard/${p.value}?${hashMotDePasse}${newSession.user.id}=${newSession.user.email}`)
            router.refresh()
        }
    }


    return (
        <div>
            {session ? (
                <div className="w-screen outfit  bg-[url(/images/bg-continue.png)] bg-cover bg-no-repeat  h-screen">
                    <div className="w-screen h-screen bg-[#000000b7] flex items-center justify-center">
                        <div className="w-[90%] space-y-9 flex flex-col justify-center items-center md:w-96 bg-gray-50 p-6 py-8 rounded-lg">
                            <div className="flex w-fit text-2xl gap-0.5 qualyneue items-center">
                                <p>falar</p>
                                <Image
                                    src={images.LogoFalarohy}
                                    width={200}
                                    height={200}
                                    className="w-7 h-7"
                                    alt={"LogoFalarohy"} />
                                <p>hy</p>
                            </div>
                            <Image src={session.user?.image ? session.user.image : icons.userdefault} width={160} height={160} alt={"authimage"} className="rounded-full border border-green-400" />
                            <div className="text-center space-y-3">
                                <p>{session.user?.name} / <span className="text-green-700">{session.user?.role}</span></p>
                                <p>{session.user?.email}</p>
                            </div>
                            <button
                                onClick={continuerDash}
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                            >
                                Continuer en tant que {session.user?.name}
                            </button>
                            <div className="hover:bg-gray-100 w-full p-2 flex justify-center items-center rounded">
                                <SignOutButton />
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="min-h-screen outfit font-inter flex flex-wrap items-center justify-between bg-gray-50">
                    <div className="lg:w-1/3 w-full px-8 space-y-3">
                        <div className="flex w-fit text-2xl gap-0.5 qualyneue items-center">
                            <p>falar</p>
                            <Image
                                src={images.LogoFalarohy}
                                width={200}
                                height={200}
                                className="w-7 h-7"
                                alt={"LogoFalarohy"} />
                            <p>hy</p>
                        </div>
                        <div>
                            <h2 className=" text-strat text-3xl font-extrabold text-gray-900">
                                Se connecter
                            </h2>
                        </div>
                        <div className="text-start">
                            <Link href="/auth/signup" className="text-gray-600 text-sm hover:text-gray-500">
                                Vous n'avez pas de compte ? <span className="underline text-black">S'inscrire</span>
                            </Link>
                        </div>
                        <form className="mt-3 space-y-6" onSubmit={handleSubmit}>
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                        Email
                                    </label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="votre adresse email"
                                        required
                                        className="mt-1 block w-full px-3 py-1.5 placeholder:text-sm border border-gray-300 rounded  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    />
                                </div>
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
                                        className="mt-1 block w-full px-3 py-1.5 placeholder:text-sm border border-gray-300 rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                                >
                                    {loading ? "Connexion..." : "Se connecter"}
                                </button>
                            </div>

                            <div className="space-y-5">
                                <div className="relative">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-gray-300" />
                                    </div>
                                    <div className="relative flex justify-center text-sm">
                                        <span className="px-2 bg-gray-50 text-gray-500">Ou continuez avec</span>
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => handleSocialSignIn("google")}
                                    className="w-full flex gap-2 justify-center py-2 px-4 border border-gray-300 rounded shadow text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                                >
                                    <Image
                                        src={icons.googleIcon}
                                        alt={"googleIcon"}
                                        height={20}
                                        width={20} />
                                    Google
                                </button>

                                <button
                                    type="button"
                                    onClick={() => handleSocialSignIn("github")}
                                    className="w-full flex gap-2 justify-center py-2 px-4 border border-gray-300 rounded shadow text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                                >
                                    <Image
                                        src={icons.githubIcon}
                                        alt={"githubIcon"}
                                        height={20}
                                        width={20} />
                                    GitHub
                                </button>
                            </div>
                        </form>
                        <div className='text-[12px] mt-7'>
                            En continuant, vous acceptez les <Link target="_blank" href={'/privacy/conditions-utilisation'} className='text-blue-700 underline'>conditions d'utilisation</Link> de Falarohy et avez lu <Link target="_blank" href={'/privacy/politique-de-confidentialite'} className='text-blue-700 underline'>la politique de confidentialité</Link> de Falarohy
                        </div>
                        <div className="hidden">
                            {error && (
                                toast(<div className="text-red-600 outfit text-sm text-center">{error} &#129402; &#129402; &#129402;</div>)
                            )}
                        </div>
                    </div>
                    <div className="h-screen bg-orange-500 hidden lg:flex justify-end w-2/3">

                    </div>
                </div>
            )}
        </div>
    )
}
