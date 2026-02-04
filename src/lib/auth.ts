import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"

import { db } from "@/database/db"
import * as schema from "@/database/schema"

/**
 * Better Auth Server Configuration
 * 
 * This is a PLACEHOLDER configuration for better-auth.
 * To fully integrate:
 * 1. Set up database (PostgreSQL) with proper credentials
 * 2. Configure environment variables in .env
 * 3. Run database migrations with drizzle-kit
 * 4. Enable desired authentication methods
 * 
 * Reference: https://www.better-auth.com/docs
 */
export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg",
        usePlural: true,
        schema
    }),
    emailAndPassword: {
        enabled: true
    },
    // Add more auth methods as needed:
    // socialProviders: {
    //     github: {
    //         clientId: process.env.GITHUB_CLIENT_ID!,
    //         clientSecret: process.env.GITHUB_CLIENT_SECRET!
    //     }
    // }
})
