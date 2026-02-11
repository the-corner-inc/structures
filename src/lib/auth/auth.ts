import { createServerOnlyFn } from "@tanstack/react-start"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { betterAuth } from "better-auth/minimal"
import { admin, openAPI } from "better-auth/plugins"
import { tanstackStartCookies } from "better-auth/tanstack-start"

import { env } from "@/env/server"
import { db } from "@/lib/db"
import * as schema from "@/lib/db/schema"

const getAuthConfig = createServerOnlyFn(() =>
  betterAuth({
    baseURL: env.VITE_BASE_URL,
    telemetry: {
      enabled: false,
    },
    database: drizzleAdapter(db, {
      provider: "pg",
      schema,
    }),

    user: {
      // https://www.better-auth.com/docs/concepts/users-accounts#delete-user
      deleteUser: {
        enabled: true,
      },

      // https://www.better-auth.com/docs/concepts/typescript#additional-fields
      additionalFields: {},
    },

    // https://www.better-auth.com/docs/integrations/tanstack#usage-tips
    plugins: [
      // Core
      openAPI(),
      tanstackStartCookies(),

      // Table
      admin(),
    ],

    // https://www.better-auth.com/docs/concepts/session-management#session-caching
    session: {
      cookieCache: {
        enabled: true,
        maxAge: 5 * 60, // 5 minutes
      },
    },

    // https://www.better-auth.com/docs/concepts/oauth
    socialProviders: {
      github: {
        clientId: env.GITHUB_CLIENT_ID!,
        clientSecret: env.GITHUB_CLIENT_SECRET!,
      },
    },

    // https://www.better-auth.com/docs/authentication/email-password
    emailAndPassword: {
      enabled: true,
    },

    experimental: {
      // https://www.better-auth.com/docs/adapters/drizzle#joins-experimental
      joins: true,
    },
  }),
)

export const auth = getAuthConfig()
