# Copilot Instructions for tc-website

## Project Overview

- This is a minimal starter template based on TanStack Start, using React 19, TanStack Router/Query, Tailwind CSS, shadcn/ui, Vite 8, Nitro v3, Drizzle ORM, and Better Auth.
- The main app logic is in `src/`, with routes in `src/routes/`, UI components in `src/components/`, and utilities/auth/db logic in `src/lib/`.

## Key Workflows

- **Install dependencies:** `pnpm install`
- **Start dev server:** `pnpm dev` (runs at http://localhost:3000)
- **Database schema push:** `pnpm db push` (uses Drizzle ORM)
- **Auth schema generation:** `pnpm auth:generate` (updates `src/lib/db/schema/auth.schema.ts`)
- **UI components:** Use shadcn/ui CLI, e.g. `pnpm ui add button`
- **Lint/Format/Typecheck:**
  - Use ESLint and Prettier for all code. Run `pnpm lint` and `pnpm format` before submitting changes.
  - ESLint config: see `eslint.config.js` (TypeScript, React, TanStack, Prettier integration, import organization, Tailwind plugin, and custom rules).
  - Prettier config: see `.prettierrc` (tabWidth 2, semi colons, printWidth 90, trailing commas, organize imports, Tailwind plugin, LF line endings).
  - Always ensure code passes lint and format checks before completion.
- **Upgrade dependencies:** `pnpm deps`

## Architecture & Patterns

- **Routing:** All routes are in `src/routes/`, using TanStack Router conventions. Route files may use nested folders for grouping (e.g. `_auth/dashboard/`).
  - Each page must be defined in a `route.tsx` file (not `index.tsx`), using TanStack Router's `createFileRoute` pattern.
  - Guarded/protected pages (requiring authentication) must be placed under `src/routes/_auth/`, following the pattern in `_auth/dashboard/route.tsx`. Authentication is enforced by the parent `_auth/route.tsx`, so individual child routes do not need to use a `requireAuth` middleware.
- **Components:** Shared UI in `src/components/ui/`, app-level components in `src/components/`. Theme toggling is handled by `theme-provider.tsx`.
- **Auth:** Auth logic is in `src/lib/auth/` (client/server separation). Middleware for protected routes/functions is in `src/lib/auth/middleware.ts`.
- **Database:** Drizzle ORM schema in `src/lib/db/schema/`, entry in `src/lib/db/index.ts`.
- **Config:** Vite config in `vite.config.ts`, Drizzle config in `drizzle.config.ts`, TypeScript config in `tsconfig.json`.
- **Environment:** Client/server env separation in `src/env/`.

## Conventions

**Signals:** Any variable prefixed with `$` (e.g., `$loading`) is a signal from @preact/signals-react. Any variable suffixed with `$` (e.g., `user$`) is an observable (commonly from RxJS or similar). Use these conventions for clarity and consistency.

- **File naming:** Use kebab-case for files, PascalCase for React components.
- **TypeScript:** All code is TypeScript-first. Always type function parameters and return values, including for utility functions (e.g., getPrice, event handlers). Prefer types/interfaces for props and API responses.
- **UI:** Use shadcn/ui for new UI components. Always use default shadcn/ui styles and classes—do not add custom colors or overrides.
- **Auth:** Use middleware for server-side auth enforcement. See `src/lib/auth/middleware.ts` for examples.
- **Database migrations:** Use Drizzle ORM and run schema commands via `pnpm db ...`.

## Integration Points

- **External services:** Auth via Better Auth, DB via Drizzle ORM/PostgreSQL.
- **Deployment:** Default config targets Vercel via Nitro v3, but can be switched in `vite.config.ts`.

## Examples

- See `src/routes/_auth/dashboard/route.tsx` for a protected route pattern.
- See `src/lib/auth/middleware.ts` for server-side auth enforcement.
- See `src/components/ui/button.tsx` for a shadcn/ui component example.

---

For more details, see [README.md](../README.md) and config files in the project root.
