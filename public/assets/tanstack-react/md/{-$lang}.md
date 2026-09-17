# {-$lang}

**Path:** `src/routes/_public/{-$lang}`\
**Role:** Optional: localized public pages

## Purpose

An optional language segment: `/about` and `/fr/about` use the same about page.

## Guidelines

The hyphen inside `{-$lang}` makes the parameter optional. A missing language means English in this example; supported explicit values are `en` and `fr`. Validate once in the `{-$lang}/route.tsx` layout. Private pages stay outside this locale branch.

## URL examples

| File in this folder | No language prefix | French prefix |
| --- | --- | --- |
| `index.tsx` | `/` | `/fr` |
| `about.tsx` | `/about` | `/fr/about` |
| `posts/index.tsx` | `/posts` | `/fr/posts` |
| `posts/$postId.tsx` | `/posts/123` | `/fr/posts/123` |

`/en/about` also matches. Choose a consistent canonical URL policy and include the canonical localized pages in the sitemap.

[Optional path parameters](https://tanstack.com/router/latest/docs/guide/path-params#optional-path-parameters).
