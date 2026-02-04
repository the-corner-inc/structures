import { adminClient, inferAdditionalFields } from "better-auth/client/plugins"
import { createAuthClient } from "better-auth/react"
import { env } from "~/env/client"
import { auth } from "./auth"

const authClient = createAuthClient({
  baseURL: env.VITE_BASE_URL,

  plugins: [
    // https://www.better-auth.com/docs/concepts/typescript#inferring-additional-fields-on-client
    inferAdditionalFields<typeof auth>(),

    // Tables
    adminClient(),
  ],
})

export default authClient
