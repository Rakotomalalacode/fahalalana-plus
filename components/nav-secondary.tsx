"use client"

import * as React from "react"
import { IconBrightnessHalf, IconLogout, IconSearch, type Icon } from "@tabler/icons-react"

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { SignOutButton } from "./sign-out-button"
import SearchDash from "./search/SearchDash"
import ThemeSelector from "./autres/ThemeSelector"

export function NavSecondary({
  items,
  ...props
}: {
  items: {
    title: string
    url: string
    icon: Icon
  }[]
} & React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent>
        <SidebarGroupLabel>Paramètres</SidebarGroupLabel>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <a href={item.url}
                target="_blank"
                >
                  <item.icon />
                  <span>{item.title}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
          <SidebarMenuItem >
            <SidebarMenuButton>
              <IconLogout />
              <SignOutButton />
            </SidebarMenuButton>
          </SidebarMenuItem >
          <SidebarMenuItem >
            <SidebarMenuButton>
              <IconSearch />
              <SearchDash />
            </SidebarMenuButton>
          </SidebarMenuItem >
          <SidebarMenuItem >
            <SidebarMenuButton>
              <IconBrightnessHalf />
              <ThemeSelector />
            </SidebarMenuButton>
          </SidebarMenuItem >
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
