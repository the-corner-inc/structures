import { Link } from "@tanstack/react-router"
import { useTheme } from "next-themes"
import { Moon, Printer, Sun, X } from "lucide-react"
import { useState, useEffect } from "react"

export function Navbar() {
    const { theme, setTheme } = useTheme()
    const [isPrintMode, setIsPrintMode] = useState(false)
    const [mounted, setMounted] = useState(false)

    // useEffect only runs on the client, so now we can safely show the UI
    useEffect(() => {
        setMounted(true)
    }, [])

    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark")
    }

    const togglePrintMode = () => {
        if (!isPrintMode) {
            // Trigger print
            window.print()
        }
        setIsPrintMode(!isPrintMode)
    }

    // Avoid hydration mismatch by not rendering theme-dependent UI on server
    if (!mounted) {
        return (
            <nav className="w-full border-b border-[#d8dee4] px-4 py-2 shadow-sm dark:border-[#21262d]">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex w-full flex-col items-center gap-2 sm:flex-row sm:gap-8">
                        <Link to="/" className="flex items-center">
                            <img
                                src="/the_corner-logo.webp"
                                alt="The Corner Logo"
                                className="h-10 w-auto min-w-[40px] dark:invert"
                            />
                        </Link>
                        <div className="mt-2 flex items-center gap-2 sm:mt-0 sm:gap-4">
                            <Link to="/folders" className="px-2 py-1 transition-colors">
                                Folders
                            </Link>
                            <Link to="/issues" className="px-2 py-1 transition-colors">
                                Issues
                            </Link>
                        </div>
                    </div>
                    <div className="flex w-full items-center gap-4 sm:w-auto">
                        <div className="h-10 w-10" />
                        <div className="h-10 w-10" />
                        <div className="h-10 w-10" />
                    </div>
                </div>
            </nav>
        )
    }

    return (
        <nav className="w-full border-b border-[#d8dee4] px-4 py-2 shadow-sm dark:border-[#21262d]">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                {/* Top: Logo and Navigation */}
                <div className="flex w-full flex-col items-center gap-2 sm:flex-row sm:gap-8">
                    <Link to="/" className="flex items-center">
                        <img
                            src="/the_corner-logo.webp"
                            alt="The Corner Logo"
                            className="h-10 w-auto min-w-[40px] dark:invert"
                        />
                    </Link>
                    <div className="mt-2 flex items-center gap-2 sm:mt-0 sm:gap-4">
                        <Link
                            to="/folders"
                            activeProps={{
                                className:
                                    "border-b-2 border-[#0969da] dark:border-[#2f81f7] text-[#24292f] dark:text-[#f0f6fc] font-semibold"
                            }}
                            inactiveProps={{
                                className:
                                    "border-b-2 border-transparent text-[#57606a] dark:text-[#8b949e] hover:text-[#24292f] dark:hover:text-[#f0f6fc]"
                            }}
                            className="px-2 py-1 transition-colors"
                        >
                            Folders
                        </Link>
                        <Link
                            to="/issues"
                            activeProps={{
                                className:
                                    "border-b-2 border-[#0969da] dark:border-[#2f81f7] text-[#24292f] dark:text-[#f0f6fc] font-semibold"
                            }}
                            inactiveProps={{
                                className:
                                    "border-b-2 border-transparent text-[#57606a] dark:text-[#8b949e] hover:text-[#24292f] dark:hover:text-[#f0f6fc]"
                            }}
                            className="px-2 py-1 transition-colors"
                        >
                            Issues
                        </Link>
                    </div>
                </div>

                <div className="flex w-full items-center gap-4 sm:w-auto">
                    <button
                        type="button"
                        className="inline-flex h-10 w-10 items-center justify-center rounded-md hover:bg-accent"
                        aria-label="Print page"
                        onClick={togglePrintMode}
                    >
                        {!isPrintMode ? (
                            <Printer className="h-5 w-5" />
                        ) : (
                            <X className="h-5 w-5" />
                        )}
                    </button>

                    <button
                        type="button"
                        onClick={toggleTheme}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-md hover:bg-accent"
                        aria-label="Toggle color scheme"
                    >
                        {theme === "dark" ? (
                            <Sun className="h-5 w-5" />
                        ) : (
                            <Moon className="h-5 w-5" />
                        )}
                    </button>

                    <a
                        href="https://github.com/the-corner-inc/structures"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-10 w-10 items-center justify-center rounded-md hover:bg-accent"
                        aria-label="View on GitHub"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="h-5 w-5"
                        >
                            <path
                                fillRule="evenodd"
                                d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.157-1.11-1.465-1.11-1.465-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.339-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.847-2.337 4.695-4.566 4.944.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.744 0 .267.18.577.688.48C19.138 20.2 22 16.447 22 12.021 22 6.484 17.523 2 12 2Z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </a>
                </div>
            </div>
        </nav>
    )
}
