# server

**Path:** `src/server`\
**Role:** Project convention: server implementation

## Purpose

Persistence, authentication, and external-service implementations that must execute on the server.

## Guidelines

A folder name alone is not an execution boundary. Use Start server functions or server route handlers and the installed version's import-protection support. Never import these implementations directly into a browser component.

## Contents

- `auth.server.ts`
- `db.server.ts`
- `posts.server.ts`
- `logger.server.ts`
- `middleware/`
- `schema/`
