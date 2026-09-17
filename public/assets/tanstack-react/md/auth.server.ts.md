# auth.server.ts

**Path:** `src/server/auth.server.ts`\
**Role:** Optional: server authentication

## Purpose

Verifies sessions against the chosen authentication system and supplies server authorization helpers.

## Guidelines

Read credentials from validated server environment values. Check the current request and resource ownership for every private operation; return a minimal public session object to callers.
