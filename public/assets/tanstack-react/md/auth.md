# auth

**Path:** `src/features/auth`\
**Role:** Optional: authentication

## Purpose

Client-facing session queries and sign-in UI.

## Guidelines

Server session verification lives in `src/server/auth.server.ts`. Keep browser-safe contracts here and clear user-specific query data when the user signs out.

## Contents

- `auth.functions.ts`
- `auth.queries.ts`
- `sign-in-form.tsx`
