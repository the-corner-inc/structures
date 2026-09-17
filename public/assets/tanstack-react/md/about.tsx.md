# about.tsx

**Path:** `src/routes/_public/{-$lang}/about.tsx`\
**Role:** Example: localized public screen

## Purpose

A concrete localized page at `/about`, `/en/about`, or `/fr/about`.

## Guidelines

Read the language validated by the parent layout. Keep canonical and alternate-language metadata consistent with the sitemap.

## Example

```tsx
import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/_public/{-$lang}/about')({
  component: AboutPage,
})

function AboutPage() {
  const { lang } = Route.useRouteContext()
  return (
    <section>
      <h1>{lang === 'fr' ? 'À propos' : 'About'}</h1>
      <Link to="/{-$lang}/about" params={{ lang: undefined }}>English</Link>
      <Link to="/{-$lang}/about" params={{ lang: 'fr' }}>Français</Link>
    </section>
  )
}
```

[Navigation with optional parameters](https://tanstack.com/router/latest/docs/guide/navigation#navigating-with-optional-parameters).
