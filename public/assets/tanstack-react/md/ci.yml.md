# ci.yml

**Path:** `.github/workflows/ci.yml`\
**Role:** Optional: GitHub automation

## Purpose

Checks formatting, linting, TypeScript, tests, and the production build before merging.

## Guidelines

Install the pinned Node and package-manager versions and use a frozen lockfile. Generate routes before type checking on clean checkouts. Use isolated test services when integration tests need a database.
