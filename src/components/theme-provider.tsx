import { ScriptOnce } from "@tanstack/react-router";
import { createContext, use, useEffect, useState } from "react";

type Theme = "dark" | "light" | "system";

const ThemeContext = createContext({
  theme: "system" as Theme,
  setTheme: (_theme: Theme) => {},
});

function getThemeScript() {
  return `(function(){try{var t=localStorage.getItem('structures-theme')||'system';var d=matchMedia('(prefers-color-scheme: dark)').matches;var r=t==='system'?(d?'dark':'light'):t;document.documentElement.classList.add(r);document.documentElement.style.colorScheme=r}catch(e){}})();`;
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.remove("light", "dark");
  const resolved =
    theme === "system"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      : theme;
  root.classList.add(resolved);
  root.style.colorScheme = resolved;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("system");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("structures-theme");
    // The client reads persisted preference after the hydration-safe system default.
    // oxlint-disable-next-line react/set-state-in-effect
    setThemeState(stored === "light" || stored === "dark" ? stored : "system");
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) applyTheme(theme);
  }, [mounted, theme]);

  const setTheme = (nextTheme: Theme) => {
    localStorage.setItem("structures-theme", nextTheme);
    setThemeState(nextTheme);
  };

  return (
    <ThemeContext value={{ theme, setTheme }}>
      <ScriptOnce>{getThemeScript()}</ScriptOnce>
      {children}
    </ThemeContext>
  );
}

export function useTheme() {
  return use(ThemeContext);
}
