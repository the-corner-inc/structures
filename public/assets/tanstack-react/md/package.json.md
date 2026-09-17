# package.json

**Path:** `package.json`\
**Role:** Required: project manifest

## Purpose

Declares dependencies, package-manager expectations, and runnable project commands.

## Guidelines

Use ES modules and scripts for development and production builds. Add check, test, and deployment commands only for tools actually adopted; keep compatible TanStack packages aligned and commit the selected lockfile.
