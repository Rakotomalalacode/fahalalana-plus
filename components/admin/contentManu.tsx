"use client"

import { useSidebar } from "../context/SidebarContext"
import Rapports from "../rapports/rapports"
import ChatPage from "../chat/ChatPage"
import AdminDashboardPage from "./DaboardPage"
import AdminDashboard from "./DaboardPage"
import AnalyticsPage from "./AnalyticsPage"
import AddPages from "./AddPage"



export function ContentManu() {
  const { currentMenu } = useSidebar()

const views: Record<string, React.ReactNode> = {
  dashboard: <AdminDashboard />,
  cours: <AddPages />,
  equipe: "equipe",
 // analytics: <Analytics />,
  rapports: <Rapports />,
  chat: <ChatPage />,
  analytics : <AnalyticsPage />
}

return views[currentMenu] ?? "dashboard"

}


