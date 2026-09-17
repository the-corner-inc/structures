# route.tsx

**Path:** `src/routes/_public/route.tsx`\
**Role:** Project convention: public layout

## Purpose

A shared shell for the `_public/` branch, without a sign-in requirement or an `/_public` URL segment.

## Guidelines

Render shared public navigation and an `Outlet`. Keep the public branch a sibling of `_auth/`, so the protected branch can have its own shell.

## Example

```tsx
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_public')({
  component: PublicLayout,
})

function PublicLayout() {
  return <main><Outlet /></main>
}
```

This directory layout is the parent of public pages. A sibling `_public.tsx` is an alternative; do not create both.

[Pathless layouts](https://tanstack.com/router/latest/docs/routing/routing-concepts#pathless-layout-routes).
