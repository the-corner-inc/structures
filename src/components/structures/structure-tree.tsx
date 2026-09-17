"use client";

import { ChevronRightIcon, FileIcon, FolderIcon, FolderOpenIcon } from "lucide-react";
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type ReactNode,
} from "react";

import { nodeId, type StructureNode } from "./structure-data";

import "./structure-explorer.css";

export type RenderStructureIcon = (
  node: StructureNode,
  state: { expanded: boolean; selected: boolean },
) => ReactNode;

export interface StructureTreeProps {
  items: StructureNode[];
  selectedId?: string | null;
  onSelect: (node: StructureNode) => void;
  renderIcon?: RenderStructureIcon;
  forceExpand?: boolean;
  selectOnHover?: boolean;
  className?: string;
  label?: string;
}

export function StructureTree({
  items,
  selectedId,
  onSelect,
  renderIcon,
  forceExpand = false,
  selectOnHover = false,
  className = "",
  label = "Structure contents",
}: StructureTreeProps) {
  const [collapsed, setCollapsed] = useState<Set<string>>(() => new Set());
  const [focusedId, setFocusedId] = useState<string | null>(null);
  const root = useRef<HTMLDivElement>(null);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => clearTimeout(hoverTimer.current), []);
  function cancelHover() {
    clearTimeout(hoverTimer.current);
  }
  const expanded = (id: string) => forceExpand || !collapsed.has(id);
  const visible: Array<{ node: StructureNode; parent?: string }> = [];
  function visit(nodes: StructureNode[], parent?: string) {
    for (const node of nodes) {
      visible.push({ node, parent });
      if (expanded(nodeId(node))) visit(node.children ?? [], nodeId(node));
    }
  }
  visit(items);
  const ids = visible.map(({ node }) => nodeId(node));
  const tabId =
    focusedId && ids.includes(focusedId)
      ? focusedId
      : selectedId && ids.includes(selectedId)
        ? selectedId
        : ids[0];

  function focus(id?: string) {
    if (!id) return;
    setFocusedId(id);
    // Compare IDs directly: consumer-provided punctuation is not a CSS selector.
    const element = Array.from(
      root.current?.querySelectorAll<HTMLElement>("[role=treeitem]") ?? [],
    ).find((item) => item.dataset.structureId === id);
    element?.focus();
  }
  function toggle(id: string, open: boolean) {
    setCollapsed((current) => {
      const next = new Set(current);
      if (open) next.delete(id);
      else next.add(id);
      return next;
    });
  }
  function keyDown(event: KeyboardEvent, node: StructureNode) {
    event.stopPropagation();
    const id = nodeId(node);
    const index = ids.indexOf(id);
    const hasChildren = Boolean(node.children?.length);
    switch (event.key) {
      case "ArrowDown":
        focus(ids[Math.min(index + 1, ids.length - 1)]);
        break;
      case "ArrowUp":
        focus(ids[Math.max(index - 1, 0)]);
        break;
      case "Home":
        focus(ids[0]);
        break;
      case "End":
        focus(ids.at(-1));
        break;
      case "ArrowRight":
        if (hasChildren && !expanded(id)) toggle(id, true);
        else if (hasChildren) focus(nodeId(node.children![0]));
        break;
      case "ArrowLeft":
        if (hasChildren && expanded(id) && !forceExpand) toggle(id, false);
        else focus(visible[index]?.parent);
        break;
      case "Enter":
      case " ":
        onSelect(node);
        break;
      case "*":
        setCollapsed(new Set());
        break;
      default: {
        if (event.key.length !== 1 || event.ctrlKey || event.metaKey || event.altKey) return;
        const ordered = [...visible.slice(index + 1), ...visible.slice(0, index + 1)];
        const match = ordered.find(({ node: candidate }) =>
          candidate.name.toLowerCase().startsWith(event.key.toLowerCase()),
        );
        if (match) focus(nodeId(match.node));
      }
    }
    event.preventDefault();
  }
  function render(nodes: StructureNode[], depth = 0): ReactNode {
    return nodes.map((node) => {
      const id = nodeId(node);
      const open = expanded(id);
      const selected = selectedId === id;
      const hasChildren = Boolean(node.children?.length);
      const Icon = node.type === "file" ? FileIcon : open ? FolderOpenIcon : FolderIcon;
      return (
        <div
          key={id}
          role="treeitem"
          aria-label={node.name}
          aria-selected={selected}
          aria-expanded={hasChildren ? open : undefined}
          aria-level={depth + 1}
          data-structure-id={id}
          tabIndex={tabId === id ? 0 : -1}
          onFocus={(event) => {
            if (event.target === event.currentTarget) setFocusedId(id);
          }}
          onKeyDown={(event) => keyDown(event, node)}
          onClick={(event) => {
            event.stopPropagation();
            cancelHover();
            focus(id);
            if (hasChildren && !forceExpand) toggle(id, !open);
            onSelect(node);
          }}
        >
          <div
            className={`tree-row${selected ? " selected" : ""}`}
            style={{ paddingInlineStart: `${10 + depth * 17}px` }}
            onMouseEnter={
              selectOnHover
                ? () => {
                    cancelHover();
                    hoverTimer.current = setTimeout(() => onSelect(node), 120);
                  }
                : undefined
            }
            onMouseLeave={cancelHover}
          >
            <ChevronRightIcon
              aria-hidden="true"
              className={`chevron${hasChildren ? (open ? " expanded" : "") : " hidden"}`}
            />
            {renderIcon ? (
              renderIcon(node, { expanded: open, selected })
            ) : (
              <Icon className="tree-kind-icon" aria-hidden="true" />
            )}
            <span>{node.name}</span>
          </div>
          {hasChildren && (
            <div
              role="group"
              className="tree-children"
              hidden={!open}
              style={{ "--tree-guide-offset": `${17 + depth * 17}px` } as CSSProperties}
            >
              {render(node.children!, depth + 1)}
            </div>
          )}
        </div>
      );
    });
  }
  return (
    <div ref={root} className={`structures-tree ${className}`} role="tree" aria-label={label}>
      {render(items)}
    </div>
  );
}
