import { createFileRoute } from "@tanstack/react-router";

import { StructureBoard } from "#/components/structure-board.tsx";
import { validateExplorerSearch } from "#/lib/router-search.ts";
import { pageHead } from "#/lib/seo.ts";

export const Route = createFileRoute("/status")({
  validateSearch: validateExplorerSearch,
  head: () =>
    pageHead(
      "Kanban Statuses & Issue Workflow",
      "Explore a Kanban board and the meaning of each issue status. Follow work from backlog and to do through development, review, delivery, and done.",
    ),
  component: StatusPage,
});

function StatusPage() {
  const { source } = Route.useSearch();
  return <StructureBoard variant="kanban" sourceOverride={source} />;
}
