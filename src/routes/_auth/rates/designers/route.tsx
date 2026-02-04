import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_auth/rates/designers")({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_auth/rates/designers"!</div>
}
