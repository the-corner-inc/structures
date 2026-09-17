# mocks

**Path:** `tests/mocks`\
**Role:** Optional: mocked network services

## Purpose

Network-level mocks for component tests that exercise request behavior.

## Guidelines

Mock only external boundaries. Share handlers between relevant tests and reset overrides after each test so order does not affect results.

## Contents

- `handlers.ts`
