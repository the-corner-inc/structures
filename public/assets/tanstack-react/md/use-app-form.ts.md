# use-app-form.ts

**Path:** `src/hooks/use-app-form.ts`\
**Role:** Optional: shared TanStack Form integration

## Purpose

Creates shared form helpers when multiple forms use the same field components.

## Guidelines

Use TanStack Form composition APIs to connect field and form contexts. Start with `useForm` directly for a single form, and extract this module once common field behavior exists.
