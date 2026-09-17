# posts.functions.ts

**Path:** `src/features/posts/posts.functions.ts`\
**Role:** Example: server-function boundary

## Purpose

Typed `createServerFn` wrappers used by loaders, query functions, and mutations.

## Guidelines

Validate inputs, authorize private operations, and delegate persistence to `src/server/posts.server.ts`. Use GET for reads and POST for changes. Only import the server implementation into code that runs inside the server handler.

## Reference

[TanStack Start server functions](https://tanstack.com/start/latest/docs/framework/react/guide/server-functions).
