// app/auth/signin/page.tsx
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import SignInClient from "./SignInClient"

export default async function SignInPage() {
  const session = await getServerSession(authOptions)

  return <SignInClient session={session} />
}
