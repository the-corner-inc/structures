# posts.mutations.ts

**Path:** `src/features/posts/posts.mutations.ts`\
**Role:** Optional: TanStack Query mutations

## Purpose

Mutation hooks for creating, updating, and deleting posts.

## Guidelines

Invalidate affected list and detail queries after success. Add optimistic updates only when needed, with cancellation, snapshots, rollback, and a final refetch. Keep validation and authorization on the server.
