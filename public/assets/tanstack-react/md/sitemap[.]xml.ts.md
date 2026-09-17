# sitemap[.]xml.ts

**Path:** `src/routes/sitemap[.]xml.ts`\
**Role:** Optional: sitemap endpoint

## Purpose

Serves `/sitemap.xml` with the canonical URLs of public, indexable pages.

## Guidelines

Keep `_auth` pages, login, API endpoints, drafts, and private records out of the sitemap. Include published translations and absolute URLs. Use a configured origin, not an untrusted request Host header.

## Example

```ts
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/sitemap.xml')({
  server: {
    handlers: {
      GET: () => {
        const origin = 'https://example.com'
        const paths = ['/', '/about', '/posts', '/fr', '/fr/about', '/fr/posts']
        const entries = paths.map((path) =>
          `<url><loc>${new URL(path, origin).href}</loc></url>`,
        ).join('')
        return new Response(
          '<?xml version="1.0" encoding="UTF-8"?>' +
          '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' +
          entries + '</urlset>',
          { headers: { 'Content-Type': 'application/xml; charset=utf-8' } },
        )
      },
    },
  },
})
```

The sample uses fixed paths. Add canonical published post URLs from server-side data when needed, XML-escape dynamic values, and use real modification dates if adding `lastmod`. English uses unprefixed canonical URLs here; French uses `/fr`. Generate the XML during the build for a static-only host.

[Start server routes](https://tanstack.com/start/latest/docs/framework/react/guide/server-routes).
