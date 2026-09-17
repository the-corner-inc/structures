# setup.ts

**Path:** `tests/setup.ts`\
**Role:** Optional: unit/component test setup

## Purpose

Registers DOM assertions, cleanup, and shared test initialization.

## Guidelines

Keep setup deterministic and free of application side effects. Reset mocks and query caches between tests, and avoid connecting to production services.
