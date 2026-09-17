# route.tsx

**Path:** `src/routes/_public/{-$lang}/route.tsx`\
**Role:** Optional: language validation layout

## Purpose

Validates the optional language parameter and shares it with nested public pages.

## Guidelines

Reject unsupported language values and use a fixed default when the segment is absent. The example selects a language; translating messages and formatting dates remain application concerns.

## Example

```tsx
import { createFileRoute, notFound, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_public/{-$lang}')({
  beforeLoad: ({ params }) => {
    const lang = params.lang ?? 'en'
    if (lang !== 'en' && lang !== 'fr') throw notFound()
    return { lang }
  },
  component: Outlet,
})
```

This directory layout validates the optional parameter for its children. A sibling `{-$lang}.tsx` is an alternative; keep one layout file for this route.

[Optional language parameters](https://tanstack.com/router/latest/docs/guide/path-params#internationalization-i18n-with-optional-path-parameters).
