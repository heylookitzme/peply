"use client";

import { useCallback, useSyncExternalStore } from "react";
import { Sun, Moon } from "lucide-react";

function getTheme(): "dark" | "light" {
  if (typeof window === "undefined") return "dark";
  return (localStorage.getItem("theme") as "dark" | "light") ?? "dark";
}

function subscribe(callback: () => void): () => void {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

export function ThemeToggle(): React.ReactElement {
  const theme = useSyncExternalStore(subscribe, getTheme, () => "dark");

  const toggle = useCallback(() => {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
    window.dispatchEvent(new StorageEvent("storage"));
  }, [theme]);

  return (
    <button
      onClick={toggle}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      className="p-2 rounded-md text-text-secondary hover:text-text transition-colors duration-150"
    >
      {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
    </button>
  );
}
