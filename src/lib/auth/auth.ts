import "@tanstack/react-start/server-only";
import { drizzleAdapter } from "@better-auth/drizzle-adapter/relations-v2";
import { betterAuth } from "better-auth/minimal";
import { tanstackStartCookies } from "better-auth/tanstack-start";

import { env } from "#/env/server.ts";
import { createDatabase } from "#/lib/db/index.ts";
import * as schema from "#/lib/db/schema/index.ts";

if (!env.AUTH_ENABLED || !env.DATABASE_URL || !env.BETTER_AUTH_SECRET) {
  throw new Error(
    "Accounts are disabled. Set AUTH_ENABLED, DATABASE_URL, and BETTER_AUTH_SECRET before loading Better Auth.",
  );
}

const socialProviders = {
  ...(env.GITHUB_CLIENT_ID && env.GITHUB_CLIENT_SECRET
    ? { github: { clientId: env.GITHUB_CLIENT_ID, clientSecret: env.GITHUB_CLIENT_SECRET } }
    : {}),
  ...(env.GOOGLE_CLIENT_ID && env.GOOGLE_CLIENT_SECRET
    ? { google: { clientId: env.GOOGLE_CLIENT_ID, clientSecret: env.GOOGLE_CLIENT_SECRET } }
    : {}),
};

export const auth = betterAuth({
  baseURL: env.VITE_BASE_URL,
  secret: env.BETTER_AUTH_SECRET,
  telemetry: { enabled: false },
  database: drizzleAdapter(createDatabase(env.DATABASE_URL), { provider: "pg", schema }),
  plugins: [tanstackStartCookies()],
  session: { cookieCache: { enabled: true, maxAge: 5 * 60 } },
  socialProviders,
  emailAndPassword: { enabled: true },
  advanced: { database: { joins: true } },
});
