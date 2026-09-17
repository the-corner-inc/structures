# query-client.ts

**Path:** `src/lib/query-client.ts`\
**Role:** Optional: TanStack Query

## Purpose

Exports a factory that configures the application QueryClient.

## Guidelines

Create the client inside `getRouter()` so server requests do not share user data. Define default freshness, retry, and error behavior here; put feature keys and query functions with the feature.

## Reference

[Router and Query integration](https://tanstack.com/router/latest/docs/integrations/query).
