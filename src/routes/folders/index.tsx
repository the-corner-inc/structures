import { createFileRoute, Navigate } from "@tanstack/react-router"

export const Route = createFileRoute("/folders/")({
  component: FoldersIndex,
})

function FoldersIndex() {
  // Redirect to first default structure
  return <Navigate to="/folders/api" />
}
