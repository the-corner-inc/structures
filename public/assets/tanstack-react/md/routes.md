# routes

**Path:** `src/routes`\
**Role:** Required: file-based routing

## Purpose

Route modules organized into protected `_auth` pages, public `_public` pages, and root server endpoints.

## Guidelines

This example uses `route.tsx` inside `_auth/`, `_public/`, `{-$lang}/`, and `posts/` for directory layouts. Each layout renders an `Outlet`. These files are required for the layouts shown here, but a folder used only for organization does not need a layout. `__root.tsx` is the required root route; `routeTree.gen.ts` is generated. Keep reusable UI in `features` and `components`.

## Route tree

```text
src/routes/
├── __root.tsx
├── _auth/
│   ├── route.tsx
│   ├── dashboard.tsx
│   └── settings.tsx
├── _public/
│   ├── route.tsx
│   ├── login.tsx
│   └── {-$lang}/
│       ├── route.tsx
│       ├── index.tsx
│       ├── about.tsx
│       └── posts/
│           ├── route.tsx
│           ├── index.tsx
│           └── $postId.tsx
├── api.health.ts
├── api.webhooks.ts
├── robots[.]txt.ts
└── sitemap[.]xml.ts
```

## Public versus authenticated URLs

| Route file | URL | Access |
| --- | --- | --- |
| `_auth/dashboard.tsx` | `/dashboard` | Session required |
| `_auth/settings.tsx` | `/settings` | Session required |
| `_public/login.tsx` | `/login` | Public |
| `_public/{-$lang}/index.tsx` | `/` or `/fr` | Public |
| `_public/{-$lang}/about.tsx` | `/about` or `/fr/about` | Public |
| `_public/{-$lang}/posts/$postId.tsx` | `/posts/123` or `/fr/posts/123` | Public |
| `robots[.]txt.ts` | `/robots.txt` | Public text response |
| `sitemap[.]xml.ts` | `/sitemap.xml` | Public XML response |

The leading underscore creates a pathless layout, not an access rule by itself. `_auth/route.tsx` checks the session, and private server operations enforce their own authorization. The optional language is validated separately in `{-$lang}/route.tsx`.

[File naming](https://tanstack.com/router/latest/docs/routing/file-naming-conventions), [optional parameters](https://tanstack.com/router/latest/docs/guide/path-params), and [server routes](https://tanstack.com/start/latest/docs/framework/react/guide/server-routes).
