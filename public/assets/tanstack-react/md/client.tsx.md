# client.tsx

**Path:** `src/client.tsx`\
**Role:** Optional: custom client entry

## Purpose

Overrides Start's browser hydration entry when custom client initialization is needed.

## Guidelines

Start supplies a default entry. If overriding it, hydrate with `StartClient` and preserve server/browser markup agreement; do not create a second independent router or QueryClient.

## Reference

[TanStack Start client entry](https://tanstack.com/start/latest/docs/framework/react/guide/client-entry-point).
