# use-media-query.ts

**Path:** `src/hooks/use-media-query.ts`\
**Role:** Optional: browser integration

## Purpose

Subscribes to a media query when JavaScript behavior depends on viewport or device capabilities.

## Guidelines

Prefer CSS for visual layout. Access `matchMedia` safely after hydration or through an SSR-aware subscription, remove listeners, and choose a stable server fallback.
