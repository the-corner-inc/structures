# post.types.ts

**Path:** `src/features/posts/post.types.ts`\
**Role:** Optional: additional domain types

## Purpose

Post view-model types that cannot be inferred from existing schemas or function results.

## Guidelines

Use explicit public data shapes and type-only imports. Do not export database connection types or private columns through a client-facing model; omit this file if inference covers the feature.
