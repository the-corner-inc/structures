import { createFileRoute } from "@tanstack/react-router";

import { NamingStandard } from "#/components/naming-standard.tsx";

export const Route = createFileRoute("/naming")({
  component: NamingPage,
});

function NamingPage() {
  return <NamingStandard />;
}
