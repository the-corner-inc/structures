export type StructureType = "container" | "folder" | "file";

export interface StructureNode {
  /** Stable across renames. Required when display names repeat anywhere in the tree. */
  id?: string;
  name: string;
  type: StructureType;
  color?: string;
  bgColor?: string;
  children?: StructureNode[];
}

export function nodeId(node: StructureNode): string {
  return node.id ?? node.name;
}

export function flattenStructures(items: StructureNode[]): StructureNode[] {
  return items.flatMap((item) => [item, ...flattenStructures(item.children ?? [])]);
}

export function filterStructures(items: StructureNode[], query: string): StructureNode[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return items;
  return items.flatMap((item) => {
    const children = item.children ? filterStructures(item.children, normalized) : undefined;
    return item.name.toLowerCase().includes(normalized) || children?.length
      ? [{ ...item, children }]
      : [];
  });
}

/** Validate JSON at the boundary, including globally unique, URL-safe IDs. */
export function parseStructures(value: unknown): StructureNode[] {
  const ids = new Set<string>();
  function visit(entries: unknown): asserts entries is StructureNode[] {
    if (!Array.isArray(entries)) throw new Error("Structure items must be an array.");
    for (const entry of entries) {
      if (
        !entry ||
        typeof entry !== "object" ||
        typeof entry.name !== "string" ||
        !entry.name.trim()
      ) {
        throw new Error("Every structure entry needs a name.");
      }
      if (!["container", "folder", "file"].includes(entry.type)) {
        throw new Error(`Invalid structure type for ${entry.name}.`);
      }
      const id: unknown = entry.id === undefined ? entry.name : entry.id;
      if (
        typeof id !== "string" ||
        !id.trim() ||
        id === "." ||
        id === ".." ||
        /[/\\]/.test(id) ||
        Array.from(id).some((char) => char.charCodeAt(0) < 32)
      ) {
        throw new Error(`Invalid structure ID for ${entry.name}; use a single path segment.`);
      }
      // Catalog documentation filenames are case-insensitive for legacy URLs.
      if (ids.has(id.toLowerCase()))
        throw new Error(`Duplicate structure ID: ${id}. Supply distinct IDs when names repeat.`);
      ids.add(id.toLowerCase());
      for (const key of ["color", "bgColor"]) {
        if (entry[key] !== undefined && typeof entry[key] !== "string")
          throw new Error(`Invalid ${key} for ${id}.`);
      }
      if (entry.children !== undefined) {
        if (entry.type === "file" && Array.isArray(entry.children) && entry.children.length)
          throw new Error(`A file cannot have children: ${id}.`);
        visit(entry.children);
      }
    }
  }
  visit(value);
  return value;
}
