import { createFileRoute } from "@tanstack/react-router";

import { NamingStandard } from "#/components/naming-standard.tsx";
import { pageHead } from "#/lib/seo.ts";

export const Route = createFileRoute("/naming")({
  head: () =>
    pageHead(
      "Conventional Commits & Naming Standards",
      "Write consistent commit, branch, and issue titles with Conventional Commits. Learn types, optional scopes, and clear descriptions through examples.",
    ),
  component: NamingPage,
});

function NamingPage() {
  return <NamingStandard />;
}
