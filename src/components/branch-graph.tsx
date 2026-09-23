import {
  BranchUserApi,
  GitgraphOptions,
  GitgraphUserApi,
  MergeStyle,
  TemplateName,
  templateExtend,
} from "@gitgraph/core";
import { Gitgraph } from "@gitgraph/react";
import { useMemo } from "react";

import type { BranchFlow, BranchKind } from "../lib/branches";

const TRACK_KINDS = new Set<BranchKind>(["trunk", "integration"]);

const COMMITS_PER_BRANCH = 3;

/**
 * Number of commits placed on each branch while replaying the abstract
 * branch model as a git history.
 */
export const DEFAULT_COMMITS_PER_BRANCH = COMMITS_PER_BRANCH;

/**
 * Replay a `BranchFlow` (branches + merge edges) as a concrete git history
 * using the gitgraph user API. Every branch becomes a living line with a few
 * commits, and every edge becomes a merge of the source branch into the target
 * branch, producing the classic branching diagram.
 *
 * Idempotent: starts by clearing the graph, so it is safe to run more than
 * once on the same graph instance (e.g. under React StrictMode).
 */
export function buildBranchGraph<TNode>(gitgraph: GitgraphUserApi<TNode>, flow: BranchFlow): void {
  gitgraph.clear();

  const byId = new Map(flow.branches.map((node) => [node.id, node]));
  const outgoing: Record<string, string[]> = {};
  for (const edge of flow.edges) {
    outgoing[edge.from] = outgoing[edge.from] || [];
    outgoing[edge.from].push(edge.to);
  }

  const firstTrunkId =
    flow.branches.find((node) => node.kind === "trunk")?.id ?? flow.branches[0]?.id;

  const branchApis = new Map<string, BranchUserApi<TNode>>();

  /**
   * Branch a node's line derives from. Trunk branches (and the first
   * integration branch) spring from the initial timeline; shorter-lived
   * branches spring from the branch they are ultimately merged into.
   */
  function baseOf(id: string): string | null {
    const kind = byId.get(id)?.kind;
    if (kind === "trunk") return id === firstTrunkId ? null : firstTrunkId;
    if (kind === "integration") return firstTrunkId;
    const targets = outgoing[id];
    if (targets && targets.length > 0) return targets[0];
    return firstTrunkId ?? null;
  }

  function branchName(id: string): string {
    return byId.get(id)?.label || id;
  }

  /**
   * Commit style: the branch color as the dot fill, plus the ring as a shade
   * of that same color. `light-dark()` + `color-mix()` keep it monochrome to
   * the branch while picking an appropriate shade for each theme.
   */
  function commitStyleFor(id: string): {
    color?: string;
    dot?: { color?: string; strokeColor?: string };
  } {
    const color = byId.get(id)?.color;
    if (!color) return {};
    return {
      color,
      dot: {
        // Pin the dot fill to the branch color. Otherwise gitgraph falls back
        // to its per-column palette color, which can differ from the branch
        // (e.g. blue dots on a green `main`).
        color,
        strokeColor: `light-dark(color-mix(in srgb, ${color} 55%, white), color-mix(in srgb, ${color} 65%, black))`,
      },
    };
  }

  /**
   * Branch style: the branch color plus a label rendered in shades of that
   * same color — a tinted background and a matching border derived with modern
   * CSS `color-mix()`/`light-dark()`, never a theme-neutral hue. The label text
   * falls back to the branch color itself.
   */
  function branchStyleFor(id: string) {
    const color = byId.get(id)?.color;
    if (!color) return {};
    return {
      color,
      label: {
        bgColor: `light-dark(color-mix(in srgb, ${color} 14%, white), color-mix(in srgb, ${color} 26%, black))`,
        strokeColor: `light-dark(color-mix(in srgb, ${color} 80%, white), color-mix(in srgb, ${color} 68%, black))`,
      },
    };
  }

  function createBranch(id: string): BranchUserApi<TNode> {
    const base = baseOf(id);
    const color = byId.get(id)?.color;
    const api = gitgraph.branch({
      name: branchName(id),
      from: base ? branchApis.get(base) : undefined,
      style: branchStyleFor(id),
      commitDefaultOptions: {
        style: {
          // Merge commits carry no per-commit style, so pin them to the branch
          // color here; otherwise they'd fall back to the per-column palette.
          ...(color ? { color, dot: { color } } : {}),
          message: { display: false },
        },
      },
    });
    branchApis.set(id, api);
    return api;
  }

  // Create every branch (and its commits) in an order where bases come before
  // their dependents, so `from` is always available.
  const created = new Set<string>();
  while (created.size < flow.branches.length) {
    let progressed = false;
    for (const node of flow.branches) {
      if (created.has(node.id)) continue;
      const base = baseOf(node.id);
      if (base && !created.has(base)) continue;

      const api = createBranch(node.id);
      for (let i = 1; i <= COMMITS_PER_BRANCH; i++) {
        api.commit({
          subject: `${branchName(node.id)} ${i}`,
          style: commitStyleFor(node.id),
        });
      }
      created.add(node.id);
      progressed = true;
    }
    if (!progressed) break; // safety: avoid an infinite loop on a cyclic model
  }

  // Apply merges from the model's edges (`target` receives `source`).
  for (const edge of flow.edges) {
    const source = branchApis.get(edge.from);
    const target = branchApis.get(edge.to);
    if (source && target) target.merge(source);
  }
}

