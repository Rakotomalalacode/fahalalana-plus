import { useSidebar } from "@/components/context/SidebarContext"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Icon } from "@tabler/icons-react"
import { useSession } from "next-auth/react"

export function NavMain(
  {
  items,
}: {
  items: {
    title: string
    key: string
    icon?: Icon
  }[]
}
) {
  const { setCurrentMenu } = useSidebar()
  const { data: session } = useSession()

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-2">
            {session?.user?.name} / {session?.user?.role} dans Falarohy
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                tooltip={item.title}
                onClick={() => setCurrentMenu(item.key)}
              >
                {item.icon && <item.icon />}
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}


// "use client"

// import {
//   SidebarGroup,
//   SidebarGroupContent,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
// } from "@/components/ui/sidebar"
// import { Icon } from "@tabler/icons-react"
// import { useSession } from "next-auth/react"
// import Link from "next/link"

// export function NavMain({
//   items,
// }: {
//   items: {
//     title: string
//     url: string
//     icon?: Icon
//   }[]
// }) {
//   const { data: session, status } = useSession()
//   return (
//     <SidebarGroup>
//       <SidebarGroupContent className="flex flex-col gap-2">
//         <SidebarMenu>
//           <SidebarMenuItem className="flex items-center gap-2">

//             Usernam / {session?.user?.role} dans Falarohy
//           </SidebarMenuItem>
//         </SidebarMenu>
//         <SidebarMenu>
//           {items.map((item) => (
//             <SidebarMenuItem key={item.title}>
//               <Link href={item.url}>
//               <SidebarMenuButton tooltip={item.title}>
//                 {item.icon && <item.icon />}
//                 <span>{item.title}</span>
//               </SidebarMenuButton>
//               </Link>
//             </SidebarMenuItem>
//           ))}
//         </SidebarMenu>
//       </SidebarGroupContent>
//     </SidebarGroup>
//   )
// }
