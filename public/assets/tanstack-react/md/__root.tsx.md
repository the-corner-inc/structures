# \_\_root.tsx

**Path:** `src/routes/__root.tsx`\
**Role:** Required: root route

## Purpose

Defines the application document, shared router context, and the UI surrounding every route.

## Guidelines

Declare typed context with `createRootRouteWithContext` when using Query. Render `HeadContent`, the route `Outlet`, and `Scripts`, and attach default error and not-found UI. Avoid putting feature data or session state in module-level mutable variables.

## Reference

[TanStack Start setup](https://tanstack.com/start/latest/docs/framework/react/build-from-scratch).
