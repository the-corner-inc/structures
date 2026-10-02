# Structures: codebase context

This describes the checked-out code, not a guarantee of what has been released. Working guidance
and commands live in [AGENTS.md](AGENTS.md); user-facing setup is in [README.md](README.md).

## Purpose and product

Structures is an open-source knowledge library from The Corner for exploring and sharing project
organization standards. Its VS Code-style explorer pairs a recursive JSON tree with Markdown
explanations. Users can search, select entries through shareable URLs, load custom JSON from a raw
Gist or another CORS-enabled endpoint, download settings, and print the expanded tree.

The site also explains issue labels, priorities, statuses, naming conventions, branching strategies,
and agent concepts. Issue cards and boards are educational examples, not a persisted issue tracker.
The Agentic page opens with an interactive system map, with concept cards and downloadable
Markdown templates also available. Selecting a map block highlights its directed connections and opens the matching
example; a text connection list also supports small screens and assistive technology. The page
does not execute agents. Accounts are scaffolded but disabled by default.

A second deliverable is `structure-explorer`, an editable React component distributed through the
root shadcn registry. It is source copied into consumer projects, not a hosted service or npm package.

## Code map

| Location                                   | Responsibility                                                                           |
| ------------------------------------------ | ---------------------------------------------------------------------------------------- |
| `src/router.tsx`                           | Router creation, per-router QueryClient, query provider, error/not-found defaults.       |
| `src/routes/`                              | TanStack file routes, route parameters, search validation, auth layouts, auth API.       |
| `src/components/`                          | Website shell, explorer integration, boards, standards pages, branch diagrams.           |
| `src/components/structures/`               | Portable explorer, shared tree/data helpers, Markdown renderer, scoped CSS.              |
| `src/lib/structures.ts`                    | Folder/issue catalog types, library/topic lists, URL resolution, fetch boundaries.       |
| `src/lib/branches.ts`                      | Branch graph types, parsing, preset list, and fetching.                                  |
| `src/lib/agentic.ts`                       | Agent concept cards, reference links, and Markdown templates.                            |
| `src/lib/material-icons.ts`                | Material icon manifest and filename/folder icon lookup.                                  |
| `src/lib/auth/`, `src/lib/db/`, `src/env/` | Optional accounts, PostgreSQL access, and validated environment variables.               |
| `src/styles.css`                           | Website layout, colors, dark theme, responsive behavior, and print styles.               |
| `public/assets/`                           | Built-in JSON catalogs and their Markdown content.                                       |
| `packages/gitgraph-*`                      | Vendored Gitgraph workspace packages with TypeScript source and tracked compiled output. |
| `registry.json`, `docs/registry.md`        | Registry distribution manifest and consumer contract.                                    |
| `scripts/`                                 | Static prerendering, registry validation/consumer checks, and graph debugging.           |
| `.github/workflows/`                       | Release-tag verification/deployment and registry consumer CI.                            |

## Runtime and navigation

The application uses React 19 and strict TypeScript, with TanStack Start for server rendering,
TanStack Router for file routing, and TanStack Query for remote state. Vite+ drives development,
builds, linting, formatting, and tests. Vite configuration also enables the React compiler,
Tailwind CSS 4, and Nitro's Node server output. The workspace pins its Vite implementation through
the catalog in `pnpm-workspace.yaml`.

`pnpm dev` runs Vite+ through Portless at `https://structures.localhost`, with a free backend port
and branch-prefixed hostnames for linked Git worktrees. `PORTLESS=0 pnpm dev` uses port 3000 directly.

`src/routes/__root.tsx` owns the HTML document, metadata, CSS, theme provider, and application shell.
`AppShell` renders navigation from `TOPICS`, theme controls, and presentation mode. Theme choice is
stored under `structures-theme` in local storage; an early script applies it before hydration.

