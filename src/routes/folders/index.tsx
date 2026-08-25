import { createFileRoute } from "@tanstack/react-router";

import { StructureExplorer } from "#/components/structure-explorer.tsx";
import { validateExplorerSearch } from "#/lib/router-search.ts";

export const Route = createFileRoute("/folders/")({
  validateSearch: validateExplorerSearch,
  component: FoldersIndex,
});

function FoldersIndex() {
  const { source } = Route.useSearch();
  return <StructureExplorer kind="folders" sourceOverride={source} />;
}
