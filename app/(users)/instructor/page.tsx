import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import Intructor from "./Instructor"

export default async function SignInPage() {
  const session = await getServerSession(authOptions)

  return <Intructor session={session?.user.role as string} />
}
