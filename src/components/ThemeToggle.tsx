import { MoonStar, SunMedium } from "lucide-react";
import { useEffect, useState } from "react";

import { THEME_STORAGE_KEY } from "@/lib/explorer";
import type { ThemeMode } from "@/lib/types";

const THEME_CHANGE_EVENT = "nasa-theme-change";

function applyTheme(mode: ThemeMode) {
  document.documentElement.dataset.theme = mode;
  document.documentElement.style.colorScheme = mode;
  window.localStorage.setItem(THEME_STORAGE_KEY, mode);
  window.dispatchEvent(new CustomEvent(THEME_CHANGE_EVENT, { detail: { mode } }));
}

export function ThemeToggle() {
  const [mode, setMode] = useState<ThemeMode>("dark");

  useEffect(() => {
    const current = document.documentElement.dataset.theme;
    if (current === "light" || current === "dark") {
      setMode(current);
    }

    const handleThemeChange = (event: Event) => {
      const nextMode = (event as CustomEvent<{ mode?: ThemeMode }>).detail?.mode;
      if (nextMode === "light" || nextMode === "dark") {
        setMode(nextMode);
      }
    };

    window.addEventListener(THEME_CHANGE_EVENT, handleThemeChange as EventListener);
    return () => window.removeEventListener(THEME_CHANGE_EVENT, handleThemeChange as EventListener);
  }, []);

  return (
    <button
      type="button"
      className="icon-button"
      aria-label={`Switch to ${mode === "dark" ? "light" : "dark"} mode`}
      title={`Switch to ${mode === "dark" ? "light" : "dark"} mode`}
      onClick={() => {
        const nextMode: ThemeMode = mode === "dark" ? "light" : "dark";
        setMode(nextMode);
        applyTheme(nextMode);
      }}
    >
      <span className="sr-only">Theme toggle</span>
      <SunMedium className={`h-4 w-4 transition-all duration-300 ${mode === "light" ? "scale-100 opacity-100" : "scale-0 opacity-0"}`} />
      <MoonStar className={`absolute h-4 w-4 transition-all duration-300 ${mode === "dark" ? "scale-100 opacity-100" : "scale-0 opacity-0"}`} />
    </button>
  );
}
