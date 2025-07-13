import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"

import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { SidebarProviderCustom } from "../../../components/context/SidebarContext"
import { ContentManu } from "../../../components/teacher/contentManu"


export default async function Page() {
  return (
    <SidebarProviderCustom>
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
              <div className="flex flex-col gap-4 p-4 md:gap-6 md:p-6">
                <ContentManu />
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </SidebarProviderCustom>
  )
}