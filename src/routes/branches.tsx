import { createFileRoute } from "@tanstack/react-router";

import { BranchFlowPage } from "#/components/branch-flow-page.tsx";
import { validateExplorerSearch } from "#/lib/router-search.ts";

export const Route = createFileRoute("/branches")({
  validateSearch: validateExplorerSearch,
  component: BranchesPage,
});

function BranchesPage() {
  const { source } = Route.useSearch();
  return <BranchFlowPage sourceOverride={source} />;
}
