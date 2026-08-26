import { ChevronRightIcon } from "lucide-react";
import type { Manifest, ManifestConfig } from "material-icon-theme";
import { useEffect, useMemo, useRef, useState } from "react";

import { createMaterialIconManifest, materialIconUrl } from "#/lib/material-icons.ts";
import type { ExplorerKind, FolderStructure } from "#/lib/structures.ts";

interface StructureTreeProps {
  items: FolderStructure[];
  kind: ExplorerKind;
  manifestConfig?: ManifestConfig;
  selectedElement?: string;
  onSelect: (element: string) => void;
}

export function StructureTree({
  items,
  kind,
  manifestConfig,
  selectedElement,
  onSelect,
}: StructureTreeProps) {
  const iconManifest = useMemo(() => createMaterialIconManifest(manifestConfig), [manifestConfig]);

  return (
    <div className="structure-tree" role="tree" aria-label="Structure contents">
      {items.map((item) => (
        <TreeNode
          key={`${item.type}:${item.name}`}
          item={item}
          kind={kind}
          iconManifest={iconManifest}
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
  iconManifest,
  selectedElement,
  onSelect,
  depth,
}: {
  item: FolderStructure;
  kind: ExplorerKind;
  iconManifest: Manifest;
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
        <TreeItemIcon item={item} kind={kind} expanded={expanded} manifest={iconManifest} />
        <span>{item.name}</span>
      </button>
      {hasChildren && (
        <div role="group" hidden={!expanded}>
          {item.children?.map((child) => (
            <TreeNode
              key={`${child.type}:${child.name}`}
              item={child}
              kind={kind}
              iconManifest={iconManifest}
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
  manifest,
}: {
  item: FolderStructure;
  kind: ExplorerKind;
  expanded: boolean;
  manifest: Manifest;
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
  return (
    <img
      src={materialIconUrl(manifest, item.name, item.type, expanded)}
      alt=""
      className="tree-kind-icon material-icon"
      aria-hidden="true"
    />
  );
}
