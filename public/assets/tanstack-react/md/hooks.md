# hooks

**Path:** `src/hooks`\
**Role:** Project convention: shared React hooks

## Purpose

React hooks reused across features.

## Guidelines

Keep feature-specific hooks inside their feature. Browser APIs need cleanup and SSR-safe access; pure formatting and validation functions belong in ordinary utility modules.

## Contents

- `use-app-form.ts`
- `use-media-query.ts`
