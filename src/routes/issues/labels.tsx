import { createFileRoute } from "@tanstack/react-router";

import { StructureBoard } from "#/components/structure-board.tsx";
import { validateExplorerSearch } from "#/lib/router-search.ts";

export const Route = createFileRoute("/issues/labels")({
  validateSearch: validateExplorerSearch,
  component: IssuesLabels,
});

function IssuesLabels() {
  const { source } = Route.useSearch();
  return <StructureBoard variant="labels" sourceOverride={source} />;
}
