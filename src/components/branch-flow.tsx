"use client";

import { useId, useMemo, type PointerEvent as ReactPointerEvent } from "react";

import type { BranchFlow, BranchNode } from "#/lib/branches.ts";

const NODE_W = 150;
const NODE_H = 44;
const LEVEL_GAP = 96;
const NODE_GAP = 30;
const PAD_X = 40;
const PAD_TOP = 40;
const PAD_BOTTOM = 36;

/** Long-lived branches drawn as full-width horizontal "track" lines. */
const TRACK_KINDS: ReadonlySet<string> = new Set(["trunk", "integration"]);

export interface PlacedNode {
  node: BranchNode;
  level: number;
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface FlowLayout {
  width: number;
  height: number;
  nodes: PlacedNode[];
  edges: Array<{ from: PlacedNode; to: PlacedNode }>;
}

/**
 * Layered graph layout for a branch flow. Edges point from the merge source
 * (above) to the merge target (below). Back-edges that form cycles are broken
 * for ranking only, so bidirectional relationships (e.g. release cut from main
 * plus fixes promoted back) still render cleanly.
 */
export function layoutBranchFlow(flow: BranchFlow): FlowLayout {
  const out = new Map(flow.branches.map((node) => [node.id, [] as string[]]));
  for (const edge of flow.edges) out.get(edge.from)?.push(edge.to);

  // Detect back-edges (an edge to an ancestor in the DFS stack) to make the
  // rest of ranking operate on an acyclic graph.
  const state = new Map<string, number>();
  const backEdges = new Set<string>();
  const visiting = new Set<string>();
  const visit = (u: string) => {
    state.set(u, 1);
    visiting.add(u);
    for (const v of out.get(u) ?? []) {
      if (visiting.has(v)) backEdges.add(`${u}\u0000${v}`);
      else if (state.get(v) !== 2) visit(v);
    }
    visiting.delete(u);
    state.set(u, 2);
  };
  for (const node of flow.branches) if (state.get(node.id) !== 2) visit(node.id);

  // Longest-path layering: a node sits one level below the deepest branch that
  // merges into it. Iterating to a fixed point yields the longest path for DAGs.
  const levels = new Map(flow.branches.map((node) => [node.id, 0]));
  for (let pass = 0; pass < flow.branches.length; pass++) {
    let changed = false;
    for (const edge of flow.edges) {
      if (backEdges.has(`${edge.from}\u0000${edge.to}`)) continue;
      const fromLevel = levels.get(edge.from) ?? 0;
      const toLevel = levels.get(edge.to) ?? 0;
      if (toLevel <= fromLevel) {
        levels.set(edge.to, fromLevel + 1);
        changed = true;
      }
    }
    if (!changed) break;
  }

  const levelOrder: string[][] = [];
  for (const node of flow.branches) {
    const level = levels.get(node.id) ?? 0;
    levelOrder[level] ??= [];
    if (!levelOrder[level].includes(node.id)) levelOrder[level].push(node.id);
  }

  // Barycenter ordering: order nodes in each level by the average horizontal
  // position of the branches that merge into them (from the level above).
  const column = new Map<string, number>();
  for (let level = 0; level < levelOrder.length; level++) {
    const ids = levelOrder[level];
    const ranked = level === 0 ? [...ids] : [...ids].sort((a, b) => barycenter(a) - barycenter(b));
    ranked.forEach((id, index) => column.set(id, index));
    levelOrder[level] = ranked;
  }

  function barycenter(id: string): number {
    const sources = flow.edges
      .filter((edge) => edge.to === id && column.has(edge.from))
      .map((edge) => column.get(edge.from)!);
    if (!sources.length) return Number.POSITIVE_INFINITY;
    return sources.reduce((sum, value) => sum + value, 0) / sources.length;
  }

  const maxLevel = levelOrder.length - 1;
  const maxColumns = Math.max(...levelOrder.map((ids) => ids.length), 1);
  const width = Math.max(maxColumns * NODE_W + (maxColumns - 1) * NODE_GAP + PAD_X * 2, 480);
  const height = (maxLevel + 1) * NODE_H + maxLevel * LEVEL_GAP + PAD_TOP + PAD_BOTTOM;
  const levelY = (level: number) => PAD_TOP + level * (NODE_H + LEVEL_GAP);

  const nodes: PlacedNode[] = flow.branches.map((node) => {
    const level = levels.get(node.id) ?? 0;
    const index = column.get(node.id) ?? 0;
    const levelWidth =
      (levelOrder[level]?.length ?? 1) * NODE_W + ((levelOrder[level]?.length ?? 1) - 1) * NODE_GAP;
    const x = (width - levelWidth) / 2 + index * (NODE_W + NODE_GAP);
    return { node, level, x, y: levelY(level), w: NODE_W, h: NODE_H };
  });

  const placed = new Map(nodes.map((placedNode) => [placedNode.node.id, placedNode]));
  const edges = flow.edges
    .filter((edge) => placed.has(edge.from) && placed.has(edge.to))
    .map((edge) => ({ from: placed.get(edge.from)!, to: placed.get(edge.to)! }));

  return { width, height, nodes, edges };
}

/**
 * Connection y for an edge. Every branch is rendered as a line, so both ends
 * of an edge attach to the line's center height.
 */
function connectionY(node: PlacedNode): number {
  return node.y + node.h / 2;
}

function edgePath(from: PlacedNode, to: PlacedNode): string {
  const x1 = from.x + from.w / 2;
  const y1 = connectionY(from);
  const x2 = to.x + to.w / 2;
  const y2 = connectionY(to);
  const mid = (y1 + y2) / 2;
  return `M ${x1} ${y1} C ${x1} ${mid}, ${x2} ${mid}, ${x2} ${y2}`;
}

export function BranchFlow({
  flow,
  selectedId,
  highlightedId,
  onHover,
  onSelect,
}: {
  flow: BranchFlow;
  selectedId?: string;
  highlightedId?: string | null;
  onHover: (id: string | null) => void;
  onSelect: (id: string) => void;
}) {
  const titleId = useId();
  const layout = useMemo(() => layoutBranchFlow(flow), [flow]);

  return (
    <svg
      className="branch-flow-svg"
      viewBox={`0 0 ${layout.width} ${layout.height}`}
      role="group"
      aria-labelledby={titleId}
      onPointerLeave={() => onHover(null)}
    >
      <title id={titleId}>{flow.libraryName} branch flow</title>
      <defs>
        <marker
          id="bf-arrow"
          viewBox="0 0 10 10"
          refX="9"
          refY="5"
          markerWidth="7"
          markerHeight="7"
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" fill="context-stroke" />
        </marker>
      </defs>
      {layout.edges.map(({ from, to }, index) => {
        const active = highlightedId === from.node.id || highlightedId === to.node.id;
        return (
          <path
            key={`${from.node.id}-${to.node.id}-${index}`}
            d={edgePath(from, to)}
            className={`branch-flow-edge${active ? " active" : ""}`}
            markerEnd="url(#bf-arrow)"
          />
        );
      })}
      {layout.nodes.map(({ node, x, y, w, h }) => {
        const selected = node.id === selectedId;
        const highlighted = node.id === highlightedId;
        const label = node.label || node.id;
        const isTrack = TRACK_KINDS.has(node.kind);
        const cy = y + h / 2;
        const cls = `branch-node${selected ? " selected" : ""}${highlighted ? " highlighted" : ""}`;
        const handlers = {
          onPointerEnter: (event: ReactPointerEvent<SVGGElement>) => {
            event.stopPropagation();
            onHover(node.id);
          },
          onFocus: () => onHover(node.id),
          onBlur: () => onHover(null),
        };
        const lineX1 = isTrack ? PAD_X : x - w / 2;
        const lineX2 = isTrack ? layout.width - PAD_X : x + w / 2;
        const span = lineX2 - lineX1;
        const dots = [0.28, 0.52, 0.76];
        const firstDotX = lineX1 + span * dots[0];
        const lastDotX = lineX1 + span * dots[dots.length - 1];
        // Track labels sit to the left of their first commit; short-lived
        // branch labels sit to the right of their last commit.
        const labelX = isTrack ? firstDotX - 12 : lastDotX + 12;
        const labelAnchor: "end" | "start" = isTrack ? "end" : "start";
        return (
          <g
            key={node.id}
            className={cls}
            aria-label={label}
            role="button"
            tabIndex={0}
            onClick={() => onSelect(node.id)}
            {...handlers}
          >
            <line className="branch-line" x1={lineX1} y1={cy} x2={lineX2} y2={cy} />
            <rect className="branch-hit" x={lineX1} y={y} width={span} height={h} rx={8} />
            {dots.map((t, index) => (
              <circle
                key={index}
                className="branch-commit"
                cx={lineX1 + span * t}
                cy={cy}
                r={3.5}
              />
            ))}
            <text
              className="branch-label"
              x={labelX}
              y={cy}
              dominantBaseline="central"
              textAnchor={labelAnchor}
            >
              {label}
            </text>
          </g>
        );
      })}
      <g className="branch-axis" aria-hidden="true">
        <line
          x1={PAD_X}
          y1={layout.height - 14}
          x2={layout.width - PAD_X}
          y2={layout.height - 14}
        />
        {[0.25, 0.5, 0.75].map((t) => (
          <line
            key={t}
            x1={PAD_X + (layout.width - PAD_X * 2) * t}
            y1={layout.height - 20}
            x2={PAD_X + (layout.width - PAD_X * 2) * t}
            y2={layout.height - 8}
          />
        ))}
        <text x={PAD_X} y={layout.height - 3}>
          time
        </text>
      </g>
    </svg>
  );
}
