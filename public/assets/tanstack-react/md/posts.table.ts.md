# posts.table.ts

**Path:** `src/server/schema/posts.table.ts`\
**Role:** Example: database schema

## Purpose

Defines post storage fields, relations, indexes, and constraints for the selected ORM.

## Guidelines

Store ownership explicitly and index actual query patterns. Generate and review a migration when schema changes; a TypeScript edit alone does not update deployed databases.
