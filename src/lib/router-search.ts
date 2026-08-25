interface ExplorerSearch {
  source?: string;
}

export function validateExplorerSearch(search: Record<string, unknown>): ExplorerSearch {
  if (typeof search.source === "string" && search.source.trim()) {
    return { source: search.source };
  }
  return {};
}
