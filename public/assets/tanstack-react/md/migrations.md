# migrations

**Path:** `migrations`\
**Role:** Optional: database migrations

## Purpose

Versioned database changes maintained by the chosen migration tool.

## Guidelines

Keep applied migrations immutable, review generated SQL, and document deployment order. The exact directory layout may be controlled by the selected ORM.

## Contents

- `0001_create_posts.sql`
