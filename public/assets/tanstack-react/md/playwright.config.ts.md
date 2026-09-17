# playwright.config.ts

**Path:** `playwright.config.ts`\
**Role:** Optional: browser tests

## Purpose

Configures Playwright browsers, base URL, test discovery, and the application server used by end-to-end tests.

## Guidelines

Use `tests/e2e` as the browser-test directory, preserve traces for failures, and run against isolated test services. Ensure CI starts the same kind of build that users will run.
