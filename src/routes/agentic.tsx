import { createFileRoute } from "@tanstack/react-router";

import { AgenticPage } from "#/components/agentic-page.tsx";

export const Route = createFileRoute("/agentic")({
  component: AgenticPage,
});
