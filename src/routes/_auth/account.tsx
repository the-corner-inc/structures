import { createFileRoute, Link } from "@tanstack/react-router";
import { FolderPlusIcon } from "lucide-react";

import { useAuthSuspense } from "#/lib/auth/hooks.ts";

export const Route = createFileRoute("/_auth/account")({ component: AccountPage });

function AccountPage() {
  const { user } = useAuthSuspense();
  return (
    <main className="account-page">
      <p className="eyebrow">Personal library</p>
      <h1>{user?.name ? `${user.name}’s structures` : "Your structures"}</h1>
      <div className="account-empty">
        <FolderPlusIcon />
        <h2>Create your first structure</h2>
        <p>
          The persistence workflow is the next milestone; the protected account boundary is ready.
        </p>
        <Link to="/folders" search={{}} className="primary-button">
          Browse public templates
        </Link>
      </div>
    </main>
  );
}
