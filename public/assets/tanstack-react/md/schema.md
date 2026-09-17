# schema

**Path:** `src/server/schema`\
**Role:** Optional: database schema

## Purpose

Database schema definitions owned by the chosen persistence tool.

## Guidelines

Keep storage constraints, relationships, and indexes here. API input validation belongs in feature schemas; database schemas must not become browser imports.

## Contents

- `posts.table.ts`
