import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"

import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { SidebarProviderCustom } from "../../../components/teacher/SidebarContext"
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




// import { AppSidebar } from "@/components/app-sidebar"
// import { SiteHeader } from "@/components/site-header"
// import { getServerSession } from "next-auth"
// import { authOptions } from "@/lib/auth"
// import {
//   SidebarInset,
//   SidebarProvider,
// } from "@/components/ui/sidebar"


// export default async function Page() {
//   const session = await getServerSession(authOptions)
//   return (
//     <SidebarProvider
//       style={
//         {
//           "--sidebar-width": "calc(var(--spacing) * 72)",
//           "--header-height": "calc(var(--spacing) * 12)",
//         } as React.CSSProperties
//       }
//       className="outfit"
//     >
//       <AppSidebar variant="inset" className="sticky" />
//       <SidebarInset>
//         <SiteHeader />
//         <div className="flex flex-1 flex-col">
//           <div className="@container/main flex flex-1 flex-col gap-2">
//             <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
//               ETO ZAREO {session?.user.name}
//             </div>
//           </div>
//         </div>
//       </SidebarInset>
//     </SidebarProvider>
//   )
// }


// // import { getServerSession } from "next-auth"
// // import { SignOutButton } from "@/components/sign-out-button"
// // import { authOptions } from "@/lib/auth"

// // export default async function Page() {
// //   const session = await getServerSession(authOptions)
// //    return (
// //       <div className="min-h-screen bg-gray-50 py-12">
// //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //           <div className="bg-white overflow-hidden shadow rounded-lg">
// //             <div className="px-4 py-5 sm:p-6">
// //               <h1 className="text-3xl font-bold text-gray-900 mb-4">
// //                 Dashboard
// //               </h1>
// //               <div className="mb-6">
// //                 <p className="text-gray-600">
// //                   Bienvenido, {session?.user?.name || session?.user?.email}!
// //                 </p>
// //                 <p className="text-sm text-gray-500 mt-1">
// //                   Email: {session?.user?.email}
// //                 </p>
// //                 <p className="text-sm text-gray-500 mt-1">
// //                   Email: {session?.user.role}
// //                 </p>
// //               </div>
// //               <SignOutButton />
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     )
// //   }