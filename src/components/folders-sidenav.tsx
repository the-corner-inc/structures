import { useState } from "react"
import { ChevronRight } from "lucide-react"
import type { FolderStructure } from "@/lib/types"
import { cn } from "@/lib/utils"

interface FoldersSidenavProps {
    structures: FolderStructure[]
    manifest: any
    selectedElement: FolderStructure | null
    onElementClick: (name: string) => void
}

export function FoldersSidenav({
    structures,
    manifest,
    selectedElement,
    onElementClick
}: FoldersSidenavProps) {
    const [searchQuery, setSearchQuery] = useState("")

    // Icon base URL from material-icon-theme
    const iconBaseUrl =
        "https://raw.githubusercontent.com/material-extensions/vscode-material-icon-theme/main/icons/"

    const filteredStructures = structures.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <div className="flex flex-col h-full">
            {/* Header with search */}
            <div className="p-4 border-b">
                <p className="text-sm text-muted-foreground mb-4">Explorer</p>
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full px-3 py-2 bg-background border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                </div>
            </div>

            {/* Folder list */}
            <div className="flex-1 overflow-y-auto p-2">
                {filteredStructures.map((item) => (
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
    onElementClick: (name: string) => void
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
        onElementClick(item.name)
    }

    const iconName = getIconName(item.name, item.type, expanded, manifest)
    const iconUrl = iconBaseUrl + iconName

    return (
        <div>
            <button
                type="button"
                onClick={handleClick}
                className={cn(
                    "w-full flex items-center gap-1 px-2 py-1 rounded hover:bg-accent text-sm transition-colors",
                    isSelected && "bg-accent"
                )}
                style={{ paddingLeft: `${level * 12 + 8}px` }}
            >
                {item.type === "folder" && (
                    <ChevronRight
                        className={cn(
                            "w-4 h-4 transition-transform flex-shrink-0",
                            expanded && "rotate-90"
                        )}
                    />
                )}
                {item.type !== "folder" && <span className="w-4" />}
                <img src={iconUrl} alt={`${item.name} icon`} className="w-4 h-4 flex-shrink-0" />
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

/**
 * Get icon name from material-icon-theme manifest
 * Ported from Angular IconNamePipe
 */
function getIconName(
    name: string,
    type: "folder" | "file" | "container",
    expanded: boolean,
    manifest: any
): string {
    if (!name) return type === "folder" ? "folder.svg" : "file.svg"

    let iconKey: string | undefined

    if (type === "folder") {
        const folderName = name.toLowerCase()

        // Expanded folder support
        if (expanded && manifest.folderNamesExpanded) {
            iconKey =
                manifest.folderNamesExpanded[folderName] ||
                manifest.folderNamesExpanded[folderName.replace(/s$/, "")] ||
                manifest.folderNamesExpanded[folderName.replace(/_/g, "")]
        }

        if (!iconKey && manifest.folderNames) {
            iconKey =
                manifest.folderNames[folderName] ||
                manifest.folderNames[folderName.replace(/s$/, "")] ||
                manifest.folderNames[folderName.replace(/_/g, "")]
        }

        if (!iconKey) {
            iconKey = expanded
                ? manifest.folderExpanded ?? "folder-open"
                : manifest.folder ?? "folder"
        }
    } else {
        const fileName = name.toLowerCase()

        // Exact file name match
        iconKey = manifest.fileNames?.[fileName]

        // Compound extension match (e.g. .html.vm)
        if (!iconKey && fileName.includes(".")) {
            const parts = fileName.split(".")

            for (let i = 1; i < parts.length; i++) {
                const ext = parts.slice(i).join(".")
                if (manifest.fileExtensions?.[ext]) {
                    iconKey = manifest.fileExtensions[ext]
                    break
                }
            }
        }

        // Single extension match
        if (!iconKey) {
            const ext = fileName.split(".").pop()
            if (ext && manifest.fileExtensions?.[ext]) {
                iconKey = manifest.fileExtensions[ext]
            }
        }

        // LanguageId match
        if (!iconKey && manifest.languageIds) {
            const ext = fileName.split(".").pop()
            if (ext && manifest.languageIds[ext]) {
                iconKey = manifest.languageIds[ext]
            }
        }

        // Fallback to default file icon
        if (!iconKey) {
            iconKey = manifest.file ?? "file"
        }
    }

    // Get icon file name from iconDefinitions
    const iconDef = manifest.iconDefinitions?.[iconKey]
    if (iconDef?.iconPath) {
        const parts = iconDef.iconPath.split("/")
        return parts[parts.length - 1]
    }

    // Fallback
    return type === "folder" ? (expanded ? "folder-open.svg" : "folder.svg") : "file.svg"
}
