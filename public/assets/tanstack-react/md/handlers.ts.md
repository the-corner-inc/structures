# handlers.ts

**Path:** `tests/mocks/handlers.ts`\
**Role:** Optional: network handlers

## Purpose

Mock responses for external HTTP APIs when the test suite uses a network mocking tool.

## Guidelines

Represent success, validation failure, and unavailable-service responses. Do not hardcode compiler-generated Start server-function URLs; test those through the application or mock a stable domain boundary.
