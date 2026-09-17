# form-context.ts

**Path:** `src/lib/form-context.ts`\
**Role:** Optional: shared TanStack Form integration

## Purpose

Field and form contexts shared by the application form factory and reusable controls.

## Guidelines

Keep context creation in one browser-safe module to avoid circular dependencies. Export only what the form helpers and field components consume.
