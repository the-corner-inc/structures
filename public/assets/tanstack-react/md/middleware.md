# middleware

**Path:** `src/server/middleware`\
**Role:** Optional: shared server middleware

## Purpose

Reusable request or server-function middleware for repeated server concerns.

## Guidelines

Keep request middleware distinct from function middleware and attach each at the appropriate boundary. Avoid assuming route `beforeLoad` checks protect direct HTTP calls.

## Contents

- `auth.middleware.ts`
- `request.middleware.ts`
