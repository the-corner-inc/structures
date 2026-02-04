import { useSuspenseQuery } from "@tanstack/react-query"
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router"
import { SignOutButton } from "~/components/sign-out-button"
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"
import { Button } from "~/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "~/components/ui/navigation-menu"
import { authQueryOptions } from "~/lib/auth/queries"

export const Route = createFileRoute("/_auth")({
  component: AuthLayout,
  beforeLoad: async ({ context }) => {
    const user = await context.queryClient.ensureQueryData({
      ...authQueryOptions(),
      revalidateIfStale: true,
    })
    if (!user) {
      throw redirect({ to: "/" })
    }

    if (!user.role || user.role !== "admin") {
      throw redirect({ to: "/" })
    }

    // re-return to update type as non-null for child routes
    return { user }
  },
})

function AuthLayout() {
  const { data: user } = useSuspenseQuery(authQueryOptions())

  const ratesLinks = [
    {
      href: "/rates/designers",
      title: "Designers",
      description: "Explore our competitive rates for top-notch design services.",
    },
    {
      href: "/rates/developers",
      title: "Developers",
      description: "Discover our affordable rates for expert development solutions.",
    },
  ]

  const contractsLinks = [
    {
      href: "/contracts/employments/permanent",
      title: "Permanent Employments",
      description: "Manage and review permanent employment contracts.",
    },
    {
      href: "/contracts/employments/freelance",
      title: "Freelance Contracts",
      description: "Oversee freelance contract agreements and details.",
    },
  ]

  return (
    <div className="flex items-center justify-center">
      <NavigationMenu className="fixed top-8 left-1/2 z-50 -translate-x-1/2 rounded-md border bg-black/80 px-4 py-2 backdrop-blur-xs print:hidden">
        <NavigationMenuList className="gap-2">
          <NavigationMenuItem>
            <NavigationMenuLink href="/invoices" className="px-4 py-2 font-semibold">
              Invoices
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger>Rates</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="p-2">
                {ratesLinks.map((link) => (
                  <li key={link.href} className="mb-2 last:mb-0">
                    <NavigationMenuLink
                      href={link.href}
                      className="block rounded px-4 py-2"
                    >
                      <div className="font-semibold">{link.title}</div>
                      <div className="text-xs opacity-40">{link.description}</div>
                    </NavigationMenuLink>
                  </li>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger>Contracts</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="p-2">
                {contractsLinks.map((link) => (
                  <li key={link.href} className="mb-2 last:mb-0">
                    <NavigationMenuLink
                      href={link.href}
                      className="block rounded px-4 py-2"
                    >
                      <div className="font-semibold">{link.title}</div>
                      <div className="text-xs opacity-40">{link.description}</div>
                    </NavigationMenuLink>
                  </li>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <a className="fixed top-8 right-8 z-50 print:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <span>
              <Avatar>
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
            </span>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <a href="/me" className="w-full justify-start text-left">
              <Button
                type="button"
                variant="ghost"
                className="w-full justify-start text-left"
              >
                My account
              </Button>
            </a>
            <SignOutButton />
          </DropdownMenuContent>
        </DropdownMenu>
      </a>

      <Outlet />
    </div>
  )
}
