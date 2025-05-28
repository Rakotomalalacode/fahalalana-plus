import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { SignOutButton } from "@/components/sign-out-button"

export default async function Dashboard() {
  const session = await getServerSession()

  if (!session) {
    redirect("/auth/signin")
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Dashboard
            </h1>
            <div className="mb-6">
              <p className="text-gray-600">
                Bienvenido, {session.user?.name || session.user?.email}!
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Email: {session.user?.email}
              </p>
            </div>
            <SignOutButton />
          </div>
        </div>
      </div>
    </div>
  )
}