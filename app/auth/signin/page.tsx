"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { icons } from "@/constants/icons"
import { images } from "@/constants/images"

export default function SignIn() {
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
        router.push("/dashboard/")
        router.refresh()
      }
    } catch (error) {
      setError("Erreur de connexion")
    } finally {
      setLoading(false)
    }
  }

  const handleSocialSignIn = (provider: string) => {
    signIn(provider, { callbackUrl: "/dashboard" })
  }

  return (
    <div className="min-h-screen font-inter flex flex-wrap items-center justify-between bg-gray-50">
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

          {error && (
            <div className="text-red-600 text-sm text-center">{error}</div>
          )}

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
      </div>
      <div className="bg-gray-500 h-screen  hidden lg:block w-2/3">

      </div>
    </div>
  )
}