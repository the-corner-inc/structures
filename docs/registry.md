# Structure Explorer

An embeddable React folder tree with optional Markdown documentation. Installed source belongs to your project: edit it as needed. Requires React 18+ and a Tailwind 4 website. No router, provider, authentication, or registry backend is needed.

## Installation

Once the registry changes are released on GitHub, run in a project with shadcn configured (`components.json`):

```sh
pnpm dlx shadcn@latest add the-corner-inc/structures/structure-explorer
```

Files go into your configured `aliases.components` directory, under `structures/`. All internal imports are relative. The example below assumes your alias is `@/components`; use your configured alias if different.

```tsx
"use client";

import {
  StructureExplorer,
  parseStructures,
  nodeId,
  type GetDocumentation,
} from "@/components/structures/structure-explorer";
import data from "./my-structure.json";

const items = parseStructures(data);
const getDocumentation: GetDocumentation = async (node, { signal }) => {
  const response = await fetch(`/docs/${encodeURIComponent(nodeId(node))}.md`, { signal });
  if (response.status === 404) return null;
  if (!response.ok) throw new Error(`Documentation request failed: ${response.status}`);
  return response.text();
};

export function ProjectDocs() {
  return <StructureExplorer items={items} getDocumentation={getDocumentation} />;
}
```

In Next.js, put resolvers, callbacks and custom icon renderers inside a client component. You can pass serializable `items` from a server component. Vite and TanStack Start use the same API. CSS is imported by the component, with no changes to your global stylesheet.

For just a searchable tree, omit `getDocumentation`. `StructureExample` in `structure-example.tsx` is a working local-data example with two `route.tsx` files.

## Custom data and repeated filenames

```json
[
  {
    "id": "public-routes",
    "name": "_public",
    "type": "folder",
    "children": [{ "id": "public-layout", "name": "route.tsx", "type": "file" }]
  },
  {
    "id": "auth-routes",
    "name": "_auth",
    "type": "folder",
    "children": [{ "id": "auth-layout", "name": "route.tsx", "type": "file" }]
  }
]
```

`type` is `folder`, `container`, or `file`. Files cannot contain children. `id` defaults to `name` for legacy data; supply distinct IDs when any names repeat across the entire tree. IDs are single path segments (no slashes, control characters, `.` or `..`) and must be unique ignoring case. Keep IDs stable when renaming visible files. IDs are used for selection and document lookup, never as display labels.

Use `parseStructures(unknown)` for imported JSON or API data. It validates the shape and IDs and returns typed nodes; the explorer also validates its input. Existing catalog settings wrap the array: pass `settings.structures`.

## Selection and keyboard access

`onSelect(node)` runs on click, Enter or Space. `defaultSelectedId` sets an uncontrolled initial selection. For controlled selection, pass `selectedId` (use `null` for none) and update it from `onSelect`. `undefined` selects uncontrolled mode.

```tsx
const [selectedId, setSelectedId] = useState<string | null>(null)
<StructureExplorer items={items} selectedId={selectedId}
  onSelect={(node) => setSelectedId(nodeId(node))} />
```

Tab enters the tree once. Arrow Up/Down move through visible items, Left/Right collapse or enter branches, Home/End jump to the first/last item, and typing a letter moves to a matching visible item. `*` expands all branches. Clicking a folder toggles it and selects it. Search reveals matching descendants even in collapsed branches; clearing it restores prior expansion. Guide lines appear only during pointer or keyboard interaction with the sidebar.

## Documentation loading

`getDocumentation(node, { signal })` returns Markdown (or a promise), `null` for a missing document, and throws/rejects on a failure. Failures offer Retry. An empty string is a valid empty document. Keep the function stable using module scope or `useCallback` so parent rerenders do not reload documentation unnecessarily.

Requests start only after selection and hydration. Outdated requests are aborted and their results ignored even if the resolver does not honor the signal. Markdown rendering is loaded on demand. GFM, code highlighting and copy buttons are included. Raw HTML is disabled and unsafe link protocols are filtered by react-markdown. Markdown images and links can still reference remote URLs: serve trusted developer documentation.

## Theming and custom icons

The stylesheet scopes every selector to explorer elements and inherits your font. It reads shadcn's `--background`, `--foreground`, `--border`, `--muted`, `--muted-foreground`, `--accent`, `--accent-foreground`, `--primary`, `--ring`, and `--radius` variables. It defines no global tokens, resets, fonts or page layout. Host theme variables provide dark mode; neutral light fallbacks apply when tokens are absent. Narrow containers stack the tree and document automatically.

Use `className` for container styling, e.g. `className="my-6 w-full"`, and `label` to distinguish multiple explorers for assistive technology.

Lucide icons are the default. `renderIcon(node, { expanded, selected })` replaces them:

```tsx
<StructureExplorer
  items={items}
  renderIcon={(node, { expanded }) => (
    <img
      className="tree-kind-icon"
      alt=""
      aria-hidden="true"
      src={myIconUrl(node.name, node.type, expanded)}
    />
  )}
/>
```

The Structures website uses this extension point for its Material icons. Those assets are not installed by the registry.

## Updates and pinned versions

shadcn copies source files; it does not subscribe your copy to updates. Commit local changes, review upstream changes, then rerun `add` for the desired version and review overwrite prompts/diffs. Keep the included MIT notice with redistributed source.

For reproducible installs, replace `vX.Y.Z` below with an actual released tag containing `registry.json` (older tags such as `v0.8.3` do not contain this feature):

```sh
pnpm dlx shadcn@4.21.0 add the-corner-inc/structures/structure-explorer#vX.Y.Z
```

A full Git commit SHA can replace the tag. Pinned source versions declare exact runtime dependency versions. Your application lockfile provides reproducible transitive versions.

## Maintainer checks and release

```sh
pnpm registry:check
pnpm registry:test                 # clean Vite, Next.js, and TanStack Start installs/builds
pnpm test
pnpm lint
pnpm build
pnpm prerender:static
```

`registry:check` validates the root manifest using the shadcn CLI schema, builds local artifacts, and checks every declared file and dependency. Consumer checks install the actual built item via shadcn into temporary clean projects with different import aliases and Tailwind 4, type-check and build them, and check that installation does not alter host CSS. Set `REGISTRY_TEST_DIR` to keep a chosen output location for manual browser checks. CI runs this matrix on PRs and release tags.

Use the repository's normal `pnpm release` / `commit-and-tag-version` process after review and passing checks, push the commit and tag, and create the GitHub release for that tag. Validate the published registry with `pnpm dlx shadcn@4.21.0 registry validate the-corner-inc/structures#vX.Y.Z`. No npm publish or separate registry deployment is required. See the [official GitHub registry documentation](https://ui.shadcn.com/docs/registry/github).

V1 accepts developer-provided data. Filesystem scanning, non-React embeds and a full application starter are outside this component.
