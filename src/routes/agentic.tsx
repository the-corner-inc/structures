import { createFileRoute } from "@tanstack/react-router";

import { AgenticPage } from "#/components/agentic-page.tsx";
import { validateAgenticSearch } from "#/lib/agentic.ts";
import { pageHead } from "#/lib/seo.ts";

export const Route = createFileRoute("/agentic")({
  validateSearch: validateAgenticSearch,
  head: () =>
    pageHead(
      "AI Agents, Skills & Instruction Templates",
      "Understand AI agent runtimes, tools, skills, plugins, and instructions. Explore how they connect and download Markdown templates for your project.",
    ),
  component: AgenticPage,
});
