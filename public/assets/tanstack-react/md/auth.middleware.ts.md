# auth.middleware.ts

**Path:** `src/server/middleware/auth.middleware.ts`\
**Role:** Optional: authentication middleware

## Purpose

Authenticates private server functions and adds verified identity to their server context.

## Guidelines

Use `createMiddleware` with the function middleware type, verify the request on the server, then pass the verified user to `next`. Resource-specific ownership checks still belong in the operation.

## Reference

[TanStack Start middleware](https://tanstack.com/start/latest/docs/framework/react/guide/middleware).
