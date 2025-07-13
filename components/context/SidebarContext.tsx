"use client"

import React, { createContext, useContext, useState } from "react"

type SidebarContextType = {
  currentMenu: string
  setCurrentMenu: (menu: string) => void

  selectedCours: string | null
  setSelectedCours: (id: string | null) => void
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined)

export const SidebarProviderCustom = ({ children }: { children: React.ReactNode }) => {
  const [currentMenu, setCurrentMenu] = useState("dashboard") // valeur par défaut
  const [selectedCours, setSelectedCours] = useState<string | null>(null)

  return (
    <SidebarContext.Provider value={{ currentMenu, setCurrentMenu, selectedCours, setSelectedCours }}>
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