Shareable page configuration belongs in validated TanStack Router search state. The Agentic page
uses `view=map|cards` and `template=<id>` (a building block, `prompt`, `agents-md`, or `context-md`),
for example `/agentic?view=cards&template=agents-md`. Missing or invalid values show the system map
and Harness. Controls update the URL without resetting scroll; reloads and Back/Forward restore
the view and template together. The defaults are omitted when controls update the URL. Hover and
focus stay local. Heading links and copied heading URLs preserve the current query parameters.

Each page supplies a content-specific title and description through route `head` metadata.
`src/lib/seo.ts` keeps search and social titles/descriptions aligned and resolves explorer library,
document, and branch-preset metadata from route parameters and the selected source. This metadata
is server-rendered and included in the static pages without fetching custom sources on the server.

| URL                                               | Main behavior                                                  |
| ------------------------------------------------- | -------------------------------------------------------------- |
| `/`                                               | Topic chooser and custom structure input.                      |
| `/folders`                                        | Library chooser alongside the default `user` structure.        |
| `/folders/$library`, `/folders/$library/$element` | Folder explorer and selected documentation.                    |
| `/issues`                                         | Sample issue cards with contextual label/status documentation. |
| `/issues/$library`, `/issues/$library/$element`   | Issue taxonomy explorer and documentation.                     |
| `/issues/labels`, `/status`                       | Label gallery and Kanban status board.                         |
| `/issues/priorities`, `/naming`                   | Priority and naming reference pages.                           |
| `/branches`                                       | Branch preset chooser, or a graph when `?source=` is supplied. |
| `/agentic`                                        | Agent concepts and downloadable example templates.             |
| `/login`, `/signup`, `/account`, `/api/auth/*`    | Optional account UI and Better Auth boundary.                  |

The `_auth` and `_guest` route directories are pathless layouts. Explorer document route filenames
use `$library_.$element.tsx`; the underscore keeps the document route out of the library layout's
nesting. `src/routeTree.gen.ts` is generated from the route files.

## Catalog and documentation flow

1. Folder/issue explorer routes pass `kind`, optional `library`/`element`, and validated `source`
   search state into the website's `StructureExplorer`.
2. Source resolution prefers the custom source, then `/assets/<library>/`, then the default
   `/assets/user/` for folders or `/assets/software/` for issues.
3. After hydration, TanStack Query fetches settings with key `["structure-settings", source]`.
   `fetchSettings` validates the wrapper and calls the shared tree parser before rendering.
4. Search filters the tree while retaining ancestors of matching descendants. The website tree
   adapts the shared accessible tree with Material icons or issue colors.
5. Selecting a node navigates to its stable ID, preserving the custom source query parameter.
   `MarkdownViewer` is lazy-loaded, then fetches documentation with key
   `["structure-markdown", source, element]` after hydration.

The QueryClient defaults to five-minute freshness and disables refetching on window focus.
Explorer content is fetched in the browser, so static HTML does not contain all of the catalog's
Markdown. Custom sources must allow browser CORS requests; there is no server-side content proxy.

Folder/issue settings contain `libraryName`, optional `manifestConfig`, and `structures`. Each node
has a `name`, `type` (`container`, `folder`, or `file`), optional stable `id`, colors, and children.
`parseStructures` enforces globally unique case-insensitive IDs, valid single path segments, and
no nonempty children on files. Documentation uses the lowercased ID, falling back to the name.
For a source ending in `.json`, Markdown is resolved from that document's directory; local catalog
directories resolve to `settings.json` and `md/<id>.md`. Absolute HTTP(S) settings sources are used
as given.

Selectable folder catalogs are Angular, Go, and TanStack Start / React. `user` supplies the default
folder example; `software` supplies issue content. Disabled framework choices are placeholders.
Files in these catalogs are documentation examples, including the large TanStack example tree;
they do not describe this repository's literal source layout.

Branch presets have a separate schema: `libraryName`, optional description, `branches`, and
directed `edges`. Parsing checks IDs, kinds, optional fields, and edge references. Five built-in
presets live in `git-flow`, `github-flow`, `gitlab-flow`, `trunk-based`, and `trunk-based-release`.
`BranchFlowPage` fetches the chosen source and renders `BranchGraph`, which turns the model into
illustrative Gitgraph commits and merges. Descriptions appear on hover/focus. The separate
`branch-flow.tsx` contains an SVG layout implementation; the current page uses `branch-graph.tsx`.

