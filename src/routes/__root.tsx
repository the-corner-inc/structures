import { TanStackDevtools } from "@tanstack/react-devtools"
import { createRootRoute, HeadContent, Scripts } from "@tanstack/react-router"
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools"
import { Header } from "@/components/header"
import { Providers } from "@/components/providers"
import appCss from "../styles/styles.css?url"
import type React from "react"

export const Route = createRootRoute({
    head: () => ({
        meta: [
            { title: "Structures - Project Organization Visualizer" },
            { charSet: "utf-8" },
            {
                name: "viewport",
                content: "width=device-width, initial-scale=1"
            },
            {
                name: "description",
                content:
                    "Visualize, document, and share project organization standards with an interactive VS Code-like interface"
            }
        ],
        links: [
            {
                rel: "stylesheet",
                href: appCss
            }
        ]
    }),

    shellComponent: RootDocument
})

function RootDocument({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <HeadContent />
            </head>

            <body className="min-h-screen flex flex-col">
                <Providers>
                    <Header />

                    {children}
                </Providers>

                <TanStackDevtools
                    config={{
                        position: "bottom-right"
                    }}
                    plugins={[
                        {
                            name: "Tanstack Router",
                            render: <TanStackRouterDevtoolsPanel />
                        }
                    ]}
                />

                <Scripts />
            </body>
        </html>
    )
}


