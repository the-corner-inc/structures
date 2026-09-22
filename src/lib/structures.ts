import type { ManifestConfig } from "material-icon-theme";

export type ExplorerKind = "folders" | "issues";
export { filterStructures, nodeId, parseStructures } from "../components/structures/structure-data";
export type {
  StructureType,
  StructureNode as FolderStructure,
} from "../components/structures/structure-data";
import {
  parseStructures,
  type StructureNode as FolderStructure,
} from "../components/structures/structure-data";

export interface FolderSettings {
  libraryName: string;
  manifestConfig?: ManifestConfig;
  structures: FolderStructure[];
}

export interface FrameworkGroup {
  name: string;
  children: Array<{
    name: string;
    library: string;
    disabled?: boolean;
  }>;
}

export const EXPLORER_FRAMEWORKS: Record<ExplorerKind, FrameworkGroup[]> = {
  folders: [
    {
      name: "Front-End",
      children: [
        { name: "Angular", library: "angular" },
        { name: "React", library: "react", disabled: true },
        { name: "Vue", library: "vue", disabled: true },
      ],
    },
    {
      name: "Back-End",
      children: [
        { name: "Go", library: "go" },
        { name: "Nest.js", library: "nestjs", disabled: true },
        { name: "Java", library: "java", disabled: true },
      ],
    },
    {
      name: "Monorepo",
      children: [{ name: "TanStack Start / React", library: "tanstack-react" }],
    },
  ],
  issues: [
    {
      name: "Projects",
      children: [
        { name: "Software", library: "software" },
        { name: "More templates soon", library: "unknown", disabled: true },
      ],
    },
  ],
};

export type BoardVariant = "kanban" | "labels" | "priorities";

export type Topic =
  | { name: string; description: string; to: string }
  | { name: string; description: string; disabled: true };

export const TOPICS: Topic[] = [
  {
    name: "Folders",
    to: "/folders",
    description: "Explore opinionated project folder structures for your stack.",
  },
  {
    name: "Issues",
    to: "/issues",
    description: "Browse the software issue-management structure and its workflow.",
  },
  {
    name: "Naming",
    to: "/naming",
    description: "The conventional-commit standard for issue and commit titles.",
  },
  {
    name: "Status",
    to: "/status",
    description: "Preview the status board an issue moves through, from backlog to done.",
  },
  {
    name: "Branches",
    disabled: true,
    description: "Branch naming and organization standards.",
  },
];

export function defaultSource(kind: ExplorerKind) {
  return kind === "folders" ? "/assets/user/" : "/assets/software/";
}

export function librarySource(library: string) {
  return `/assets/${encodeURIComponent(library)}/`;
}

export function settingsDocumentUrl(source: string) {
  const trimmed = source.trim();

  if (/^https?:\/\//i.test(trimmed) || trimmed.endsWith(".json")) {
    return trimmed;
  }

  return `${trimmed.endsWith("/") ? trimmed : `${trimmed}/`}settings.json`;
}

export function markdownDocumentUrl(source: string, element: string) {
  const trimmed = source.trim();
  const base = trimmed.endsWith(".json")
    ? trimmed.slice(0, trimmed.lastIndexOf("/") + 1)
    : trimmed.endsWith("/")
      ? trimmed
      : `${trimmed}/`;

  // Vite's public asset lookup needs TanStack's route syntax to stay literal, and the static
  // middleware only resolves colons when they stay raw.
  const filename = encodeURIComponent(element.toLowerCase()).replace(
    /%(?:24|3A|5B|5D|7B|7D)/g,
    decodeURIComponent,
  );
  return `${base}md/${filename}.md`;
}

export async function fetchSettings(source: string, signal?: AbortSignal) {
  const response = await fetch(settingsDocumentUrl(source), { signal });
  if (!response.ok) {
    throw new Error(`Unable to load this structure (${response.status}).`);
  }

  const payload: unknown = await response.json();
  if (!isFolderSettings(payload)) {
    throw new Error("This structure JSON does not match the expected format.");
  }

  return payload;
}

export async function fetchMarkdown(source: string, element: string, signal?: AbortSignal) {
  const response = await fetch(markdownDocumentUrl(source, element), { signal });
  if (!response.ok) {
    throw new Error(`No documentation was found for “${element}”.`);
  }
  return response.text();
}

function isFolderSettings(value: unknown): value is FolderSettings {
  if (!isRecord(value) || typeof value.libraryName !== "string") return false;
  if (value.manifestConfig !== undefined && !isRecord(value.manifestConfig)) return false;
  try {
    parseStructures(value.structures);
    return true;
  } catch {
    return false;
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}
