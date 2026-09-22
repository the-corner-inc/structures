import { createFileRoute } from "@tanstack/react-router";

import { StructureExplorer } from "#/components/structure-explorer.tsx";
import { validateExplorerSearch } from "#/lib/router-search.ts";

export const Route = createFileRoute("/issues/")({
  validateSearch: validateExplorerSearch,
  component: IssuesIndex,
});

function IssuesIndex() {
  const { source } = Route.useSearch();
  return <StructureExplorer kind="issues" sourceOverride={source} />;
}
