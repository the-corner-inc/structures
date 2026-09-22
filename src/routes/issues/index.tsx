import { createFileRoute, redirect } from "@tanstack/react-router";

import { IssuesTopics } from "#/components/issues-topics.tsx";
import { validateExplorerSearch } from "#/lib/router-search.ts";

export const Route = createFileRoute("/issues/")({
  validateSearch: validateExplorerSearch,
  beforeLoad: ({ search }) => {
    // Structure links shared before the topic list keep opening the software explorer.
    if (search.source) {
      throw redirect({
        to: "/issues/$library",
        params: { library: "software" },
        search: { source: search.source },
      });
    }
  },
  component: IssuesIndex,
});

function IssuesIndex() {
  return <IssuesTopics />;
}
