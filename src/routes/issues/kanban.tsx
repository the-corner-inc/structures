import { createFileRoute } from "@tanstack/react-router";

import { KanbanBoard } from "#/components/kanban-board.tsx";
import { validateExplorerSearch } from "#/lib/router-search.ts";

export const Route = createFileRoute("/issues/kanban")({
  validateSearch: validateExplorerSearch,
  component: KanbanPage,
});

function KanbanPage() {
  const { source } = Route.useSearch();
  return <KanbanBoard sourceOverride={source} />;
}
