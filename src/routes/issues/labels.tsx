import { createFileRoute } from "@tanstack/react-router";

import { StructureBoard } from "#/components/structure-board.tsx";
import { validateExplorerSearch } from "#/lib/router-search.ts";
import { pageHead } from "#/lib/seo.ts";

export const Route = createFileRoute("/issues/labels")({
  validateSearch: validateExplorerSearch,
  head: () =>
    pageHead(
      "Issue Labels & Types",
      "Browse software issue labels for bugs, features, documentation, discussions, and organization. Learn what each type means and when to use it.",
    ),
  component: IssuesLabels,
});

function IssuesLabels() {
  const { source } = Route.useSearch();
  return <StructureBoard variant="labels" sourceOverride={source} />;
}
