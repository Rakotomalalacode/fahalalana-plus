"use client"

import { useSidebar } from "@/components/context/SidebarContext"
import Rapports from "../rapports/rapports"
import DashboardPage from "./DashboardPage"
import CoursPage from "./CoursPage"
import FormationsPage from "./FormationsPage"
import DettailCours from "./DettailCours"
import CoursView from "./CoursView"
import ChatPage from "../chat/ChatPage"
import AnalyticsPage from "./AnalyticsPage"

export function ContentManu() {
  const { currentMenu, selectedCours } = useSidebar()
const views: Record<string, React.ReactNode> = {
  dashboard: <DashboardPage />,
  listcours: <CoursView />,
  cours:  selectedCours ? ( <CoursPage coursCible={selectedCours} /> ) : ( <p className="p-4 text-red-500">Aucun cours sélectionné.</p> ),
  formations: <FormationsPage />,
  analytics: <AnalyticsPage />,
  rapports: <Rapports />,
  dettailcours: selectedCours ? ( <DettailCours coursCible={selectedCours} /> ) : ( <p className="p-4 text-red-500">Aucun cours sélectionné.</p> ),
  chat: <ChatPage />
}

return views[currentMenu] ?? <DashboardPage />

}


