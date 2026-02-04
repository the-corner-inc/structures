import { Link } from "@tanstack/react-router"
import { ModeToggle } from "./mode-toggle"

/**
 * Header Component
 * 
 * Main navigation header with:
 * - Logo and title
 * - Navigation links
 * - Theme toggle
 */
export function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 items-center">
                <div className="mr-4 flex">
                    <Link to="/" className="mr-6 flex items-center space-x-2">
                        <span className="font-bold text-xl">Structures</span>
                    </Link>
                    <nav className="flex items-center space-x-6 text-sm font-medium">
                        <Link
                            to="/"
                            className="transition-colors hover:text-foreground/80"
                            activeProps={{ className: "text-foreground" }}
                            inactiveProps={{ className: "text-foreground/60" }}
                        >
                            Folders
                        </Link>
                    </nav>
                </div>
                <div className="flex flex-1 items-center justify-end space-x-2">
                    <nav className="flex items-center">
                        <ModeToggle />
                    </nav>
                </div>
            </div>
        </header>
    )
}
