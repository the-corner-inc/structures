import { createFileRoute } from "@tanstack/react-router";

import { StructureBoard } from "#/components/structure-board.tsx";
import { validateExplorerSearch } from "#/lib/router-search.ts";

export const Route = createFileRoute("/kanban")({
  validateSearch: validateExplorerSearch,
  component: KanbanPage,
});

function KanbanPage() {
  const { source } = Route.useSearch();
  return <StructureBoard variant="kanban" sourceOverride={source} />;
}
