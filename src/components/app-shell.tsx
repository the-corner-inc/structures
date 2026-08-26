import { SiGithub } from "@icons-pack/react-simple-icons";
import { Link } from "@tanstack/react-router";
import {
  MoonIcon,
  PanelTopCloseIcon,
  PanelTopOpenIcon,
  PresentationIcon,
  SunIcon,
  XIcon,
} from "lucide-react";
import { createContext, use, useEffect, useState } from "react";

import { useTheme } from "#/components/theme-provider.tsx";

const PresentationContext = createContext(false);

export function AppShell({ children }: { children: React.ReactNode }) {
  const [presentationMode, setPresentationMode] = useState(false);
  const [presentationFrameHidden, setPresentationFrameHidden] = useState(false);
  const { theme, setTheme } = useTheme();

  const exitPresentationMode = () => {
    setPresentationMode(false);
    setPresentationFrameHidden(false);
  };

  useEffect(() => {
    if (!presentationMode) return;

    const exitOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setPresentationMode(false);
        setPresentationFrameHidden(false);
      }
    };
    window.addEventListener("keydown", exitOnEscape);
    return () => window.removeEventListener("keydown", exitOnEscape);
  }, [presentationMode]);

  return (
    <PresentationContext value={presentationMode}>
      <div
        className={`app-shell${presentationMode ? " presentation-mode" : ""}${presentationFrameHidden ? " presentation-frame-hidden" : ""}`}
      >
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
              onClick={() => {
                if (presentationMode) {
                  exitPresentationMode();
                } else {
                  setPresentationMode(true);
                }
              }}
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
          <div className="presentation-controls" aria-label="Presentation controls">
            <button
              type="button"
              className="presentation-control icon-button"
              aria-label={
                presentationFrameHidden
                  ? "Show explorer header and footer"
                  : "Hide explorer header and footer"
              }
              aria-pressed={presentationFrameHidden}
              title={presentationFrameHidden ? "Show header and footer" : "Hide header and footer"}
              onClick={() => setPresentationFrameHidden((hidden) => !hidden)}
            >
              {presentationFrameHidden ? <PanelTopOpenIcon /> : <PanelTopCloseIcon />}
            </button>
            <button
              type="button"
              className="presentation-control icon-button"
              aria-label="Exit presentation mode"
              title="Exit presentation mode"
              onClick={exitPresentationMode}
            >
              <XIcon />
            </button>
          </div>
        )}
      </div>
    </PresentationContext>
  );
}

export function usePresentationMode() {
  return use(PresentationContext);
}
