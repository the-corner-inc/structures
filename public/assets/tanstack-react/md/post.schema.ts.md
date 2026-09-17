# post.schema.ts

**Path:** `src/features/posts/post.schema.ts`\
**Role:** Example: runtime validation

## Purpose

Browser-safe validation schemas for post input and identifiers.

## Guidelines

Share validation rules between forms and server functions where appropriate. Infer TypeScript types from schemas instead of duplicating them, and validate again on the server because browser checks can be bypassed.
