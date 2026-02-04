import { Signal } from "@preact/signals-react"
import { useForm } from "@tanstack/react-form"
import { useSuspenseQuery } from "@tanstack/react-query"
import { createFileRoute } from "@tanstack/react-router"
import { format } from "date-fns"
import { ChevronDownIcon } from "lucide-react"
import { toast } from "sonner"
import z from "zod"
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"
import { Button } from "~/components/ui/button"
import { Calendar } from "~/components/ui/calendar"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "~/components/ui/field"
import { Input } from "~/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover"
import authClient from "~/lib/auth/auth-client"
import { authQueryOptions } from "~/lib/auth/queries"

export const Route = createFileRoute("/_auth/me")({
  component: RouteComponent,
})

const formSchema = z.object({
  bank: z.string(),
  birthDate: z.date(),
  city: z.string(),
  honorificPrefix: z.string(),
  name: z.string().min(1, "Title is required"),
  iBan: z.string(),
  logo: z.url("Logo must be a valid URL"),
  street: z.string(),
})

function RouteComponent() {
  const { data: user } = useSuspenseQuery(authQueryOptions())
  const $loading = new Signal(false)

  const form = useForm({
    defaultValues: {
      bank: user?.bank ?? "",
      birthDate: user?.birthDate ? new Date(user.birthDate) : undefined,
      city: user?.city ?? "",
      honorificPrefix: user?.honorificPrefix ?? "",
      name: user?.name ?? "",
      iBan: user?.iBan ?? "",
      logo: user?.logo ?? "",
      street: user?.street ?? "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      if ($loading.value) return

      $loading.value = true

      const result = await authClient.updateUser(value)
      $loading.value = false

      if (result.error) {
        console.error(result.error)
        toast.error("An error occurred occurred", {
          description: result.error.message,
        })

        return
      }

      toast("User has been updated", {
        description: "Your profile information has been successfully updated.",
      })
    },
  })

  return (
    <div className="w-full min-w-sm">
      <Avatar className="m-auto mb-12 h-24 w-24">
        <AvatarImage
          src={user?.image ?? "https://github.com/shadcn.png"}
          alt={user?.name ?? "User Avatar"}
        />
        <AvatarFallback>
          {user?.name
            ? user.name
                .split(" ")
                .map((n) => n[0])
                .join("")
            : "?"}
        </AvatarFallback>
      </Avatar>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          form.handleSubmit()
        }}
      >
        <FieldGroup>
          <FieldSet className="rounded-md border border-zinc-200 bg-white px-6 pt-3 pb-7 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
            <FieldLegend>About you</FieldLegend>
            <FieldDescription>
              This information will be displayed on your profile, contract and invoices.
            </FieldDescription>
            <FieldGroup>
              <form.Field
                name="name"
                children={(field) => {
                  return (
                    <Field>
                      <FieldLabel htmlFor={field.name}>Full name</FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="John Doe"
                        autoComplete="name"
                        required
                      />
                    </Field>
                  )
                }}
              />

              <form.Field
                name="honorificPrefix"
                children={(field) => {
                  return (
                    <Field>
                      <FieldLabel htmlFor={field.name}>Honorific Prefix</FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="Mrs./Mr./..."
                        autoComplete="honorific-prefix"
                        required
                      />
                    </Field>
                  )
                }}
              />

              <form.Field
                name="birthDate"
                children={(field) => {
                  return (
                    <Field>
                      <FieldLabel htmlFor={field.name}>Birth Date</FieldLabel>
                      <Popover>
                        <PopoverTrigger>
                          <Button
                            variant="outline"
                            data-empty={!field.state.value}
                            id={field.name}
                            name={field.name}
                            className="data-[empty=true]:text-muted-foreground w-full justify-between text-left font-normal"
                          >
                            {field.state.value ? (
                              format(field.state.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <ChevronDownIcon />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={
                              field.state.value ? new Date(field.state.value) : undefined
                            }
                            onSelect={(date) => {
                              field.handleChange(date)
                            }}
                            captionLayout="dropdown"
                            defaultMonth={
                              field.state.value ? new Date(field.state.value) : undefined
                            }
                          />
                        </PopoverContent>
                      </Popover>
                    </Field>
                  )
                }}
              />
            </FieldGroup>
          </FieldSet>

          <FieldSet className="rounded-md border border-zinc-200 bg-white px-6 pt-3 pb-7 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
            <FieldLegend>Address</FieldLegend>
            <FieldDescription>For contract purposes</FieldDescription>
            <FieldGroup>
              <form.Field
                name="city"
                children={(field) => {
                  return (
                    <Field>
                      <FieldLabel htmlFor={field.name}>City</FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="City"
                        autoComplete="address-level2"
                        required
                      />
                    </Field>
                  )
                }}
              />

              <form.Field
                name="street"
                children={(field) => {
                  return (
                    <Field>
                      <FieldLabel htmlFor={field.name}>Street</FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="Street address"
                        autoComplete="street-address"
                        required
                      />
                    </Field>
                  )
                }}
              />
            </FieldGroup>
          </FieldSet>

          <FieldSet className="rounded-md border border-zinc-200 bg-white px-6 pt-3 pb-7 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
            <FieldLegend>Bank Details</FieldLegend>
            <FieldDescription>For billing purposes.</FieldDescription>
            <FieldGroup>
              <form.Field
                name="bank"
                children={(field) => {
                  return (
                    <Field>
                      <FieldLabel htmlFor={field.name}>Bank</FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="Bank name"
                        autoComplete="bank-name"
                        required
                      />
                    </Field>
                  )
                }}
              />

              <form.Field
                name="iBan"
                children={(field) => {
                  return (
                    <Field>
                      <FieldLabel htmlFor="iBan">IBAN</FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="DE89 3704 0044 0532 0130 00"
                        autoComplete="iBan"
                      />
                    </Field>
                  )
                }}
              />

              <form.Field
                name="logo"
                children={(field) => {
                  return (
                    <Field>
                      <FieldLabel htmlFor={field.name}>Logo URL</FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="https://..."
                        autoComplete="off"
                      />
                      <FieldDescription>
                        Your logo for internal use on invoices.
                      </FieldDescription>
                    </Field>
                  )
                }}
              />
            </FieldGroup>
          </FieldSet>

          <FieldSeparator />
          <Field orientation="horizontal">
            <Button variant="outline" type="button">
              Cancel
            </Button>

            <Button
              type="submit"
              className={$loading.value ? "loading" : undefined}
              disabled={$loading.value}
            >
              Submit
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </div>
  )
}
