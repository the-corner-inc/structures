# route.tsx

**Path:** `src/routes/_auth/route.tsx`\
**Role:** Optional: authentication layout

## Purpose

Checks the session before rendering children in `_auth/`.

## Guidelines

Use a server function for session lookup and render an `Outlet` on success. This example assumes `getSession` is exported by `features/auth/auth.functions.ts`. A route guard improves navigation; it does not authorize data access on the server.

## Example

```tsx
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { getSession } from '../../features/auth/auth.functions'

export const Route = createFileRoute('/_auth')({
  beforeLoad: async () => {
    const session = await getSession()
    if (!session?.user) throw redirect({ to: '/login' })
    return { user: session.user }
  },
  component: Outlet,
})
```

## Route convention

This is the directory layout file for `_auth/`. Render an `Outlet` for its children. A sibling `_auth.tsx` is an alternative convention; do not create both. Authentication is optional for Start applications, but this protected branch needs its guard.

[Authenticated routes](https://tanstack.com/router/latest/docs/guide/authenticated-routes).
