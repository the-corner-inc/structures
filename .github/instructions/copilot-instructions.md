# Copilot Instructions

## Project overview

- Angular 22 standalone, client-rendered application.
- Zoneless change detection and `OnPush` are Angular defaults; do not add Zone.js or explicit change-detection metadata.
- Signals are the primary state primitive. Use `computed`, `linkedSignal`, and `httpResource` for derived, writable-dependent, and read-only HTTP state.
- Tailwind CSS and component SCSS provide styling.
- Structure definitions live in `public/assets/<library>/settings.json`; matching documentation lives in each library's `md/` directory.

## Development workflow

- Install dependencies: `npm ci`
- Start locally: `npm start`
- Production build: `npm run build`
- Unit tests: `npm test -- --watch=false`
- Lint: `npm run lint`
- Generate Angular artifacts with the Angular CLI rather than hand-written scaffolding.

## Architecture

- `src/app/core/`: shared models, abstract sidenav behavior, and the signal-based `StructuresService` store.
- `src/app/pages/folders/`: folder-structure explorer feature.
- `src/app/pages/issues/`: issue-label explorer feature.
- `src/app/shared/layouts/`: reusable sidenav/page layouts.
- `src/app/shared/pages/libraries/`: library and custom structure selection.
- `src/app/app.routes.ts`: lazy top-level routes.
- `src/app/app.config.ts`: standalone application providers.

## Conventions

- Standalone components and `OnPush` are defaults in Angular 22; omit redundant `standalone` and `changeDetection` metadata.
- Prefer signal inputs (`input`) and model inputs (`model`) over decorators.
- Prefer built-in template control flow (`@if`, `@for`, `@switch`) and self-closing component tags.
- Use `inject()` for dependency injection.
- Keep core code independent from feature-layer models.
- Use `httpResource` for reactive reads and `HttpClient` for mutations.
- Write zoneless tests with Vitest using the act → `fixture.whenStable()` → assert pattern.
- Use the active TypeScript aliases only: `@pages`, `@bases`, `@models`, `@services`, `@layouts`, and `@shared`.
