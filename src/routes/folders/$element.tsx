import { FoldersSidenav } from "@/components/folders/folders-sidenav"
import { MarkdownViewer } from "@/components/folders/markdown-viewer"
import {
  fetchFolderSettings,
  fetchMarkdownContent,
  filterFolderStructures,
  findElementByName,
  getManifest
} from "@/lib/structures/service"
import type { FolderSettings, FolderStructure } from "@/lib/structures/structures"
import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { useEffect, useState } from "react"

export const Route = createFileRoute("/folders/$element")({
    component: FoldersPage
})

function FoldersPage() {
    const { element } = Route.useParams()
    const navigate = Route.useNavigate()
    const [settings, setSettings] = useState<FolderSettings | null>(null)
    const [selectedElement, setSelectedElement] = useState<FolderStructure | null>(null)
    const [markdownContent, setMarkdownContent] = useState<string | null>(null)
    const [loadingMarkdown, setLoadingMarkdown] = useState(false)
    const [manifest, setManifest] = useState(() => getManifest())
    const [searchQuery, setSearchQuery] = useState("")
    const [currentStructure, setCurrentStructure] = useState<string | null>(null)

    // Determine if this is a structure type (go, angular, user) or a file/folder within a structure
    const availableStructures = ['go', 'angular', 'user']
    const isStructureRoot = availableStructures.includes(element.toLowerCase())

    // Determine settings URL based on element or current structure
    const settingsUrl = isStructureRoot 
        ? `/assets/${element.toLowerCase()}/`
        : currentStructure 
            ? `/assets/${currentStructure}/`
            : "/assets/go/"

    // Load folder settings on mount or when element changes
    useEffect(() => {
        async function loadSettings() {
            const data = await fetchFolderSettings(settingsUrl)
            if (data) {
                setSettings(data)
                if (data.manifestConfig) {
                    setManifest(getManifest(data.manifestConfig))
                }
                // If this is a structure root, set it as current structure
                if (isStructureRoot) {
                    setCurrentStructure(element.toLowerCase())
                }
            }
        }
        loadSettings()
    }, [settingsUrl, element, isStructureRoot])

    // Set selected element based on URL parameter
    useEffect(() => {
        if (settings && element && !isStructureRoot) {
            const foundElement = findElementByName(settings.structures, element)
            setSelectedElement(foundElement)
        } else if (settings && settings.structures.length > 0 && isStructureRoot) {
            // Navigate to first element if viewing structure root
            navigate({
                to: "/folders/$element",
                params: { element: settings.structures[0].name }
            })
        }
    }, [settings, element, navigate, isStructureRoot])

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

    const handleElementClick = (element: FolderStructure) => {
        navigate({
            to: "/folders/$element",
            params: { element: element.name }
        })
    }

    // Filter structures based on search query
    const filteredStructures = settings
        ? filterFolderStructures(settings.structures, searchQuery)
        : []

    return (
        <div className="flex h-[calc(100vh-4rem)]">
            {/* Sidenav */}
            <aside className="w-80 overflow-y-auto border-r">
                <FoldersSidenav
                    structures={filteredStructures}
                    manifest={manifest}
                    selectedElement={selectedElement}
                    onElementClick={handleElementClick}
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                />
            </aside>

            {/* Main content */}
            <main className="flex-1 overflow-y-auto">
                <div className="container mx-auto p-6">
                    <MarkdownViewer content={markdownContent} loading={loadingMarkdown} />
                </div>
            </main>
        </div>
    )
}
