# vitest.config.ts

**Path:** `vitest.config.ts`\
**Role:** Optional: unit/component tests

## Purpose

Configures Vitest for unit and React component tests.

## Guidelines

Use a suitable DOM environment for component tests, load `tests/setup.ts`, and match source aliases. Keep browser tests separate and do not boot production server integrations just to run pure unit tests.
