import { createFileRoute } from "@tanstack/react-router";

import { PrioritiesStandard } from "#/components/priorities-standard.tsx";

export const Route = createFileRoute("/issues/priorities")({
  component: IssuesPriorities,
});

function IssuesPriorities() {
  return <PrioritiesStandard />;
}
