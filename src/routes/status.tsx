import { createFileRoute } from "@tanstack/react-router";

import { StructureBoard } from "#/components/structure-board.tsx";
import { validateExplorerSearch } from "#/lib/router-search.ts";

export const Route = createFileRoute("/status")({
  validateSearch: validateExplorerSearch,
  component: StatusPage,
});

function StatusPage() {
  const { source } = Route.useSearch();
  return <StructureBoard variant="kanban" sourceOverride={source} />;
}
