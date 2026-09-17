# request.middleware.ts

**Path:** `src/server/middleware/request.middleware.ts`\
**Role:** Optional: request middleware

## Purpose

Shared request concerns such as correlation IDs and safe response headers.

## Guidelines

Register request middleware through `start.ts` when it should apply globally. Preserve response streaming and error handling; do not consume a webhook body before signature verification.
