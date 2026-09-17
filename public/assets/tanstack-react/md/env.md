# env

**Path:** `src/env`\
**Role:** Recommended: environment boundary

## Purpose

Separate validation modules for public browser configuration and private server configuration.

## Guidelines

Document variable names in `.env.example`. A value exposed to the browser is public even if it originally came from a deployment secret store.

## Contents

- `client-env.ts`
- `server-env.ts`

## Reference

[TanStack Start environment variables](https://tanstack.com/start/latest/docs/framework/react/guide/environment-variables).
