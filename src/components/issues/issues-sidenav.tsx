import type { FolderStructure } from "@/lib/structures/structures"
import { cn } from "@/lib/utils"
import { ChevronRight, Settings, X, Download, ChevronLeft, ChevronRightIcon } from "lucide-react"
import { useState } from "react"

interface IssuesSidenavProps {
    structures: FolderStructure[]
    selectedElement: FolderStructure | null
    onElementClick: (element: FolderStructure) => void
    searchQuery: string
    onSearchChange: (query: string) => void
    gistUrl?: string
    onGistUrlChange?: (url: string) => void
}

export function IssuesSidenav({
    structures,
    selectedElement,
    onElementClick,
    searchQuery,
    onSearchChange,
    gistUrl = "",
    onGistUrlChange
}: IssuesSidenavProps) {
    const [selectedCategory, setSelectedCategory] = useState<FolderStructure | null>(
        structures.length > 0 ? structures[0] : null
    )
    const [showSettings, setShowSettings] = useState(false)
    const [isMinified, setIsMinified] = useState(false)

    const downloadSettings = () => {
        const dataStr =
            "data:text/json;charset=utf-8," +
            encodeURIComponent(JSON.stringify(structures, null, 2))
        const downloadAnchorNode = document.createElement("a")
        downloadAnchorNode.setAttribute("href", dataStr)
        downloadAnchorNode.setAttribute("download", "issue-settings.json")
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
                    <p className="text-sm text-muted-foreground">Issues</p>
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
                                <h3 className="text-sm font-semibold">Issues Settings</h3>
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
                                placeholder="issue labels URL"
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

            {/* Main Categories */}
            <div className="border-b p-2">
                {structures.map((item) => (
                    <button
                        key={item.name}
                        type="button"
                        onClick={() => setSelectedCategory(item)}
                        className={cn(
                            "w-full rounded px-3 py-2 text-left text-sm transition-colors hover:bg-accent",
                            selectedCategory?.name === item.name && "bg-accent font-semibold"
                        )}
                    >
                        {item.name}
                    </button>
                ))}
            </div>

            {/* Labels List */}
            <div className="flex-1 overflow-y-auto p-2">
                {selectedCategory?.children?.map((item) => (
                    <LabelItem
                        key={item.name}
                        item={item}
                        selectedElement={selectedElement}
                        onElementClick={onElementClick}
                        level={0}
                    />
                ))}
            </div>
        </div>
    )
}

interface LabelItemProps {
    item: FolderStructure
    selectedElement: FolderStructure | null
    onElementClick: (element: FolderStructure) => void
    level: number
}

function LabelItem({ item, selectedElement, onElementClick, level }: LabelItemProps) {
    const [expanded, setExpanded] = useState(false)
    const hasChildren = item.children && item.children.length > 0
    const isSelected = selectedElement?.name === item.name

    const handleClick = () => {
        if (hasChildren) {
            setExpanded(!expanded)
        }
        onElementClick(item)
    }

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

                {/* Color indicator for labels */}
                {item.color && (
                    <div
                        className="h-3 w-3 flex-shrink-0 rounded-full border"
                        style={{
                            backgroundColor: item.bgColor || item.color,
                            borderColor: item.color
                        }}
                    />
                )}

                <span className="truncate">{item.name}</span>
            </button>

            {hasChildren && expanded && (
                <div>
                    {item.children!.map((child) => (
                        <LabelItem
                            key={child.name}
                            item={child}
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
