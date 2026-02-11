import type { FolderStructure } from "@/lib/structures/structures"
import { cn } from "@/lib/utils"
import { ChevronRight } from "lucide-react"
import { useState } from "react"

interface IssuesSidenavProps {
    structures: FolderStructure[]
    selectedElement: FolderStructure | null
    onElementClick: (element: FolderStructure) => void
    searchQuery: string
    onSearchChange: (query: string) => void
}

export function IssuesSidenav({
    structures,
    selectedElement,
    onElementClick,
    searchQuery,
    onSearchChange
}: IssuesSidenavProps) {
    const [selectedCategory, setSelectedCategory] = useState<FolderStructure | null>(
        structures.length > 0 ? structures[0] : null
    )

    return (
        <div className="flex h-full flex-col">
            {/* Header with search */}
            <div className="border-b p-4">
                <p className="mb-4 text-sm text-muted-foreground">Issues</p>
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
