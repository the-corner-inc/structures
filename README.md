# Structures

Structures is an open-source knowledge library for exploring, documenting, and sharing project
organization standards. It presents folder structures and issue workflows in a familiar,
VS Code-like explorer with Markdown documentation for every entry.

The application is built with React, TanStack Start, TanStack Router and Query. Its foundation is
adapted from [TanStarter](https://github.com/mugnavo/tanstarter), including optional Better Auth and
Drizzle boundaries for the future account and sharing experience.

## Features

- Explore Angular, Go, and software issue-management structures.
- Search nested structures and read contextual Markdown without loading the Markdown renderer up
  front.
- Load a custom `settings.json` from a raw GitHub Gist or another CORS-enabled URL.
- Download the active structure as JSON.
- Copy a permanent link to any built-in or custom structure, including the selected explanation.
- Print a polished, fully expanded folder tree for PDF export or sharing.
- Switch theme or minimize the explorer for focused reading.
- Keep public browsing database-free while account infrastructure remains disabled by default.

## Development

Requirements: Node.js 24+ and pnpm 11.23+.

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

Useful checks:

```bash
pnpm lint
pnpm test
pnpm build
```

The default production build creates a Nitro Node server in `.output/server`. CI renders the
built-in routes as static directory indexes with `pnpm prerender:static`, verifies the artifact, then
uploads `.output/public` to the existing FTP host. Apache rewrites remain available for custom and
unknown client-side routes.

## Structure content

Built-in libraries live under `public/assets/<library>/`:

- `settings.json` describes the recursive explorer tree.
- `md/<lowercase entry name>.md` contains the documentation displayed for an entry.

Custom sources follow the same format. If the source is a JSON URL, Markdown is resolved relative
to that JSON file.

## Accounts (prepared, disabled)

Better Auth, Drizzle, PostgreSQL schemas, `/login`, `/signup`, `/account`, and the auth API boundary
are scaffolded from TanStarter. Public builds do not require a database. To enable accounts, copy
`.env.example`, configure the database and secret, set `AUTH_ENABLED=true` and
`VITE_AUTH_ENABLED=true`, run the database generation/migration workflow, and deploy the default
server build instead of the static FTP build.

## Releases

Releases use `commit-and-tag-version`. The package version is injected into the application at
build time and appears at the bottom of the explorer, so it cannot drift from `package.json`.

See [CONTRIBUTING.md](CONTRIBUTING.md) for the release checklist and contribution guidelines.
