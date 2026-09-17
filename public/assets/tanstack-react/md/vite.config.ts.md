# vite.config.ts

**Path:** `vite.config.ts`\
**Role:** Required: Vite build configuration

## Purpose

Configures TanStack Start, the React plugin, aliases, and any chosen styling or hosting integrations.

## Guidelines

Place `tanstackStart()` before the React plugin. Start handles route generation; do not add a second Router generation plugin. Keep hosting configuration tied to the actual deployment target.
