# \_public

**Path:** `src/routes/_public`\
**Role:** Project convention: public route branch

## Purpose

Contains pages visitors can open without signing in, with `_public/route.tsx` supplying their shared layout.

## Guidelines

Keep the sign-in route reachable here. Localized home, about, and post pages live in `{-$lang}/`; the `{-$lang}/route.tsx` validates the language. Public page loaders must return only public data.

## Contents

- `login.tsx` → `/login`
- `{-$lang}/route.tsx` → optional language layout
- `{-$lang}/` → public pages with or without a language prefix
