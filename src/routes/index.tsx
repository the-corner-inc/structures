import { createFileRoute } from "@tanstack/react-router";

import { HomeTopics } from "#/components/home-topics.tsx";

export const Route = createFileRoute("/")({
  component: HomeIndex,
});

function HomeIndex() {
  return <HomeTopics />;
}
