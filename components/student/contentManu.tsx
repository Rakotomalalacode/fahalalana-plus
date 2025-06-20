"use client"

import { useSidebar } from "@/components/context/SidebarContext"

export function ContentManu() {
  const { currentMenu } = useSidebar()

const views: Record<string, React.ReactNode> = {
  dashboard: <p>page dashboard</p>,
  cours: <p>page cours</p>,
  formations: <p>page Formations</p>,
  analytics: <p>page analytics</p>
}

return views[currentMenu] ?? <p>page dashboard</p>

}


