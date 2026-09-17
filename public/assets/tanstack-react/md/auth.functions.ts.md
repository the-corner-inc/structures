# auth.functions.ts

**Path:** `src/features/auth/auth.functions.ts`\
**Role:** Optional: authentication

## Purpose

Server-function wrappers for session lookup and permitted account actions.

## Guidelines

Return only the session fields needed by the browser. Keep cookie handling and provider secrets in the server implementation, and validate every incoming action. The wrapper can be imported by client queries; its server implementation cannot.

## Reference

[TanStack Start server functions](https://tanstack.com/start/latest/docs/framework/react/guide/server-functions).
