# posts.server.ts

**Path:** `src/server/posts.server.ts`\
**Role:** Example: persistence implementation

## Purpose

Implements post reads and writes for the server-function wrappers.

## Guidelines

Use parameterized queries or the selected ORM, enforce record ownership, and use transactions for changes that must succeed together. Return explicit public fields instead of leaking full database records.
