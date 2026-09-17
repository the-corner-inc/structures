# integration

**Path:** `tests/integration`\
**Role:** Optional: server integration tests

## Purpose

Tests of multiple server modules against controlled dependencies.

## Guidelines

Use isolated test databases or disposable services. Run schema migrations before tests, clean up owned data, and avoid coupling tests to execution order.

## Contents

- `posts.integration.test.ts`
