import { Button } from "@/components/ui/button"
import { authQueryOptions } from "@/lib/auth/queries"
import { useSuspenseQuery } from "@tanstack/react-query"
import { createFileRoute, Link } from "@tanstack/react-router"

export const Route = createFileRoute("/_auth/dashboard")({
  component: DashboardLayout,
})

function DashboardLayout() {
  const { data: user } = useSuspenseQuery(authQueryOptions())

  return (
    <div className="flex flex-col items-center justify-center gap-10 p-2">
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-3xl font-bold sm:text-4xl">Your data</h1>

        <div className="text-center text-xs sm:text-sm">
          Session user:
          <pre className="max-w-screen overflow-x-auto px-2 text-start">
            {JSON.stringify(user, null, 2)}
          </pre>
        </div>

        <Button
          render={<Link to="/me" />}
          className="w-fit"
          size="lg"
          nativeButton={false}
        >
          Edit Profile
        </Button>
      </div>

      {/* <Outlet /> */}
    </div>
  )
}
