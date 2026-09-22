import { createFileRoute } from "@tanstack/react-router";

import { StructureBoard } from "#/components/structure-board.tsx";
import { validateExplorerSearch } from "#/lib/router-search.ts";

export const Route = createFileRoute("/labels")({
  validateSearch: validateExplorerSearch,
  component: LabelsPage,
});

function LabelsPage() {
  const { source } = Route.useSearch();
  return <StructureBoard variant="labels" sourceOverride={source} />;
}
