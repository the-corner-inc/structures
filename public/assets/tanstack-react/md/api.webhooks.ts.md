# api.webhooks.ts

**Path:** `src/routes/api.webhooks.ts`\
**Role:** Optional: webhook endpoint

## Purpose

A POST endpoint at `/api/webhooks` for an external provider.

## Guidelines

Verify the provider signature against the original request body before processing. Deduplicate event IDs and make processing idempotent. Server routes are appropriate for externally called endpoints; internal app operations can use server functions.

## Reference

[TanStack Start server routes](https://tanstack.com/start/latest/docs/framework/react/guide/server-routes).
