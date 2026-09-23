/**
 * Branch-flow data model.
 *
 * A branching strategy is modeled as a directed graph of `branches` (nodes)
 * and `edges` (merge/dependency relationships), so arbitrary topologies
 * render — not just a fixed trunk backbone. A simple linear "list of
 * branching" degrades naturally to a chain.
 */

export type BranchKind = "trunk" | "integration" | "feature" | "fix" | "release" | "other";

export interface BranchNode {
  /** Stable, URL-safe id. Edges reference nodes by this id. */
  id: string;
  /** Human-readable display label. Defaults to `id` when omitted. */
  label: string;
  /** Groups the branch so the page can render, color and explain it. */
  kind: BranchKind;
  /** Protected branches (main/develop) are typically not deletable. */
  protected?: boolean;
  color?: string;
  description?: string;
}

export interface BranchEdge {
  /** Branch id this change comes from / is merged from. */
  from: string;
  /** Branch id this change lands into / is merged to. */
  to: string;
}

export interface BranchFlow {
  libraryName: string;
  branches: BranchNode[];
  edges: BranchEdge[];
}

const BRANCH_KINDS: readonly BranchKind[] = [
  "trunk",
  "integration",
  "feature",
  "fix",
  "release",
  "other",
];

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isValidId(value: unknown): value is string {
  if (typeof value !== "string") return false;
  const id = value.trim();
  if (!id || id === "." || id === "..") return false;
  if (/[/\\]/.test(id)) return false;
  return !Array.from(id).some((char) => char.charCodeAt(0) < 32);
}

/** Validate branch-flow JSON at the boundary, including URL-safe unique ids. */
export function parseBranchFlow(value: unknown): BranchFlow {
  if (!isRecord(value) || typeof value.libraryName !== "string" || !value.libraryName.trim()) {
    throw new Error("A branch flow must provide a non-empty libraryName.");
  }

  if (!Array.isArray(value.branches)) {
    throw new Error("A branch flow must provide a branches array.");
  }

  if (value.edges !== undefined && !Array.isArray(value.edges)) {
    throw new Error("A branch flow's edges must be an array.");
  }

  const ids = new Set<string>();
  const branches: BranchNode[] = value.branches.map((entry, index): BranchNode => {
    if (!isRecord(entry) || !isValidId(entry.id)) {
      throw new Error(`Branch #${index + 1} needs a URL-safe id.`);
    }
    const id = entry.id.trim();
    const label =
      typeof entry.label === "string" && entry.label.trim()
        ? entry.label.trim()
        : id;
    const kind: unknown = entry.kind;
    if (typeof kind !== "string" || !BRANCH_KINDS.includes(kind as BranchKind)) {
      throw new Error(`Invalid branch kind for ${id}; use one of: ${BRANCH_KINDS.join(", ")}.`);
    }
    if (ids.has(id.toLowerCase())) {
      throw new Error(`Duplicate branch id: ${id}. Supply distinct ids.`);
    }
    ids.add(id.toLowerCase());

    let protectedFlag: boolean | undefined;
    if (entry.protected !== undefined) {
      if (typeof entry.protected !== "boolean") {
        throw new Error(`Invalid protected flag for branch ${id}.`);
      }
      protectedFlag = entry.protected;
    }
    let color: string | undefined;
    if (entry.color !== undefined) {
      if (typeof entry.color !== "string") {
        throw new Error(`Invalid color for branch ${id}.`);
      }
      color = entry.color;
    }
    let description: string | undefined;
    if (entry.description !== undefined) {
      if (typeof entry.description !== "string") {
        throw new Error(`Invalid description for branch ${id}.`);
      }
      description = entry.description;
    }

    return {
      id,
      label,
      kind: kind as BranchKind,
      ...(protectedFlag === undefined ? {} : { protected: protectedFlag }),
      ...(color === undefined ? {} : { color }),
      ...(description === undefined ? {} : { description }),
    };
  });

  const edges: BranchEdge[] = (value.edges ?? []).map((edge, index) => {
    if (!isRecord(edge) || typeof edge.from !== "string" || typeof edge.to !== "string") {
      throw new Error(`Edge #${index + 1} needs string from and to branch ids.`);
    }
    const from = edge.from.trim();
    const to = edge.to.trim();
    if (!from || !to) throw new Error(`Edge #${index + 1} needs non-empty from and to ids.`);
    if (from === to) throw new Error(`Edge #${index + 1} cannot point a branch at itself.`);
    if (!ids.has(from.toLowerCase())) throw new Error(`Edge references unknown branch: ${from}.`);
    if (!ids.has(to.toLowerCase())) throw new Error(`Edge references unknown branch: ${to}.`);
    return { from, to };
  });

  const edgeKeys = new Set<string>();
  for (const edge of edges) {
    const key = `${edge.from.toLowerCase()}->${edge.to.toLowerCase()}`;
    if (edgeKeys.has(key)) throw new Error(`Duplicate edge: ${edge.from} -> ${edge.to}.`);
    edgeKeys.add(key);
  }

  return { libraryName: value.libraryName.trim(), branches, edges };
}

/**
 * Built-in branching strategies shipped as static assets. `dir` maps to
 * `/assets/<dir>/settings.json` and doubles as the library token in URLs.
 */
export const BRANCH_FLOWS: Array<{ name: string; dir: string }> = [
  { name: "Git Flow", dir: "git-flow" },
  { name: "GitHub Flow", dir: "github-flow" },
  { name: "GitLab Flow", dir: "gitlab-flow" },
  { name: "Trunk-Based", dir: "trunk-based" },
  { name: "Trunk-Based with Releases", dir: "trunk-based-release" },
];

export function defaultBranchSource(dir = BRANCH_FLOWS[0].dir) {
  return `/assets/${encodeURIComponent(dir)}/`;
}

export function branchSource(dir: string) {
  return `/assets/${encodeURIComponent(dir)}/`;
}

/** Resolve a source string (local dir, JSON URL, or raw Gist) to a settings document. */
export function branchSettingsUrl(source: string) {
  const trimmed = source.trim();
  if (/^https?:\/\//i.test(trimmed) || trimmed.endsWith(".json")) return trimmed;
  return `${trimmed.endsWith("/") ? trimmed : `${trimmed}/`}settings.json`;
}

/** Fetch a branch flow from a source and validate it at the boundary. */
export async function fetchBranchFlow(source: string, signal?: AbortSignal): Promise<BranchFlow> {
  const response = await fetch(branchSettingsUrl(source), { signal });
  if (!response.ok) {
    throw new Error(`Unable to load this branching strategy (${response.status}).`);
  }
  return parseBranchFlow(await response.json());
}
