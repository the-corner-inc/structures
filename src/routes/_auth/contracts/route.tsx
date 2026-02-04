import { createFileRoute, Outlet } from "@tanstack/react-router"

export const Route = createFileRoute("/_auth/contracts")({
  component: ContractLayout,
})

function ContractLayout() {
  return (
    <main className="m-h-[297mm] mx-auto my-8 w-[210mm] rounded p-8 font-sans text-base leading-relaxed not-print:border not-print:bg-black print:m-0 print:max-w-none print:p-12 print:text-[12pt]">
      <Outlet />
    </main>
  )
}
