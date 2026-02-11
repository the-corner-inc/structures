import { getIconName } from "@/lib/structures/icon-utils"
import type { FolderStructure } from "@/lib/structures/structures"
import { cn } from "@/lib/utils"
import { ChevronRight } from "lucide-react"
import { useState } from "react"

interface FoldersSidenavProps {
    structures: FolderStructure[]
    manifest: any
    selectedElement: FolderStructure | null
    onElementClick: (element: FolderStructure) => void
    searchQuery: string
    onSearchChange: (query: string) => void
}

export function FoldersSidenav({
    structures,
    manifest,
    selectedElement,
    onElementClick,
    searchQuery,
    onSearchChange
}: FoldersSidenavProps) {
    // Icon base URL from material-icon-theme
    const iconBaseUrl =
        "https://raw.githubusercontent.com/material-extensions/vscode-material-icon-theme/main/icons/"

    return (
        <div className="flex h-full flex-col">
            {/* Header with search */}
            <div className="border-b p-4">
                <p className="mb-4 text-sm text-muted-foreground">Explorer</p>
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
