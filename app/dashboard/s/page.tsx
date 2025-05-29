import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"


export default async function Page() {
  const session = await getServerSession(authOptions)
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
      className="outfit"
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              ETO ZAREO {session?.user.name}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
