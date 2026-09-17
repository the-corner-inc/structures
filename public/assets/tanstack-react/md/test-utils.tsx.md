# test-utils.tsx

**Path:** `tests/test-utils.tsx`\
**Role:** Optional: shared render helpers

## Purpose

Creates test wrappers for components that need Query or router context.

## Guidelines

Create a fresh QueryClient and memory-history router for each test. Disable automatic retries where they hide failures, and expose only helpers used by real tests.
