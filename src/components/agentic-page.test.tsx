// @vitest-environment jsdom

import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, expect, it } from "vite-plus/test";

import { AgenticPage } from "./agentic-page.tsx";

afterEach(cleanup);

it("selects each building block and updates its README and Markdown download", () => {
  render(<AgenticPage />);
  expect(screen.getByRole("heading", { level: 1, name: "Agentic" })).toBeTruthy();

  const examples = [
    ["Harness", "Project workspace harness", "harness-README.md"],
    ["Agents", "Code review agent", "agents-README.md"],
    ["Plugins", "Team development plugin", "plugins-README.md"],
    ["MCP Servers", "Project knowledge MCP server", "mcp-servers-README.md"],
    ["Skills", "Review changes skill", "skills-README.md"],
    ["Instructions", "Team working instructions", "instructions-README.md"],
    ["Hooks", "Post-edit validation hook", "hooks-README.md"],
    ["Tools", "Search project docs tool", "tools-README.md"],
    ["AGENTS.md", "AGENTS.md", "AGENTS.md"],
    ["CONTEXT.md", "CONTEXT.md", "CONTEXT.md"],
  ] as const;

  expect(screen.getByRole("button", { name: "Harness", pressed: true })).toBeTruthy();
  for (const [name, heading, filename] of examples) {
    const card = screen.getByRole("button", { name });
    fireEvent.click(card);

    expect(screen.getAllByRole("button", { pressed: true })).toEqual([card]);
    const readme = screen.getByRole("region", { name: `${name} / README.md` });
    expect(card.getAttribute("aria-controls")).toBe(readme.id);
    expect(within(readme).getByRole("heading", { level: 1, name: heading })).toBeTruthy();
    expect(within(readme).getAllByRole("article")).toHaveLength(1);
    expect(within(readme).getByRole("heading", { name: `How ${name} fits in` })).toBeTruthy();
    const download = within(readme).getByRole("link", { name: `Download ${name} template` });
    expect(download.getAttribute("download")).toBe(filename);
    expect(decodeURIComponent(download.getAttribute("href")!)).toContain(`,# ${heading}\n`);
  }
});
