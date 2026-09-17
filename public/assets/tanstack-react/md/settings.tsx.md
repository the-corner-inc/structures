# settings.tsx

**Path:** `src/routes/_auth/settings.tsx`\
**Role:** Optional: authenticated screen

## Purpose

Account settings at `/settings`, sharing the authenticated layout.

## Guidelines

Export `createFileRoute("/_auth/settings")`. Keep draft values in the form and refresh cached session data after successful changes. Require server-side verification for sensitive account operations.
