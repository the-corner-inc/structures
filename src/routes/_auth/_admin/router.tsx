import { authQueryOptions } from "@/lib/auth/queries"
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router"

export const Route = createFileRoute("/_auth/_admin/router")({
  component: Outlet,
  beforeLoad: async ({ context }) => {
    const user = await context.queryClient.ensureQueryData({
      ...authQueryOptions(),
      revalidateIfStale: true,
    })
    if (!user) {
      throw redirect({ to: "/" })
    }

    if (!user.role || user.role !== "admin") {
      throw redirect({ to: "/access-denied" })
    }

    // re-return to update type as non-null for child routes
    return { user }
  },
})
