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
  IconRobotFace,
  IconSquarePlus,
} from "@tabler/icons-react"

export const DataAdimn = {
  navMain: [
    {
      title: "Dashboard",
      key: "dashboard",
      url: "t/dash",
      icon: IconDashboard,
    },
    {
      title: "Analytics",
      key: "analytics",
      icon: IconChartBar,
    },
    {
      title: "Autres",
      key: "cours",
      icon: IconSquarePlus,
    },
    // {
    //   title: "Équipe",
    //   key: "equipe",
    //   icon: IconUsers,
    // },
  ],
  navSecondary: [
    {
      title: "Obtenir de l'aide",
      url: "/obtenir-de-l-aide",
      icon: IconHelp,
    },
  ],
  documents: [
    {
      name: "Rapports",
      url: "#",
      icon: IconReport,
      key: "rapports",
    },
    {
      name: "Assistant de mots",
      url: "#",
      icon: IconRobotFace,
      key: "chat",
    },
  ],
}


export const Data = {
  navMain: [
    {
      title: "Dashboard",
      key: "dashboard",
      url: "t/dash",
      icon: IconDashboard,
    },
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
    // {
    //   title: "Équipe",
    //   key: "equipe",
    //   icon: IconUsers,
    // },
  ],
  navSecondary: [
    {
      title: "Obtenir de l'aide",
      url: "/obtenir-de-l-aide",
      icon: IconHelp,
    },
  ],
  documents: [
    {
      name: "Rapports",
      url: "#",
      icon: IconReport,
      key: "rapports",
    },
    {
      name: "Assistant de mots",
      url: "#",
      icon: IconRobotFace,
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
    {
      title: "Obtenir de l'aide",
      url: "/obtenir-de-l-aide",
      icon: IconHelp,
    },
  ],
  documents: [
    {
      name: "Rapports",
      url: "#",
      icon: IconReport,
      key: "rapports",
    },
    {
      name: "Assistant de mots",
      url: "#",
      icon: IconRobotFace,
      key: "chat",
    },
  ],
}