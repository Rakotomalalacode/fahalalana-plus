"use client";
import LogoFalarohy from "@/components/logo";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function ManualRegisterPage() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  return (
    <div className="min-h-screen outfit flex flex-col items-center space-y-4 justify-center">
        <LogoFalarohy />
      <h1 className="text-2xl font-bold">Créer un compte</h1>
      <p className="mt-2">Nous n'avons pas trouvé de compte lié à {email}.</p>
      <Link
        href={`/auth/signup?email=${email}`}
        className="group relative w-fit flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
      >
        Continuer l'inscription
      </Link>
    </div>
  );
}
