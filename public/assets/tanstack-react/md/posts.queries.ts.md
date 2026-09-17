# posts.queries.ts

**Path:** `src/features/posts/posts.queries.ts`\
**Role:** Optional: TanStack Query

## Purpose

Reusable list and detail query options, including keys and freshness settings.

## Guidelines

Include every filter and identifier that changes the response in the query key. Share these options between route preloading and components, and let the server function handle the network boundary.
