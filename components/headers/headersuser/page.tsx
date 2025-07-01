import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import NavebarTowclient from "./NavebarTowclient"

export default async function NavbarTow() {
  const session = await getServerSession(authOptions)

  return <NavebarTowclient session={session} />
}
