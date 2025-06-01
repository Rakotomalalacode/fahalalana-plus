"use client"

import * as React from "react"

import { NavDocuments } from "@/components/nav-documents"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useSession } from "next-auth/react"
import { images } from "@/constants/images"
import  {Data}  from "@/constants/dashMenu"
import { user } from "@/types/user"
import { Icons } from "@/constants/icons"
import Image from "next/image"


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

const { data: session, status } = useSession()

 const userInfo: user = {
    name: `${session?.user?.name}`,
    email: `${session?.user?.email}`,
    role: `${session?.user?.role}`,
    avatar: `${session?.user?.image ? session?.user?.image : Icons.userdefault } `,
  }

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="hover:bg-transparent"
            >
              <div className="flex w-fit text-3xl! gap-0.5 qualyneue items-center">
                <p>falar</p>
                <Image
                  src={images.LogoFalarohy}
                  width={200}
                  height={200}
                  className="w-7 h-7"
                  alt={"LogoFalarohy"} />
                <p>hy</p>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {
          session?.user?.role === "teacher" ? (
            <div>
              <NavMain items={Data.navMain} />
              <NavDocuments items={Data.documents} />
              <NavSecondary items={Data.navSecondary} className="mt-auto" />
            </div>
          ) : (
            session?.user?.role
          )
        }
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userInfo} />
      </SidebarFooter>
    </Sidebar>
  )
}
