# Agents Migration Guide

## Migration Context

This document tracks the migration from Angular to TanStack Start for the Structures library.

### Reference Repository
- **Source**: https://github.com/daveyplate/better-auth-tanstack-starter
- **Purpose**: Inspiration for TanStack Start + Better-auth setup

### Technology Stack

#### Core Framework
- **TanStack Start**: Full-stack React framework with file-based routing
- **TanStack Router**: Type-safe routing with loaders and route-based code splitting
- **React 19**: Latest React version with modern features
- **Vite**: Build tool and dev server

#### Backend & Database
- **Better-auth**: Authentication library (placeholder - not fully integrated)
- **Drizzle ORM**: TypeScript ORM for database operations (placeholder)
- **PostgreSQL**: Database (via pg driver) (placeholder)

#### Styling & UI
- **Tailwind CSS 4**: Utility-first CSS framework
- **Radix UI**: Headless UI components
- **Lucide React**: Icon library

#### Development Tools
- **Biome**: Fast linter and formatter (replaces ESLint + Prettier)
- **TypeScript**: Type safety
- **Vitest**: Unit testing framework

### Project Structure

```
src/
├── routes/              # File-based routing
│   ├── __root.tsx      # Root layout with HTML structure
│   ├── index.tsx       # Home page (folders view)
│   ├── api/
│   │   └── auth/       # Better-auth API routes (placeholder)
│   └── auth/           # Auth pages (placeholder)
├── components/          # React components
│   ├── providers.tsx   # Context providers (theme, etc.)
│   ├── header.tsx      # Navigation header
│   └── ui/             # Reusable UI components
├── lib/                 # Business logic and utilities
│   ├── auth.ts         # Better-auth server setup (placeholder)
│   ├── auth-client.ts  # Better-auth client (placeholder)
│   └── utils.ts        # Helper functions
├── database/            # Database setup (placeholder)
│   ├── db.ts           # Drizzle client
│   └── schema.ts       # Database schema
├── styles/              # Global styles
│   └── styles.css      # Tailwind + custom CSS
└── router.tsx           # Router configuration

public/                  # Static assets (preserved from Angular)
└── assets/             # Folder structures and markdown content
```

### Key Migration Notes

#### Routing
- **Before**: Angular Router with lazy-loaded modules
- **After**: TanStack file-based routing in `src/routes/`
- Routes are automatically generated from file structure
- Use `createFileRoute()` for route components

#### State Management
- **Before**: Angular services with RxJS BehaviorSubjects
- **After**: React hooks (useState, useContext) and TanStack Query
- Shared state via Context API in providers.tsx

#### Data Fetching
- **Before**: Angular HttpClient with RxJS observables
- **After**: TanStack Query or native fetch in route loaders
- Server-side rendering support with hydration

#### Styling
- **Before**: SCSS modules with Angular component styles
- **After**: Tailwind utility classes + CSS modules when needed
- Theme management via next-themes

#### Build & Dev
- **Before**: Angular CLI (ng serve, ng build)
- **After**: Vite (vite dev, vite build)
- Much faster build times and HMR

### Better-auth Integration (Placeholder)

Better-auth files are created but NOT fully integrated:
- `src/lib/auth.ts` - Server-side auth configuration
- `src/lib/auth-client.ts` - Client-side auth hooks
- `src/routes/api/auth/$.ts` - Auth API endpoint handler
- `src/database/*` - Database schema for auth tables

These files follow the structure from the reference repo but require:
1. Environment variables setup (.env file)
2. Database configuration and migrations
3. Auth routes and UI components
4. Session management integration

### Migration Priorities

1. **Core functionality first**: Folder structure visualization
2. **Preserve existing data**: Keep all markdown and settings.json files
3. **Placeholder for auth**: Structure ready but not wired up
4. **Modern React patterns**: Hooks, function components, TypeScript

### Testing Strategy

Areas that CAN be tested:
- [ ] Build succeeds (`npm run build`)
- [ ] Dev server starts (`npm run dev`)
- [ ] Folder structure loads from JSON
- [ ] Markdown content displays
- [ ] Navigation works
- [ ] Theme switching works

Areas that CANNOT be fully tested (without integration):
- [ ] Better-auth login/logout flows
- [ ] Database operations
- [ ] Protected routes
- [ ] Session persistence
- [ ] User registration

### Commands Reference

```bash
# Install dependencies
npm install

# Development
npm run dev              # Start dev server on port 3000

# Build
npm run build            # Production build
npm run serve            # Preview production build

# Code Quality
npm run lint             # Run Biome linter
npm run format           # Format code with Biome
npm run check            # Check lint + format

# Testing
npm run test             # Run Vitest tests
```

### Migration Checklist

- [x] Create AGENTS.md documentation
- [ ] Update package.json with new dependencies
- [ ] Create vite.config.ts
- [ ] Update tsconfig.json
- [ ] Create router and routes structure
- [ ] Migrate core application logic
- [ ] Setup placeholder auth files
- [ ] Test and validate

### Known Limitations

1. **Better-auth**: Requires database setup and environment configuration
2. **Database**: Drizzle schema is placeholder only
3. **Auth routes**: Not connected to actual auth flow
4. **Tests**: May need updates for new structure
5. **Build size**: May differ from Angular bundle

### Future Enhancements

- Complete Better-auth integration
- Add user profiles and settings
- Implement structure sharing
- Add collaborative features
- Mobile responsive improvements
