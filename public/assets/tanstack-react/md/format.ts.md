# format.ts

**Path:** `src/lib/format.ts`\
**Role:** Optional: shared formatting

## Purpose

Pure formatters for dates, numbers, and other repeated display values.

## Guidelines

Use platform `Intl` APIs with explicit locale and time-zone choices where needed. Ensure server and browser output agree during hydration; do not mix network access into formatting.
