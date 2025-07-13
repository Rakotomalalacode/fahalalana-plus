"use client";

import { useTheme } from "@/hooks/useTheme";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ThemeSelector() {
  const { theme, changeTheme } = useTheme();

  return (
    <div className="font-outfit">
      <Select value={theme} onValueChange={(value) => changeTheme(value as "light" | "dark" | "system")}>
        <SelectTrigger className="p-0 py-0! border-none bg-transparent! w-[160px]">
          <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem className="hover:bg-sidebar-accent! font-outfit" value="light">Clair</SelectItem>
          <SelectItem className="hover:bg-sidebar-accent! font-outfit" value="dark">Sombre</SelectItem>
          <SelectItem className="hover:bg-sidebar-accent! font-outfit" value="system">Système</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
