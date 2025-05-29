import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import Timedays from "./sidebar/Timedays"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function SiteHeader() {
    const session = await getServerSession(authOptions)
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height) font-montserrat">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base flex gap-2 font-medium"><Timedays /> {session?.user.name} <span>!</span></h1>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="ghost" asChild size="sm" className="hidden sm:flex">
            <p className="text-green-700 hover:text-green-600">
              {session?.user.role}
            </p>
          </Button>
        </div>
      </div>
    </header>
  )
}
