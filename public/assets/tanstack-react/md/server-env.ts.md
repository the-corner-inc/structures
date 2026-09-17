# server-env.ts

**Path:** `src/env/server-env.ts`\
**Role:** Optional: private environment configuration

## Purpose

Validates private runtime configuration such as database URLs and authentication secrets.

## Guidelines

Load it only from server implementations and use the environment API supported by the hosting runtime. Fail with variable names rather than printing secret values.
