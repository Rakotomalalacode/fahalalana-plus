import { useEffect, useState } from "react";

export function useTheme() {
  const [theme, setTheme] = useState<"light" | "dark" | "system">("system");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | "system" | null;
    const initialTheme = savedTheme || "light";
    setTheme(initialTheme);
    applyTheme(initialTheme);

    // Écoute le changement de préférence système si le thème est "system"
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const systemChangeHandler = (e: MediaQueryListEvent) => {
      if (localStorage.getItem("theme") === "system") {
        applyTheme("system");
      }
    };

    mediaQuery.addEventListener("change", systemChangeHandler);

    return () => {
      mediaQuery.removeEventListener("change", systemChangeHandler);
    };
  }, []);

  const applyTheme = (t: "light" | "dark" | "system") => {
    const root = window.document.documentElement;

    if (t === "dark") {
      root.classList.add("dark");
    } else if (t === "light") {
      root.classList.remove("dark");
    } else {
      // system
      const isSystemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      root.classList.toggle("dark", isSystemDark);
    }
  };

  const changeTheme = (t: "light" | "dark" | "system") => {
    localStorage.setItem("theme", t);
    setTheme(t);
    applyTheme(t);
  };

  return { theme, changeTheme };
}