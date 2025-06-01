"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { images } from "@/constants/images"
import { toast } from "sonner"

export default function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    if (formData.password !== formData.confirmPassword) {
      setError("Les mots de passe ne correspondent pas")
      setLoading(false)
      return
    }

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      })

      if (res.ok) {
        router.push("/auth/signin?message=Cuenta creada exitosamente")
      } else {
        const data = await res.json()
        setError(data.message || "Erreur lors de la création du compte")
      }
    } catch (error) {
      setError("Erreur de connexion")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="h-screen outfit flex flex-wrap items-center justify-between bg-gray-50">
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
            Créer un compte
          </h2>
        </div>
        <div className="text-start">
          <Link href="/auth/signin" className="text-gray-600 text-sm hover:text-gray-500">
            Vous avez déjà un compte ?  <span className="underline text-black">Se connecter</span>
          </Link>
        </div>
        <form className="mt-3 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Nom et prénom
              </label>
              <input
                id="name"
                name="name"
                placeholder="votre nom et prrenom"
                type="text"
                required
                className="mt-1 block w-full px-3 py-1.5 placeholder:text-sm border border-gray-300 rounded  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
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
                className="mt-1 block w-full px-3 py-1.5 placeholder:text-sm border border-gray-300 rounded  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirmez le mot de passe
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="confirmez votre mot de passe"
                required
                className="mt-1 block w-full px-3 py-1.5 placeholder:text-sm border border-gray-300 rounded  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {loading ? "Création de compte..." : "Créer un compte"}
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
      <div className="bg-orange-500 h-screen  hidden lg:block w-2/3">

      </div>
    </div>
  )
}