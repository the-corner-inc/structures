# auth.queries.ts

**Path:** `src/features/auth/auth.queries.ts`\
**Role:** Optional: TanStack Query

## Purpose

The session query key and options shared by layouts, account UI, and loaders.

## Guidelines

Choose a freshness policy consistent with session expiry. Invalidate on sign-in and remove user-specific cached data on sign-out; a previously cached session does not authorize a server operation.
