import { createFileRoute, Navigate } from "@tanstack/react-router"

export const Route = createFileRoute("/")({
  component: HomePage,
})

function HomePage() {
  // Redirect to folders with first available structure
  return <Navigate to="/folders/api" />
}
