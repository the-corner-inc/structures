# index.tsx

**Path:** `src/routes/_public/{-$lang}/posts/index.tsx`\
**Role:** Example: list route

## Purpose

The index screen for `/posts` or `/fr/posts`, with searchable and paginated post data.

## Guidelines

Read the validated `lang` from route context and include it in locale-dependent query keys. Validate URL search parameters and include relevant values in `loaderDeps` and query keys. Preload the same query options that the screen reads, avoiding a second independent fetch.
