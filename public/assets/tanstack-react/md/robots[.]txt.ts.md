# robots[.]txt.ts

**Path:** `src/routes/robots[.]txt.ts`\
**Role:** Optional: crawler endpoint

## Purpose

Serves `/robots.txt` from a TanStack Start GET handler. `[.]` makes the dot literal in the URL.

## Guidelines

Keep this endpoint outside authentication and locale layouts. Use your configured production origin for the sitemap URL. This replaces `public/robots.txt`; do not serve both at the same URL. Robots rules are crawler guidance and never replace authorization.

## Example

```ts
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/robots.txt')({
  server: {
    handlers: {
      GET: () => new Response([
        'User-agent: *',
        'Allow: /',
        'Disallow: /dashboard',
        'Disallow: /settings',
        'Sitemap: https://example.com/sitemap.xml',
        '',
      ].join('\n'), {
        headers: { 'Content-Type': 'text/plain; charset=utf-8' },
      }),
    },
  },
})
```

Replace `https://example.com` with the same origin used by the sitemap. Review staging crawler rules separately. On a static-only deployment, emit `robots.txt` during the build instead of relying on a runtime handler.

[Start server routes](https://tanstack.com/start/latest/docs/framework/react/guide/server-routes).
