"use client"

import { useSidebar } from "@/components/context/SidebarContext"
import Rapports from "../rapports/rapports"

export function ContentManu() {
  const { currentMenu } = useSidebar()

const views: Record<string, React.ReactNode> = {
  dashboard: <p>page dashboard</p>,
  cours: <p>page cours</p>,
  formations: <p>page Formations</p>,
  analytics: <p>page analytics</p>,
  rapports: <Rapports />
}

return views[currentMenu] ?? <p>page dashboard</p>

}


