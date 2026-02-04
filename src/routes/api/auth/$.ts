import { createAPIFileRoute } from "@tanstack/react-start/api"
import { auth } from "@/lib/auth"

/**
 * Better Auth API Route Handler
 * 
 * This is a PLACEHOLDER auth API route.
 * Handles all authentication endpoints:
 * - POST /api/auth/sign-in
 * - POST /api/auth/sign-up
 * - POST /api/auth/sign-out
 * - GET /api/auth/session
 * 
 * The $ in the filename is a catch-all route that handles all auth paths.
 * 
 * Reference: https://www.better-auth.com/docs/concepts/request-handling
 */
export const APIRoute = createAPIFileRoute("/api/auth/$")({
    GET: async ({ request }) => {
        return auth.handler(request)
    },
    POST: async ({ request }) => {
        return auth.handler(request)
    }
})
