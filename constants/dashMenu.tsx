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
  IconSchool,
  IconBrandZoom,
} from "@tabler/icons-react"

export const Data = {
  navMain: [
    {
      title: "Dashboard",
      key: "dashboard",
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
      key: "analytics",
      icon: IconChartBar,
    },
    {
      title: "Cours",
      key: "cours",
      icon: IconFolder,
    },
    {
      title: "Équipe",
      key: "equipe",
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
      url: "/obtenir-de-l-aide",
      icon: IconHelp,
    },
    // {
    //   title: "Recherche",
    //   url: "#",
    //   icon: IconSearch,
    // },
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
      key: "rapports",
    },
    {
      name: "Assistant de mots",
      url: "#",
      icon: IconFileWord,
      key: "chat",
    },
  ],
}



export const DataStudent = {
  navMain: [
    {
      title: "Dashboard",
      key: "dashboard",
      url: "t/dash",
      icon: IconDashboard,
    },
    {
      title: "Formations",
      key: "formations",
      icon: IconSchool,
    },
    {
      title: "Analytics",
      key: "analytics",
      icon: IconChartBar,
    },
    {
      title: "Cours",
      key: "listcours",
      icon: IconBrandZoom,
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
      url: "/obtenir-de-l-aide",
      icon: IconHelp,
    },
    // {
    //   title: "Recherche",
    //   url: "#",
    //   icon: IconSearch,
    // },
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
      key: "rapports",
    },
    {
      name: "Assistant de mots",
      url: "#",
      icon: IconFileWord,
      key: "chat",
    },
  ],
}