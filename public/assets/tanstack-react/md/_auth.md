# \_auth

**Path:** `src/routes/_auth`\
**Role:** Optional: protected route branch

## Purpose

Groups signed-in screens such as `/dashboard` and `/settings` beneath the `_auth/route.tsx` layout.

## Guidelines

The folder name is pathless: it does not create an `/_auth` URL. Keep login in `_public` so unauthenticated visitors can reach it. The layout provides the navigation guard; every private server function and API handler must separately enforce access.

## Contents

- `dashboard.tsx`
- `settings.tsx`
