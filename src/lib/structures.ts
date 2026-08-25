export type ExplorerKind = "folders" | "issues";
export type StructureType = "container" | "folder" | "file";

export interface FolderStructure {
  name: string;
  type: StructureType;
  color?: string;
  bgColor?: string;
  children?: FolderStructure[];
}

export interface FolderSettings {
  libraryName: string;
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

  return `${base}md/${encodeURIComponent(element.toLowerCase())}.md`;
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

export function filterStructures(items: FolderStructure[], query: string): FolderStructure[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return items;

  return items.flatMap((item) => {
    const children = item.children ? filterStructures(item.children, normalized) : undefined;
    if (item.name.toLowerCase().includes(normalized) || children?.length) {
      return [{ ...item, children }];
    }
    return [];
  });
}

function isFolderSettings(value: unknown): value is FolderSettings {
  if (!isRecord(value) || typeof value.libraryName !== "string") return false;
  return Array.isArray(value.structures) && value.structures.every(isFolderStructure);
}

function isFolderStructure(value: unknown): value is FolderStructure {
  if (!isRecord(value) || typeof value.name !== "string") return false;
  if (value.type !== "container" && value.type !== "folder" && value.type !== "file") return false;
  if (value.color !== undefined && typeof value.color !== "string") return false;
  if (value.bgColor !== undefined && typeof value.bgColor !== "string") return false;
  return (
    value.children === undefined ||
    (Array.isArray(value.children) && value.children.every(isFolderStructure))
  );
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}
