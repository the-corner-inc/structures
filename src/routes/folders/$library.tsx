import { createFileRoute } from "@tanstack/react-router";

import { StructureExplorer } from "#/components/structure-explorer.tsx";
import { validateExplorerSearch } from "#/lib/router-search.ts";

export const Route = createFileRoute("/folders/$library")({
  validateSearch: validateExplorerSearch,
  component: FolderLibrary,
});

function FolderLibrary() {
  const { library } = Route.useParams();
  const { source } = Route.useSearch();
  return <StructureExplorer kind="folders" library={library} sourceOverride={source} />;
}
