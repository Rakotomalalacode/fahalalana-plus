"use client"

import CoursPages from "./CoursPages"
import Dashboard from "./Dashboard"
import Equipe from "./Equipe"
import { useSidebar } from "../context/SidebarContext"
import Rapports from "../rapports/rapports"
import AnalyticsPage from "./AnalyticsPage"
import ChatPage from "../chat/ChatPage"



export function ContentManu() {
  const { currentMenu } = useSidebar()

const views: Record<string, React.ReactNode> = {
  dashboard: <Dashboard />,
  cours: <CoursPages />,
  equipe: <Equipe />,
 // analytics: <Analytics />,
  rapports: <Rapports />,
  chat: <ChatPage />,
  analytics : <AnalyticsPage />
}

return views[currentMenu] ?? <Dashboard  />

}


