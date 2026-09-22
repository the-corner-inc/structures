import { createFileRoute } from "@tanstack/react-router";

import { IssueCards } from "#/components/issue-cards.tsx";

export const Route = createFileRoute("/issues/")({
  component: IssuesIndex,
});

function IssuesIndex() {
  return <IssueCards />;
}