/** Stable identity for a flow, used as a React key so the graph rebuilds. */
export function branchFlowSignature(flow: BranchFlow): string {
  const nodes = flow.branches
    .map((node) => `${node.id}:${node.kind}:${node.label ?? ""}:${node.color ?? ""}`)
    .sort()
    .join("|");
  const edges = flow.edges
    .map((edge) => `${edge.from}>${edge.to}`)
    .sort()
    .join("|");
  return `${flow.libraryName ?? ""}#${nodes}#${edges}`;
}

/**
 * Render an abstract `BranchFlow` as a git graph using the vendored
 * `@gitgraph/react` library.
 */
export function BranchGraph({ flow }: { flow: BranchFlow }) {
  const options = useMemo<GitgraphOptions>(() => {
    let counter = 0;
    return {
      // Vertical is gitgraph's default orientation (oldest commit at the top).
      generateCommitHash: () => `commit-${++counter}`,
      // A modern, GitHub-shaped theme. Text, labels, dots and borders are tied
      // to the app's Primer CSS variables, so the graph adapts to light/dark.
      template: templateExtend(TemplateName.Metro, {
        colors: ["#0969da", "#1a7f37", "#8250df", "#cf222e", "#bf8700", "#57606a"],
        branch: {
          lineWidth: 2,
          spacing: 26,
          mergeStyle: MergeStyle.Bezier,
          label: {
            display: true,
            bgColor: "var(--surface-raised)",
            strokeColor: "var(--border)",
            font: "600 12px Inter, system-ui, -apple-system, sans-serif",
            borderRadius: 6,
          },
        },
        commit: {
          spacing: 34,
          dot: {
            size: 5,
            strokeWidth: 2,
            strokeColor: "var(--background)",
            font: "400 10px Inter, system-ui, sans-serif",
          },
          message: {
            display: true,
            color: "var(--foreground)",
            font: "400 13px Inter, system-ui, -apple-system, sans-serif",
          },
        },
        arrow: {
          size: null,
          color: null,
          offset: 2,
        },
      }),
    };
  }, []);

  return (
    <div className="branch-graph">
      <Gitgraph key={branchFlowSignature(flow)} options={options}>
        {(gitgraph) => buildBranchGraph(gitgraph, flow)}
      </Gitgraph>
    </div>
  );
}
