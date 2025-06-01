"use client"

import {
  IconChartBar,
  IconDashboard,
  IconFileWord,
  IconFolder,
  IconHelp,
  IconReport,
  IconSearch,
  IconUsers,
} from "@tabler/icons-react"

export const Data = {
  navMain: [
    {
      title: "Dashboard",
      url: "t/dash",
      icon: IconDashboard,
    },
    // {
    //   title: "Lifecycle",
    //   url: "#",
    //   icon: IconListDetails,
    // },
    {
      title: "Analytics",
      url: "#",
      icon: IconChartBar,
    },
    {
      title: "Cours",
      url: "#",
      icon: IconFolder,
    },
    {
      title: "Équipe",
      url: "#",
      icon: IconUsers,
    },
  ],
  navSecondary: [
    // {
    //   title: "Paramètres",
    //   url: "#",
    //   icon: IconSettings,
    // },
    {
      title: "Obtenir de l'aide",
      url: "#",
      icon: IconHelp,
    },
    {
      title: "Recherche",
      url: "#",
      icon: IconSearch,
    },
  ],
  documents: [
    // {
    //   name: "Data Library",
    //   url: "#",
    //   icon: IconDatabase,
    // },
    {
      name: "Rapports",
      url: "#",
      icon: IconReport,
    },
    {
      name: "Assistant de mots",
      url: "#",
      icon: IconFileWord,
    },
  ],
}