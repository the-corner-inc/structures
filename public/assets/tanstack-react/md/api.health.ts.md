# api.health.ts

**Path:** `src/routes/api.health.ts`\
**Role:** Optional: server endpoint

## Purpose

A non-UI health endpoint at `/api/health` for operational checks.

## Guidelines

Use `createFileRoute` with `server.handlers.GET` and return a `Response`. Keep liveness cheap; expose database readiness only if the deployment needs it and never return credentials or internal configuration.

## Reference

[TanStack Start server routes](https://tanstack.com/start/latest/docs/framework/react/guide/server-routes).
