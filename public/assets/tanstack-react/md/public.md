# public

**Path:** `public`\
**Role:** Project convention: static assets

## Purpose

Assets served directly from the site root, such as `/favicon.ico`.

## Guidelines

Everything here is public. Keep imported images in `src/assets` when they should be processed by the bundler; never place secrets or private uploads here.

Crawler endpoints are implemented by `src/routes/robots[.]txt.ts` and `src/routes/sitemap[.]xml.ts` in this reference. Do not add static files with those same URLs unless replacing the handlers.

## Contents

- `favicon.ico`
- `site.webmanifest`
