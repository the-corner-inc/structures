import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_auth/rates/developers")({
  component: DevelopersRatesPage,
})

function DevelopersRatesPage() {
  return (
    <main className="mx-auto max-w-xl py-8">
      <h1 className="mb-4 text-2xl font-bold">Developers Rates</h1>
      <p className="text-muted-foreground">This page will show developer rates.</p>
    </main>
  )
}
