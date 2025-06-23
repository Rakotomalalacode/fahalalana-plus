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
import { Data, DataStudent } from "@/constants/dashMenu"
import { user } from "@/types/user"
import { Icons } from "@/constants/icons"
import Image from "next/image"
import { Loader2 } from "lucide-react"


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  const { data: session, status } = useSession()

  const userInfo: user = {
    name: `${session?.user?.name}`,
    email: `${session?.user?.email}`,
    role: `${session?.user?.role}`,
    avatar: `${session?.user?.image ? session?.user?.image : Icons.userdefault} `,
  }
  const [loading, setLoading] = React.useState(true)



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

        {(() => {
          if (session?.user?.role === "teacher") {
            return (
              <div>
                <NavMain items={Data.navMain} />
                <NavDocuments items={Data.documents} />
                <NavSecondary items={Data.navSecondary} className="mt-auto" />
              </div>
            );
          }
          else if (session?.user?.role === "student") {
            return (
              <div>
                <NavMain items={DataStudent.navMain} />
                <NavDocuments items={DataStudent.documents} />
                <NavSecondary items={DataStudent.navSecondary} className="mt-auto" />
              </div>
            );

          } if (loading) {
            return (
              <div className="flex h-screen justify-center items-center">
                <div className="animate-spin  flex justify-center items-center rounded-full h-24 w-24">
                  <Image src={images.LogoFalarohy} width={200} height={200} alt={"LogoFalarohy"} />
                </div>
              </div>
            )
          } else {
            return session?.user.role
          }
        })()}
      </SidebarContent>
      <SidebarFooter>
        {session?.user ? (
          <NavUser user={userInfo} />
        ) : (
          <div></div>
        )
        }
      </SidebarFooter>
    </Sidebar>
  )
}
