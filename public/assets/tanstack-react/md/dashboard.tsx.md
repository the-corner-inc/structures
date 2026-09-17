# dashboard.tsx

**Path:** `src/routes/_auth/dashboard.tsx`\
**Role:** Optional: authenticated screen

## Purpose

Dashboard at `/dashboard`, nested under `_auth/route.tsx`.

## Guidelines

Export `createFileRoute("/_auth/dashboard")`. Load only the summaries needed by this screen, reuse feature query options, and provide an empty state. Private queries must verify the current user on the server.
