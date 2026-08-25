import "@tanstack/react-start/server-only";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { authRelations } from "#/lib/db/schema/auth.schema.ts";
import { relations } from "#/lib/db/schema/relations.ts";

export function createDatabase(databaseUrl: string) {
  const client = postgres(databaseUrl);
  return drizzle({
    client,
    relations: { ...relations, ...authRelations },
  });
}
