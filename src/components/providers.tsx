import { ThemeProvider } from "next-themes"
import type React from "react"

/**
 * Application Providers
 * 
 * Wraps the app with necessary context providers:
 * - ThemeProvider: Manages dark/light theme with next-themes
 * 
 * Add more providers here as needed (e.g., QueryClientProvider for React Query)
 */
export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
        </ThemeProvider>
    )
}
