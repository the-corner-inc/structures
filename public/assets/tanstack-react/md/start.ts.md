# start.ts

**Path:** `src/start.ts`\
**Role:** Optional: Start configuration

## Purpose

Exports a `createStart` instance when the application needs global middleware or Start configuration.

## Guidelines

Use it only for configuration the defaults do not cover. Preserve the installed Start version's CSRF protections when customizing request middleware, and keep request context scoped to the incoming request.

## Reference

[TanStack Start middleware](https://tanstack.com/start/latest/docs/framework/react/guide/middleware).
