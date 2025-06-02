'use client'

import LogoFalarohy from "@/components/logo"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

export default function ManualRegisterClient() {
  const searchParams = useSearchParams()
  const email = searchParams.get("email")

  return (
    <div className="min-h-screen outfit bg-[url(/images/bg-continue.png)] bg-cover bg-no-repeat">
      <div className="bg-[#000000b7]  w-screen h-screen flex flex-col px-4 items-center justify-center">
      <div className="flex flex-col items-center rounded-lg p-4 py-8 space-y-4 w-[90%] lg:w-96 shadow bg-white">
        <LogoFalarohy />
          <h1 className="text-2xl font-bold">Créer un compte</h1>
          <p className="mt-2 text-center">
            Nous n'avons pas trouvé de compte lié à {email}.
          </p>
        <Link
          href={`/auth/signup?email=${email}`}
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          Continuer l'inscription
        </Link>
      </div>
      </div>
    </div>
  )
}
