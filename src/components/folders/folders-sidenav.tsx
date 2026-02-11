import { getIconName } from "@/lib/structures/icon-utils"
import type { FolderStructure } from "@/lib/structures/structures"
import { cn } from "@/lib/utils"
import { ChevronRight, Settings, X, Download, ChevronLeft, ChevronRightIcon } from "lucide-react"
import { useState } from "react"

interface FoldersSidenavProps {
    structures: FolderStructure[]
    manifest: any
    selectedElement: FolderStructure | null
    onElementClick: (element: FolderStructure) => void
    searchQuery: string
    onSearchChange: (query: string) => void
    gistUrl?: string
    onGistUrlChange?: (url: string) => void
}

export function FoldersSidenav({
    structures,
    manifest,
    selectedElement,
    onElementClick,
    searchQuery,
    onSearchChange,
    gistUrl = "",
    onGistUrlChange
}: FoldersSidenavProps) {
    const [showSettings, setShowSettings] = useState(false)
    const [isMinified, setIsMinified] = useState(false)
    
    // Icon base URL from material-icon-theme
    const iconBaseUrl =
        "https://raw.githubusercontent.com/material-extensions/vscode-material-icon-theme/main/icons/"

    const downloadSettings = () => {
        const dataStr =
            "data:text/json;charset=utf-8," +
            encodeURIComponent(JSON.stringify(structures, null, 2))
        const downloadAnchorNode = document.createElement("a")
        downloadAnchorNode.setAttribute("href", dataStr)
        downloadAnchorNode.setAttribute("download", "folder-settings.json")
        document.body.appendChild(downloadAnchorNode)
        downloadAnchorNode.click()
        downloadAnchorNode.remove()
    }

    if (isMinified) {
        return (
            <div className="flex h-full w-12 flex-col items-center border-r py-4">
                <button
                    type="button"
                    onClick={() => setIsMinified(false)}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-md hover:bg-accent"
                    aria-label="Expand sidebar"
                >
                    <ChevronRightIcon className="h-5 w-5" />
                </button>
            </div>
        )
    }

    return (
        <div className="flex h-full flex-col">
            {/* Header with search and settings */}
            <div className="border-b p-4">
                <div className="mb-4 flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">Explorer</p>
                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={() => setShowSettings(!showSettings)}
                            className="inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-accent"
                            aria-label="Settings"
                        >
                            {!showSettings ? (
                                <Settings className="h-4 w-4" />
                            ) : (
                                <X className="h-4 w-4" />
                            )}
                        </button>
                        <button
                            type="button"
                            onClick={() => setIsMinified(true)}
                            className="inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-accent"
                            aria-label="Minimize sidebar"
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </button>
                    </div>
                </div>

                {showSettings && (
                    <div className="mb-4 space-y-3 rounded-md border bg-muted/50 p-3">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-sm font-semibold">Explorer Settings</h3>
                                <p className="text-xs text-muted-foreground">Gist URL</p>
                            </div>
                            <button
                                onClick={downloadSettings}
                                aria-label="Download Settings"
                                className="inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-accent"
                            >
                                <Download className="h-4 w-4" />
                            </button>
                        </div>

                        <div className="relative">
                            <input
                                type="text"
                                placeholder="folder structure URL"
                                value={gistUrl}
                                onChange={(e) => onGistUrlChange?.(e.target.value)}
                                className="w-full rounded-md border bg-background px-3 py-2 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                            />
                            <Settings className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        </div>
                    </div>
                )}

                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="w-full rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                </div>
            </div>

            {/* Folder list */}
            <div className="flex-1 overflow-y-auto p-2">
                {structures.map((item) => (
                    <FolderItem
                        key={item.name}
                        item={item}
                        manifest={manifest}
                        iconBaseUrl={iconBaseUrl}
                        selectedElement={selectedElement}
                        onElementClick={onElementClick}
                        level={0}
                    />
                ))}
            </div>
        </div>
    )
}

interface FolderItemProps {
    item: FolderStructure
    manifest: any
    iconBaseUrl: string
    selectedElement: FolderStructure | null
    onElementClick: (element: FolderStructure) => void
    level: number
}

function FolderItem({
    item,
    manifest,
    iconBaseUrl,
    selectedElement,
    onElementClick,
    level
}: FolderItemProps) {
    const [expanded, setExpanded] = useState(false)
    const hasChildren = item.children && item.children.length > 0
    const isSelected = selectedElement?.name === item.name

    const handleClick = () => {
        if (hasChildren) {
            setExpanded(!expanded)
        }
        onElementClick(item)
    }

    const iconName = getIconName(item.name, item.type, expanded, manifest)
    const iconUrl = iconBaseUrl + iconName

    return (
        <div>
            <button
                type="button"
                onClick={handleClick}
                className={cn(
                    "flex w-full items-center gap-1 rounded px-2 py-1 text-sm transition-colors hover:bg-accent",
                    isSelected && "bg-accent"
                )}
                style={{ paddingLeft: `${level * 12 + 8}px` }}
            >
                {item.type === "folder" && (
                    <ChevronRight
                        className={cn(
                            "h-4 w-4 flex-shrink-0 transition-transform",
                            expanded && "rotate-90"
                        )}
                    />
                )}
                {item.type !== "folder" && <span className="w-4" />}
                <img src={iconUrl} alt={`${item.name} icon`} className="h-4 w-4 flex-shrink-0" />
                <span className="truncate">{item.name}</span>
            </button>

            {hasChildren && expanded && (
                <div>
                    {item.children!.map((child) => (
                        <FolderItem
                            key={child.name}
                            item={child}
                            manifest={manifest}
                            iconBaseUrl={iconBaseUrl}
                            selectedElement={selectedElement}
                            onElementClick={onElementClick}
                            level={level + 1}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}
