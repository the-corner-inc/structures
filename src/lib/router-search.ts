interface ExplorerSearch {
  source?: string;
  q?: string;
}

export function validateExplorerSearch(search: Record<string, unknown>): ExplorerSearch {
  return {
    source: typeof search.source === "string" && search.source.trim() ? search.source : undefined,
    q: typeof search.q === "string" && search.q ? search.q : undefined,
  };
}
