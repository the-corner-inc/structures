---
name: release
description: Prepare and publish a release for the "structures" repo (the-corner-inc/structures). Use whenever the user asks to cut, prepare, or publish a release, tag, or version bump, or to run or troubleshoot the release process. Covers branch hygiene, commit-and-tag-version dry-run and release, pushing tags, and post-release registry validation.
---

# Release — the-corner-inc/structures

This skill captures the exact, project-specific release procedure for the
[`structures`](https://github.com/the-corner-inc/structures) explorer repo. The authoritative
"Releases" checklist lives in [`CONTRIBUTING.md`](../../../CONTRIBUTING.md) and [`README.md`](../../../README.md);
this skill operationalizes it for the agent and encodes project-specific gotchas observed in practice.

## Key facts

- Release tool: **`commit-and-tag-version`** via pnpm scripts (`release`, `release:dry-run`).
- The package version in `package.json` is injected into the application at build time and shows in
  the explorer footer — it must never drift from a release.
- Repo: `https://github.com/the-corner-inc/structures`. Registry block:
  `the-corner-inc/structures/structure-explorer`.
- Only maintainers create releases. Start from a clean, up-to-date `main` branch.

## Always confirm scope first

Before doing anything, clarify with the user:

1. **Which work to include** — the approved/merged commits are released from `main`. Check for
   feature branches and **uncommitted working-tree changes** (e.g. in-flight features). Ask whether
   in-flight work should be committed/polished first or excluded.
2. **Release location** — per `CONTRIBUTING.md`, releases happen on `main`. If work lives on a
   feature branch, confirm whether to merge it into `main` first, release from the branch, or just
   prepare without merging.
3. **How far to go** — dry-run only, commit + tag locally, or full publish including push.

Do not mutate anything until the user has answered and confirmed the plan.

## Step 1 — Ensure a clean, up-to-date `main`

Releases must start from a clean `main`:

```bash
git fetch origin
git checkout main
git pull --ff-only origin main
git status --porcelain   # must be empty (no pending or untracked changes)
```

If `main` is not where the release work lives, arrange the merge first and re-fetch.

## Step 2 — Preview the version and changelog (dry-run)

`commit-and-tag-version` derives the next version and CHANGELOG from Conventional Commits. It honors
the `commit-and-tag-version` config in `package.json` (custom section order, hidden types). Items
classified with `feat` bump MINOR, `fix` bumps PATCH, and breaking changes bump MAJOR.

```bash
pnpm release:dry-run
```

Read the printed version bump and the generated CHANGELOG section. Sanity-check that the commits
listed match the intended scope and that the version jump is expected. Do **not** run `pnpm release`
with dirty state — it will either fail or produce a bad tag.

## Step 3 — Create the version commit and tag

```bash
pnpm release
```

This updates `package.json` and `CHANGELOG.md`, creates a `chore(release): X.Y.Z` commit, and applies
the `vX.Y.Z` tag. Verify afterward:

```bash
git log --oneline -2
git tag -l 'v*' | tail
node -p "require('./package.json').version"   # must equal the new tag
```

## Step 4 — Run the pre-release validation gates

Do not push until these pass:

```bash
pnpm build
pnpm registry:check
pnpm registry:test
```

`registry:check` validates `registry.json` against the shadcn schema and checks the declared files
and imports in `src/components/structures/`. `registry:test` exercises the published block. Fix any
failures before releasing.

## Step 5 — Push

```bash
git push --follow-tags origin main
```

Also push any branch that carried the release work if it was merged:

```bash
git push origin <branch-with-changes>   # if not already pushed
```

## Step 6 — Validate the published registry block from the tag

After the tag is on the remote, validate that the shadcn block can be installed from the new tag
(substitute the real `X.Y.Z`):

```bash
pnpm dlx shadcn@4.21.0 registry validate the-corner-inc/structures#vX.Y.Z
```

Then create the GitHub release for `vX.Y.Z`. Consumers can pin that tag. There is **no** npm
publish and **no** separate registry server — the GitHub tag is the distribution channel.

## Post-release consistency checks

- The explorer footer version (read at build time from `package.json`) should match `vX.Y.Z`.
- `CHANGELOG.md` must have a `## [X.Y.Z]` section with a `compare/v<prev>...v<X.Y.Z>` link.
- New/changed content under `public/assets/<library>/` should stay in sync with lowercase Markdown
  filenames and stable, globally unique document IDs (see `docs/registry.md`).

## Pitfalls observed in this repo

- The last release `v1.0.0` includes a sizeable migration (Angular → TanStack Start). More work often
  sits on long-lived feature branches (e.g. `feat/issues/v2`) ahead of `main` with uncommitted
  changes. Releasing from `main` only captures merged work, so always reconcile branch state and the
  working tree with the user before cutting.
- `pnpm release:dry-run` is harmless and read-only; use it liberally to preview before committing.
- After any release, confirm no CI/registry consumer matrix is expected to pass before publishing —
  the consumer CI must be green first (see `CONTRIBUTING.md`).
