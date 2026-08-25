import { createFileRoute, Link, Outlet, redirect } from "@tanstack/react-router";
import { FolderTreeIcon } from "lucide-react";

import { authQueryOptions } from "#/lib/auth/queries.ts";

export const Route = createFileRoute("/_guest")({
  component: GuestLayout,
  beforeLoad: async ({ context }) => {
    const user = await context.queryClient.query({ ...authQueryOptions(), staleTime: "static" });
    if (user) throw redirect({ to: "/account" });
    return { redirectUrl: "/account" };
  },
});

function GuestLayout() {
  return (
    <main className="auth-page">
      <div className="auth-card">
        <Link to="/folders" search={{}} className="auth-brand">
          <FolderTreeIcon /> Structures
        </Link>
        <Outlet />
      </div>
    </main>
  );
}
