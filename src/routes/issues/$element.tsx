import { MarkdownViewer } from "@/components/folders/markdown-viewer"
import { IssuesSidenav } from "@/components/issues/issues-sidenav"
import {
  fetchFolderSettings,
  fetchMarkdownContent,
  filterFolderStructures,
  findElementByName
} from "@/lib/structures/service"
import type { FolderSettings, FolderStructure } from "@/lib/structures/structures"
import { createFileRoute } from "@tanstack/react-router"
import { useEffect, useState } from "react"

export const Route = createFileRoute("/issues/$element")({
    component: IssuesPage
})

function IssuesPage() {
    const { element } = Route.useParams()
    const navigate = Route.useNavigate()
    const [settings, setSettings] = useState<FolderSettings | null>(null)
    const [selectedElement, setSelectedElement] = useState<FolderStructure | null>(null)
    const [markdownContent, setMarkdownContent] = useState<string | null>(null)
    const [loadingMarkdown, setLoadingMarkdown] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")

    // Settings URL for issues/labels
    const settingsUrl = "/assets/software/"

    // Load folder settings on mount
    useEffect(() => {
        async function loadSettings() {
            const data = await fetchFolderSettings(settingsUrl)
            if (data) {
                setSettings(data)
            }
        }
        loadSettings()
    }, [settingsUrl])

    // Set selected element based on URL parameter
    useEffect(() => {
        if (settings && element) {
            const foundElement = findElementByName(settings.structures, element)
            setSelectedElement(foundElement)
        }
    }, [settings, element])

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
            to: "/issues/$element",
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
                <IssuesSidenav
                    structures={filteredStructures}
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
