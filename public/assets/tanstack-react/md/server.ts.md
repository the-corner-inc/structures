# server.ts

**Path:** `src/server.ts`\
**Role:** Optional: custom server entry

## Purpose

Overrides the server request entry for custom runtime integration or response handling.

## Guidelines

Start supplies a default entry. Follow the server-entry API for the installed version, preserve handling of SSR, server routes, and server functions, and keep deployment-runtime code out of client modules.

## Reference

[TanStack Start server entry](https://tanstack.com/start/latest/docs/framework/react/guide/server-entry-point).
