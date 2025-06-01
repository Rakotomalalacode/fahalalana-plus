// context/SidebarContext.tsx
"use client"

import React, { createContext, useContext, useState } from "react"

type SidebarContextType = {
  currentMenu: string
  setCurrentMenu: (menu: string) => void
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined)

export const SidebarProviderCustom = ({ children }: { children: React.ReactNode }) => {
  const [currentMenu, setCurrentMenu] = useState("dashboard") // valeur par défaut

  return (
    <SidebarContext.Provider value={{ currentMenu, setCurrentMenu }}>
      {children}
    </SidebarContext.Provider>
  )
}

export const useSidebar = () => {
  const context = useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProviderCustom")
  }
  return context
}
