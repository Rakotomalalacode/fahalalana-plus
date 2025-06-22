"use client"

import Analytics from "./Analytics"
import CoursPages from "./CoursPages"
import Dashboard from "./Dashboard"
import Equipe from "./Equipe"
import { useSidebar } from "../context/SidebarContext"
import Rapports from "../rapports/rapports"

export function ContentManu() {
  const { currentMenu } = useSidebar()

const views: Record<string, React.ReactNode> = {
  dashboard: <Dashboard />,
  cours: <CoursPages />,
  equipe: <Equipe />,
  analytics: <Analytics />,
  rapports: <Rapports />
}

return views[currentMenu] ?? <Dashboard  />

}


