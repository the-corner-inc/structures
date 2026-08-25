# Contributing

Thank you for helping improve Structures. Please follow the project’s
[Code of Conduct](CODE_OF_CONDUCT.md) and search the
[issue tracker](https://github.com/the-corner-inc/structures/issues) before opening duplicate work.

## Setup

```bash
pnpm install
pnpm dev
```

Node.js 24+ and pnpm 11.23+ are required. Before opening a pull request, run:

```bash
pnpm lint
pnpm test
pnpm build
```

Use focused tests for domain behavior and regressions. Keep commit messages in Conventional Commit
form:

```text
<type>(<scope>): <short summary>
```

Common types include `feat`, `fix`, `perf`, `refactor`, `docs`, `build`, `ci`, and `test`.

## Content contributions

Built-in structures live under `public/assets/<library>/settings.json`; their documentation lives
under `public/assets/<library>/md/`. New or changed content should keep the JSON tree and lowercase
Markdown filenames in sync.

## Releases

Only maintainers should create releases. Start from a clean, up-to-date `main` branch and preview
the calculated version and changelog:

```bash
pnpm release:dry-run
```

Then create the version commit and Git tag:

```bash
pnpm release
git push --follow-tags origin main
```

`commit-and-tag-version` updates `package.json` and `CHANGELOG.md` from Conventional Commits. The
application reads that same package version at build time, so the explorer footer automatically
matches every release.

## Accounts and persistence

Better Auth and Drizzle are intentionally disabled in public development by default. Do not commit
secrets or point automated tests at shared databases. When working on account features, copy
`.env.example`, use a disposable local PostgreSQL database, and keep authorization checks inside
server functions or middleware as well as protected routes.
