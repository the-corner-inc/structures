## Angular Standalone Components

- Standalone is the default for all components; you do not need to specify `standalone: true` in component decorators.

# Copilot Instructions for AI Agents

## Project Overview

- This is a zoneless Angular 20+ project generated with Angular CLI (see `README.md`).
- Tailwind CSS is used for styling (see `tailwind.config.js`, `src/styles.scss`).
- Main app code is in `src/app/` with feature modules under subfolders (e.g., `navbar/`, `pages/`).
- Entry points: `src/main.ts` (browser), `src/main.server.ts` (SSR), `src/server.ts` (Node server).
- Styles are in `src/styles.scss`, Tailwind utility classes, and component-level `.scss` files.

## Developer Workflows

- **Start dev server:** `ng serve` (or `npm start` if configured)
- **Run unit tests:** `ng test` (or `npm test`)
- **Build for production:** `ng build`
- **Generate components/services:** `ng generate <schematic> <name>`
- **CSS Naming Convention:** Utility classes are used in .scss files; see `https://github.com/o-pinion/angular/wiki/CSS-Naming-convention` for guidelines.

## Project-Specific Patterns

- **Zoneless Angular:** Zone.js is not used; prefer RxJS, signals, and explicit change detection. Avoid relying on automatic change detection.
- **Css Variables:** Use utility classes in templates. Global styles and css variable in `src/styles.scss` and utilities in `https://github.com/o-pinion/scss`.
- **Routing:** Defined in `src/app/app.routes.ts` and `app.routes.server.ts`.
- **App config:** See `app.config.ts` and `app.config.server.ts` for environment/config patterns.
- **Component structure:** Each component has its own folder with `.ts`, `.html`, `.scss` files (e.g., `navbar/navbar.component.*`).
- **Testing:** Specs are in `*.spec.ts` files next to source files.
- **TypeScript config:** Multiple `tsconfig.*.json` files for app, tests, and server.

## Conventions

- Standalone is the default for all components; you do not need to specify `standalone: true` in component decorators.
- Use Angular CLI for scaffolding and builds.
- Keep feature code in its own subfolder under `src/app/`.
- Prefer Angular's dependency injection and service patterns.
- Use Tailwind CSS for most styling; SCSS for global/component styles only when needed.
- SSR is supported; check server files for integration points.
- Use Angular's built-in control flow (`@for() {}` and `@if() {}`) instead of legacy `*ngFor` and `*ngIf` syntax.

## External Integrations

- No custom backend or API integration detected in the main structure; check `server.ts` for SSR or API hooks.
- No non-standard build/test commands; follow Angular CLI defaults unless otherwise documented.

## Key Files & Directories

- `src/app/`: Main app code
- `src/app/navbar/`: Example component structure
- `src/app/pages/`: Feature pages
- `src/app/app.routes.ts`: Client routes
- `src/app/app.routes.server.ts`: Server routes
- `src/app/app.config.ts`: App config
- `src/app/app.config.server.ts`: Server config
- `src/main.ts`, `src/main.server.ts`, `src/server.ts`: Entry points
- `src/styles.scss`: Global styles and Tailwind imports
- `tailwind.config.js`: Tailwind configuration
- `README.md`: Workflow reference
- `https://github.com/material-extensions/vscode-material-icon-theme/blob/main/src/core/icons/fileIcons.ts` for icon file name references
- `https://github.com/material-extensions/vscode-material-icon-theme/blob/main/src/core/icons/folderIcons.ts` for folder icon references
- `https://github.com/material-extensions/vscode-material-icon-theme/tree/main/icons` for icon svg

### TypeScript Path Aliases (from `tsconfig.json`)

- `@prints/*` → `src/app/pages/prints/*`
- `@utilities/*` → `src/app/pages/utilities/*`
- `@plugins/*` → `src/app/pages/plugins/*`
- `@main/*` → `src/app/pages/main/*`
- `@pages/*` → `src/app/pages/*`
- `@bases/*` → `src/app/core/bases/*`
- `@guards/*` → `src/app/core/guards/*`
- `@resolvers/*` → `src/app/core/resolvers/*`
- `@models/*` → `src/app/core/models/*`
- `@services/*` → `src/app/core/services/*`
- `@animations/*` → `src/app/shared/animations/*`
- `@layouts/*` → `src/app/shared/layouts/*`
- `@components/*` → `src/app/shared/components/*`
- `@directives/*` → `src/app/shared/directives/*`
- `@pipes/*` → `src/app/shared/pipes/*`
- `@modals/*` → `src/app/shared/modals/*`
- `@shared/*` → `src/app/shared/*`
- `@environments/*` → `src/environments/*`
- `@app/*` → `src/app/*`
- `@root/*` → project root

## Example Patterns

- To add a new page: `ng generate component pages/new-page`
- To add a service: `ng generate service services/data`
- To use Tailwind: Add utility classes directly in component templates
- To run tests: `ng test`

---

**If any conventions or workflows are unclear, ask the user for clarification before proceeding.**