## Reusable explorer contract

The portable `StructureExplorer` accepts a node array, optional controlled selection, callbacks,
custom icon rendering, and an optional `getDocumentation(node, { signal })` resolver. It validates
input, manages its own search, and reuses the same tree as the website. Documentation requests run
in an effect, abort on cleanup, ignore stale results, and support missing/error/retry states.

`StructureMarkdown` uses react-markdown, GFM, and syntax highlighting, skips raw HTML, and adds
copy controls. Its shared `anchor-heading.tsx` is included in the registry with scoped heading-link
styles. The component stylesheet uses scoped selectors and host theme variables. The
intended consumer contract is React 18+ and Tailwind 4, with no required TanStack providers or
website assets; see [docs/registry.md](docs/registry.md) for API details.

`registry.json` declares the copied source, CSS, license, documentation, and exact runtime
dependencies. `registry:check` checks the manifest and imports and builds `.registry-build/`.
`registry:test` installs that artifact into temporary Vite, Next.js, and TanStack Start projects,
then checks types, builds, and preservation of host CSS. The consumer directories are retained;
`REGISTRY_TEST_DIR` can choose their parent location.

## Accounts and persistence

The TanStarter-derived account layer uses Better Auth, Drizzle, and PostgreSQL. Database schemas
cover users, sessions, accounts, and verification; public catalog browsing uses static assets.
`src/env/client.ts` and `src/env/server.ts` validate configuration with Zod through env-core.

Both auth flags default to false. Session lookup returns `null` before importing Better Auth when
disabled, and the auth API returns HTTP 503. Enabling accounts requires `AUTH_ENABLED=true`,
`VITE_AUTH_ENABLED=true`, `DATABASE_URL`, a `BETTER_AUTH_SECRET` of at least 32 characters, the
appropriate base URL, and a configured database schema. GitHub and Google OAuth credentials are
optional. Server-only imports and middleware keep credentials and authorization on the server.

`pnpm db` invokes Drizzle Kit; its configuration requires `DATABASE_URL`, reads
`src/lib/db/schema/index.ts`, and writes migrations under the currently ignored `drizzle/` directory.
`auth:generate` targets the Better Auth schema. Environment examples live in `.env.example`.

## Build, deployment, and release

`pnpm build` produces `.output/server/index.mjs` and `.output/public`. Material icon SVGs are served
from the installed `material-icon-theme` package by a development middleware and copied as Nitro
public assets for production. The app version is injected as `__APP_VERSION__` from `package.json`.

`scripts/prerender-static.mjs` starts the built server on `127.0.0.1:4173` with server auth disabled,
fetches an explicit set of public routes and catalog entry URLs, checks responses, and writes
directory `index.html` files. It skips catalog entries named `index.html` to avoid output collisions.
`public/.htaccess` preserves existing files/directories and supplies client-side route fallbacks,
including explorer entries whose names contain file extensions.

The main CI workflow runs lint, tests, build, and prerender on `v*` tags, then uploads
`.output/public` to FTP. The registry consumer matrix runs on PRs, pushes to `main`, and version
tags. `commit-and-tag-version` updates the package version and changelog; that same tag identifies
the registry source. Account-enabled deployments must run the Node server instead of the static
FTP artifact. See [CONTRIBUTING.md](CONTRIBUTING.md) and the
[release skill](.agents/skills/release/SKILL.md) for the release procedure.

## Current caveats

- The Copilot instructions still describe the removed Angular implementation. Follow the current
  React source and tooling configuration for development.
- Playwright scripts/dependencies exist, but no app E2E configuration or specs are present.
- The vendored Gitgraph React package uses React 16 typings; the app supplies a React 19 type
  shim. Package `lib/` output is tracked and consumed at runtime, so source-only edits are incomplete.
