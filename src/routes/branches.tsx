import { createFileRoute } from "@tanstack/react-router";

import { BranchFlowPage } from "#/components/branch-flow-page.tsx";
import { validateExplorerSearch } from "#/lib/router-search.ts";
import { branchesHead } from "#/lib/seo.ts";

export const Route = createFileRoute("/branches")({
  validateSearch: validateExplorerSearch,
  head: ({ match }) => branchesHead(match.search.source),
  component: BranchesPage,
});

function BranchesPage() {
  const { source } = Route.useSearch();
  return <BranchFlowPage sourceOverride={source} />;
}
