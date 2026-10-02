import { createFileRoute } from "@tanstack/react-router";

import { IssueCards } from "#/components/issue-cards.tsx";
import { pageHead } from "#/lib/seo.ts";

export const Route = createFileRoute("/issues/")({
  head: () =>
    pageHead(
      "Software Issue Examples & Organization",
      "Browse example software issues with Conventional Commit titles, priority levels, type labels, and status badges. Learn how each tag organizes work.",
    ),
  component: IssuesIndex,
});

function IssuesIndex() {
  return <IssueCards />;
}
