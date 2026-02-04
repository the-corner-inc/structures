import { createFileRoute } from "@tanstack/react-router"
import { useState, useEffect } from "react"
import { FoldersSidenav } from "@/components/folders-sidenav"
import { MarkdownViewer } from "@/components/markdown-viewer"
import {
    fetchFolderSettings,
    fetchMarkdownContent,
    findElementByName,
    getManifest
} from "@/lib/structures"
import type { FolderSettings, FolderStructure } from "@/lib/types"

export const Route = createFileRoute("/")({
    component: IndexPage
})

function IndexPage() {
    const [settings, setSettings] = useState<FolderSettings | null>(null)
    const [selectedElement, setSelectedElement] = useState<FolderStructure | null>(null)
    const [markdownContent, setMarkdownContent] = useState<string | null>(null)
    const [loadingMarkdown, setLoadingMarkdown] = useState(false)
    const [manifest, setManifest] = useState(getManifest())

    // Default settings URL - can be made configurable later
    const settingsUrl = "/assets/go/"

    // Load folder settings on mount
    useEffect(() => {
        async function loadSettings() {
            const data = await fetchFolderSettings(settingsUrl)
            if (data) {
                setSettings(data)
                if (data.manifestConfig) {
                    setManifest(getManifest(data.manifestConfig))
                }
            }
        }
        loadSettings()
    }, [settingsUrl])

    // Load markdown content when element is selected
    useEffect(() => {
        async function loadMarkdown() {
            if (!selectedElement) {
                setMarkdownContent(null)
                return
            }

            setLoadingMarkdown(true)
            const content = await fetchMarkdownContent(selectedElement.name, settingsUrl)
            setMarkdownContent(content)
            setLoadingMarkdown(false)
        }
        loadMarkdown()
    }, [selectedElement, settingsUrl])

    const handleElementClick = (name: string) => {
        if (!settings) return

        const element = findElementByName(settings.structures, name)
        setSelectedElement(element)
    }

    return (
        <div className="flex h-[calc(100vh-3.5rem)]">
            {/* Sidenav */}
            <aside className="w-80 border-r overflow-y-auto">
                <FoldersSidenav
                    structures={settings?.structures || []}
                    manifest={manifest}
                    selectedElement={selectedElement}
                    onElementClick={handleElementClick}
                />
            </aside>

            {/* Main content */}
            <main className="flex-1 overflow-y-auto">
                <div className="container mx-auto p-6">
                    {loadingMarkdown && (
                        <div className="flex items-center justify-center h-64">
                            <p className="text-muted-foreground">Loading...</p>
                        </div>
                    )}
                    {!loadingMarkdown && markdownContent && (
                        <MarkdownViewer content={markdownContent} />
                    )}
                    {!loadingMarkdown && !markdownContent && selectedElement && (
                        <div className="flex items-center justify-center h-64">
                            <p className="text-muted-foreground">
                                No documentation available for {selectedElement.name}
                            </p>
                        </div>
                    )}
                    {!selectedElement && (
                        <div className="flex items-center justify-center h-64">
                            <p className="text-muted-foreground">
                                Select a file or folder to view its documentation
                            </p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    )
}
