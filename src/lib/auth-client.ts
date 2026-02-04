import { createAuthClient } from "better-auth/react"

/**
 * Better Auth Client
 * 
 * This is a PLACEHOLDER client for better-auth.
 * Provides React hooks for authentication:
 * - useSession() - Get current session
 * - signIn() - Sign in user
 * - signUp() - Register new user
 * - signOut() - Sign out user
 * 
 * Reference: https://www.better-auth.com/docs/react
 */
export const authClient = createAuthClient({
    baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000"
})

export const { useSession, signIn, signUp, signOut } = authClient
