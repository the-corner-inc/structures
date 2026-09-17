# db.server.ts

**Path:** `src/server/db.server.ts`\
**Role:** Optional: database

## Purpose

Configures the database connection or pool for the chosen database driver.

## Guidelines

Choose lifecycle and pooling settings appropriate to the deployment runtime. Never export the client through browser modules or use a global variable to store the current user. TanStack Start does not require a particular database or ORM.
