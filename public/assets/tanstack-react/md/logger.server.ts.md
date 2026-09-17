# logger.server.ts

**Path:** `src/server/logger.server.ts`\
**Role:** Optional: server observability

## Purpose

Creates structured server logs for request failures and important operational events.

## Guidelines

Attach correlation IDs and redact credentials, cookies, and sensitive payloads. Prefer the hosting platform's existing logging integration before introducing another logging dependency.
