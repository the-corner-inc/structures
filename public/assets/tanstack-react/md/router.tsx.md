# router.tsx

**Path:** `src/router.tsx`\
**Role:** Required: router factory

## Purpose

Exports `getRouter()` and configures the generated route tree, context, preloading, and shared route behavior.

## Guidelines

Construct request-scoped router dependencies here. When using Query, create a QueryClient per router and connect the installed Router/Query SSR integration so preloaded data reaches the browser safely.

## Reference

[Router and Query integration](https://tanstack.com/router/latest/docs/integrations/query).
