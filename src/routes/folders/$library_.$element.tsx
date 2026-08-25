import { createFileRoute } from "@tanstack/react-router";

import { StructureExplorer } from "#/components/structure-explorer.tsx";
import { validateExplorerSearch } from "#/lib/router-search.ts";

export const Route = createFileRoute("/folders/$library_/$element")({
  validateSearch: validateExplorerSearch,
  component: FolderDocument,
});

function FolderDocument() {
  const { library, element } = Route.useParams();
  const { source } = Route.useSearch();
  return (
    <StructureExplorer kind="folders" library={library} element={element} sourceOverride={source} />
  );
}
