import {
  ChevronRightIcon,
  FileCode2Icon,
  FileTextIcon,
  FolderIcon,
  FolderOpenIcon,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

import type { ExplorerKind, FolderStructure } from "#/lib/structures.ts";

interface StructureTreeProps {
  items: FolderStructure[];
  kind: ExplorerKind;
  selectedElement?: string;
  onSelect: (element: string) => void;
}

export function StructureTree({ items, kind, selectedElement, onSelect }: StructureTreeProps) {
  return (
    <div className="structure-tree" role="tree" aria-label="Structure contents">
      {items.map((item) => (
        <TreeNode
          key={`${item.type}:${item.name}`}
          item={item}
          kind={kind}
          selectedElement={selectedElement}
          onSelect={onSelect}
          depth={0}
        />
      ))}
    </div>
  );
}

function TreeNode({
  item,
  kind,
  selectedElement,
  onSelect,
  depth,
}: {
  item: FolderStructure;
  kind: ExplorerKind;
  selectedElement?: string;
  onSelect: (element: string) => void;
  depth: number;
}) {
  const [expanded, setExpanded] = useState(true);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const hasChildren = Boolean(item.children?.length);
  const selected = selectedElement?.toLowerCase() === item.name.toLowerCase();

  useEffect(
    () => () => {
      if (hoverTimer.current) clearTimeout(hoverTimer.current);
    },
    [],
  );

  const queueSelection = () => {
    hoverTimer.current = setTimeout(() => onSelect(item.name), 120);
  };

  const cancelSelection = () => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
  };

  const handleClick = () => {
    if (hasChildren) setExpanded((current) => !current);
    onSelect(item.name);
  };

  return (
    <div role="treeitem" aria-expanded={hasChildren ? expanded : undefined}>
      <button
        type="button"
        className={selected ? "tree-row selected" : "tree-row"}
        style={{ paddingInlineStart: `${10 + depth * 17}px` }}
        onClick={handleClick}
        onMouseEnter={queueSelection}
        onMouseLeave={cancelSelection}
      >
        <ChevronRightIcon
          className={hasChildren ? (expanded ? "chevron expanded" : "chevron") : "chevron hidden"}
        />
        <TreeItemIcon item={item} kind={kind} expanded={expanded} />
        <span>{item.name}</span>
      </button>
      {hasChildren && expanded && (
        <div role="group">
          {item.children?.map((child) => (
            <TreeNode
              key={`${child.type}:${child.name}`}
              item={child}
              kind={kind}
              selectedElement={selectedElement}
              onSelect={onSelect}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function TreeItemIcon({
  item,
  kind,
  expanded,
}: {
  item: FolderStructure;
  kind: ExplorerKind;
  expanded: boolean;
}) {
  if (kind === "issues" && item.color) {
    return (
      <span
        className="label-color"
        style={{ color: item.color, backgroundColor: item.bgColor, borderColor: item.color }}
        aria-hidden="true"
      />
    );
  }
  if (item.type === "folder" || item.type === "container") {
    return expanded ? (
      <FolderOpenIcon className="tree-kind-icon folder" />
    ) : (
      <FolderIcon className="tree-kind-icon folder" />
    );
  }
  return item.name.includes(".") ? (
    <FileCode2Icon className="tree-kind-icon file" />
  ) : (
    <FileTextIcon className="tree-kind-icon file" />
  );
}
