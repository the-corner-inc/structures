# index.tsx

**Path:** `src/routes/_public/{-$lang}/index.tsx`\
**Role:** Example: localized home page

## Purpose

The public home page at `/`, `/en`, or `/fr`.

## Guidelines

Export `createFileRoute("/_public/{-$lang}/")` and read `lang` from `Route.useRouteContext()`. Keep landing-page composition and metadata here. Do not also create a root `src/routes/index.tsx` for this same home page.
