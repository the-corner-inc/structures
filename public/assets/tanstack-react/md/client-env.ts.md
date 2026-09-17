# client-env.ts

**Path:** `src/env/client-env.ts`\
**Role:** Optional: public environment configuration

## Purpose

Validates values deliberately exposed through the Vite client environment.

## Guidelines

Use public variables such as `VITE_APP_NAME` and `import.meta.env`. Never prefix a database password, private key, or service credential with `VITE_`. Keep this module safe to import in both browser and SSR code.
