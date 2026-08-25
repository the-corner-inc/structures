import { SiGithub } from "@icons-pack/react-simple-icons";
import { Link } from "@tanstack/react-router";
import { MoonIcon, PresentationIcon, SunIcon, XIcon } from "lucide-react";
import { createContext, use, useEffect, useState } from "react";

import { useTheme } from "#/components/theme-provider.tsx";

const PresentationContext = createContext(false);

export function AppShell({ children }: { children: React.ReactNode }) {
  const [presentationMode, setPresentationMode] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    if (!presentationMode) return;

    const exitOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setPresentationMode(false);
    };
    window.addEventListener("keydown", exitOnEscape);
    return () => window.removeEventListener("keydown", exitOnEscape);
  }, [presentationMode]);

  return (
    <PresentationContext value={presentationMode}>
      <div className={presentationMode ? "app-shell presentation-mode" : "app-shell"}>
        <header className="topbar">
          <div className="brand-and-nav">
            <Link to="/folders" search={{}} aria-label="Structures home" className="brand-link">
              <img src="/the_corner-logo.webp" alt="The Corner" />
            </Link>
            <nav aria-label="Primary navigation" className="primary-nav">
              <Link
                to="/folders"
                search={{}}
                activeOptions={{ includeSearch: false }}
                activeProps={{ className: "active" }}
              >
                Folders
              </Link>
              <Link
                to="/issues"
                search={{}}
                activeOptions={{ includeSearch: false }}
                activeProps={{ className: "active" }}
              >
                Issues
              </Link>
            </nav>
          </div>

          <div className="topbar-actions">
            <button
              type="button"
              className="icon-button"
              aria-label={presentationMode ? "Exit presentation mode" : "Enter presentation mode"}
              onClick={() => setPresentationMode((current) => !current)}
            >
              {presentationMode ? <XIcon /> : <PresentationIcon />}
            </button>
            <button
              type="button"
              className="icon-button"
              aria-label="Toggle color scheme"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? <SunIcon /> : <MoonIcon />}
            </button>
            <a
              href="https://github.com/the-corner-inc/structures"
              target="_blank"
              rel="noreferrer"
              className="icon-button"
              aria-label="View Structures on GitHub"
            >
              <SiGithub />
            </a>
          </div>
        </header>
        {children}
        {presentationMode && (
          <button
            type="button"
            className="presentation-exit icon-button"
            aria-label="Exit presentation mode"
            onClick={() => setPresentationMode(false)}
          >
            <XIcon />
          </button>
        )}
      </div>
    </PresentationContext>
  );
}

export function usePresentationMode() {
  return use(PresentationContext);
}
