# route.tsx

**Path:** `src/routes/_public/{-$lang}/posts/route.tsx`\
**Role:** Example: nested layout

## Purpose

The parent route for `/posts` or `/fr/posts` and its descendants.

## Guidelines

Read the validated `lang` from route context and include it in locale-dependent query keys. Render the posts section layout with an `Outlet`. Shared navigation belongs here; the listing belongs in `posts/index.tsx` so it is not rendered alongside every detail screen.

## Example

```tsx
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_public/{-$lang}/posts')({
  component: Outlet,
})
```

Use `route.tsx` for this directory layout, not a second sibling `posts.tsx`.
