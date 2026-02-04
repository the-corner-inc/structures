import { useSuspenseQuery } from "@tanstack/react-query"
import { createFileRoute } from "@tanstack/react-router"
import * as React from "react"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { authQueryOptions, usersQueryOptions } from "~/lib/auth/queries"

export const Route = createFileRoute("/_auth/_admin/invoices")({
  component: InvoicesPage,
})

const RATE_OPTIONS = [
  {
    value: "internal",
    subOptions: [{ value: "", label: "", price: 29 }],
  },
  {
    value: "developer",
    subOptions: [
      { value: "apprentice", label: "Apprentice", price: 80 },
      { value: "junior", label: "Junior", price: 160 },
      { value: "senior", label: "Senior", price: 190 },
    ],
  },
  {
    value: "designer",
    subOptions: [
      { value: "junior", label: "Junior", price: 145 },
      { value: "senior", label: "Senior", price: 170 },
    ],
  },
  {
    value: "ux",
    subOptions: [
      { value: "junior", label: "Junior", price: 160 },
      { value: "senior", label: "Senior", price: 190 },
    ],
  },
]

export function InvoicesPage() {
  const { data: user } = useSuspenseQuery(authQueryOptions())
  const { data: users } = useSuspenseQuery(usersQueryOptions())

  const [creditorId, setCreditorId] = React.useState(users[0]?.id)
  const [debtorId, setDebtorId] = React.useState(user?.id)

  const creditor = users.find((u) => u?.id === creditorId)
  const debtor = users.find((u) => u?.id === debtorId)

  const handleRemove = (id: string) => {
    setEntries((prev) => (prev.length > 1 ? prev.filter((e) => e.id !== id) : prev))
  }
  const [entries, setEntries] = React.useState([
    { id: crypto.randomUUID(), type: "internal", subType: "", hours: 0 },
  ])

  const handleTypeChange = (idx: number, value: string) => {
    setEntries((prev) =>
      prev.map((e, i) =>
        i === idx
          ? {
              ...e,
              type: value,
              subType:
                RATE_OPTIONS.find((opt) => opt.value === value)?.subOptions[0]?.value ||
                "",
            }
          : e,
      ),
    )
  }
  const handleSubTypeChange = (idx: number, value: string) => {
    setEntries((prev) => prev.map((e, i) => (i === idx ? { ...e, subType: value } : e)))
  }
  const handleHoursChange = (idx: number, value: string) => {
    setEntries((prev) =>
      prev.map((e, i) => (i === idx ? { ...e, hours: Number(value) } : e)),
    )
  }
  const handleAdd = () => {
    setEntries((prev) => [
      ...prev,
      { id: crypto.randomUUID(), type: "internal", subType: "", hours: 0 },
    ])
  }
  function getPrice(type: string, subType: string): number {
    const typeObj = RATE_OPTIONS.find((opt) => opt.value === type)
    if (!typeObj) return 0
    if (typeObj.subOptions.length === 1) return typeObj.subOptions[0].price
    const sub = typeObj.subOptions.find((s) => s.value === subType)
    return sub ? sub.price : 0
  }
  const total = entries.reduce((sum, e) => sum + getPrice(e.type, e.subType) * e.hours, 0)
  const dueDate = (() => {
    const d = new Date()
    d.setDate(d.getDate() + 30)
    return d.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    })
  })()

  const defaultLogo = "https://assets.the-corner.io/logos/the_corner-logo.webp"
  const creditorLogo = creditor?.logo || null
  const [showCreditorLogo, setShowCreditorLogo] = React.useState(false)

  const handleLogoClick = () => {
    if (creditorLogo) {
      setShowCreditorLogo((prev) => !prev)
    }
  }

  return (
    <main className="relative mx-auto max-w-xl border-2 border-dashed p-8 py-8">
      <div className="mb-2 flex justify-between">
        <div
          className="flex h-12 w-32 cursor-pointer rounded"
          onClick={handleLogoClick}
          title={creditorLogo ? "Click to toggle logo" : undefined}
        >
          <img
            className="max-h-full max-w-full object-contain not-print:brightness-0 not-print:grayscale not-print:invert"
            src={showCreditorLogo && creditorLogo ? creditorLogo : defaultLogo}
            alt="Logo"
          />
        </div>
        <div className="text-right">
          <select
            className="font-bold print:hidden"
            value={creditorId}
            onChange={(e) => setCreditorId(e.target.value)}
            aria-label="Creditor"
          >
            {users.map((p) => (
              <option key={p?.id} value={p?.id}>
                {p?.name}
              </option>
            ))}
          </select>
          <div>
            <strong className="not-print:hidden">{creditor?.name}</strong>
            <p>{creditor?.street}</p>
            <p>{creditor?.city}</p>
          </div>
        </div>
      </div>

      <div className="mb-6 flex items-center justify-between">
        <div>
          <select
            className="font-bold print:hidden"
            value={debtorId}
            onChange={(e) => setDebtorId(e.target.value)}
            aria-label="Debtor"
          >
            {users.map((p) => (
              <option key={p?.id} value={p?.id}>
                {p?.name}
              </option>
            ))}
          </select>
          <div>
            <strong className="not-print:hidden">{debtor?.name}</strong>
            <p>{debtor?.street}</p>
            <p>{debtor?.city}</p>
          </div>
        </div>
      </div>

      <div>
        <div className="flex w-full flex-col gap-2 text-center">
          <p className="leading-3">{"*".repeat(55)}</p>
          <h1 className="text-2xl font-bold tracking-tight" contentEditable="true">
            INVOICE
          </h1>
          <p>{"*".repeat(55)}</p>
        </div>
      </div>
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-bold" contentEditable="true">
          Title
        </h2>

        <p className="text-sm" contentEditable="true">
          {new Date().toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })}
        </p>
      </div>

      <div className="mb-6 space-y-4 border-t-2 border-dashed pt-4">
        {entries.map((entry, idx) => {
          const typeObj = RATE_OPTIONS.find((opt) => opt.value === entry.type)
          return (
            <div
              key={entry.id}
              className="relative flex items-center justify-between gap-2"
            >
              <Label htmlFor={`type-${idx}`} className="sr-only">
                Type
              </Label>
              <select
                id={`type-${idx}`}
                className="rounded px-2 py-1 not-print:border"
                value={entry.type}
                onChange={(e) => handleTypeChange(idx, e.target.value)}
              >
                {RATE_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value} className="capitalize">
                    {opt.value}
                  </option>
                ))}
              </select>
              {typeObj && typeObj.subOptions.length > 1 && (
                <select
                  id={`subtype-${idx}`}
                  className="rounded px-2 py-1 not-print:border"
                  value={entry.subType || typeObj.subOptions[0].value}
                  onChange={(e) => handleSubTypeChange(idx, e.target.value)}
                >
                  {typeObj.subOptions.map((sub) => (
                    <option key={sub.value} value={sub.value}>
                      {sub.label}
                    </option>
                  ))}
                </select>
              )}

              <div className="flex items-center gap-2">
                <Label htmlFor={`hours-${idx}`} className="sr-only">
                  Hours
                </Label>
                <Input
                  id={`hours-${idx}`}
                  type="number"
                  min={0}
                  className="w-16 print:border-0 print:shadow-none"
                  value={entry.hours}
                  onChange={(e) => handleHoursChange(idx, e.target.value)}
                />
                <span>HRS | {getPrice(entry.type, entry.subType)} CHF</span>
              </div>

              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => handleRemove(entry.id)}
                aria-label="Remove entry"
                disabled={entries.length === 1}
                className="absolute top-0 -right-10 print:hidden"
              >
                <span aria-hidden>x</span>
              </Button>
            </div>
          )
        })}
        <Button
          type="button"
          variant="outline"
          onClick={handleAdd}
          className="print:hidden"
        >
          +
        </Button>
      </div>

      <div className="mt-4 flex items-center justify-between border-t-2 border-dashed pt-4 pb-4">
        <div className="font-semibold">TOTAL AMOUNT</div>
        <div className="font-bold">{total} CHF</div>
      </div>

      <div className="flex items-start justify-between gap-12 border-t-2 border-dashed pt-4">
        <div>
          <p>Pay to:</p>
          <p>{creditor?.name}</p>
        </div>

        <div className="text-right">
          <p>{creditor?.bank ?? "—"}</p>
          <p>{creditor?.iBan ?? "—"}</p>
        </div>
      </div>

      <div className="border-b-2 border-dashed pt-8 pb-4" contentEditable="true">
        Invoice due: {dueDate}
      </div>

      {/* Receipt-style thank you and barcode */}
      <div className="mt-10 w-full text-center">
        <div className="space-between flex w-full gap-2 pb-8">
          <span className="leading-7">{"*".repeat(20)}</span>
          <h2>THANK YOU</h2>
          <span className="leading-7">{"*".repeat(20)}</span>
        </div>
        <img
          src="https://assets.the-corner.io/images/thank-you-barcode.webp"
          alt="Thank you barcode"
          className="mx-auto mt-2 max-h-16 w-full"
        />
      </div>
    </main>
  )
}
