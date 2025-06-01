"use client"

import Analytics from "./Analytics"
import CoursList from "./CoursList"
import Dashboard from "./Dashboard"
import Equipe from "./Equipe"
import { useSidebar } from "./SidebarContext"

export function ContentManu() {
  const { currentMenu } = useSidebar()

const views: Record<string, React.ReactNode> = {
  dashboard: <Dashboard />,
  cours: <CoursList />,
  equipe: <Equipe />,
  analytics: <Analytics />
}

return views[currentMenu] ?? <Dashboard  />

}


