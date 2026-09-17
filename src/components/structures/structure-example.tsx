"use client";

import {
  StructureExplorer,
  nodeId,
  type GetDocumentation,
  type StructureNode,
} from "./structure-explorer";

const items: StructureNode[] = [
  {
    name: "src",
    type: "folder",
    children: [
      {
        id: "public",
        name: "_public",
        type: "folder",
        children: [{ id: "public-layout", name: "route.tsx", type: "file" }],
      },
      {
        id: "auth",
        name: "_auth",
        type: "folder",
        children: [{ id: "auth-layout", name: "route.tsx", type: "file" }],
      },
    ],
  },
];
const documents: Record<string, string> = {
  "public-layout":
    "# Public layout\n\nWraps public pages with shared navigation.\n\n```tsx\nexport const Route = createFileRoute('/_public')({ component: PublicLayout })\n```",
  "auth-layout":
    "# Authenticated layout\n\nChecks the session before rendering protected pages. Enforce authorization on the server too.",
};
// Keep the resolver stable (module scope or useCallback) to avoid needless reloads.
const getDocumentation: GetDocumentation = (node) => documents[nodeId(node)] ?? null;

export function StructureExample() {
  return (
    <StructureExplorer
      items={items}
      getDocumentation={getDocumentation}
      defaultSelectedId="public-layout"
    />
  );
}
