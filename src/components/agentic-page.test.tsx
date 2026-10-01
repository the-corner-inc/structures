// @vitest-environment jsdom

import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, expect, it } from "vite-plus/test";

import { AgenticPage } from "./agentic-page.tsx";

afterEach(cleanup);

it("highlights the elements each card can include without changing the selected template", () => {
  const { container } = render(<AgenticPage />);
  const highlighted = () =>
    Array.from(container.querySelectorAll('[data-embedded="true"] .agentic-card-select'))
      .map((button) => button.getAttribute("aria-label") ?? "")
      .sort();
  const conditional = () =>
    Array.from(container.querySelectorAll('[data-conditional="true"] .agentic-card-select'))
      .map((button) => button.getAttribute("aria-label") ?? "")
      .sort();
  const relationships: Array<[string, string[], string[]]> = [
    [
      "Harness",
      ["Plugins", "Agents", "MCP Servers", "Skills", "Instructions", "Hooks", "Tools"],
      [],
    ],
    ["Plugins", ["Agents", "MCP Servers", "Skills", "Instructions", "Hooks", "Tools"], []],
    ["Agents", ["MCP Servers", "Skills", "Instructions", "Hooks", "Tools"], ["Hooks"]],
    ["MCP Servers", ["Skills", "Instructions", "Tools"], ["Skills"]],
    ["Skills", ["Instructions", "Hooks", "Tools"], ["Hooks", "Tools"]],
    ["Instructions", [], []],
    ["Hooks", ["Instructions"], ["Instructions"]],
    ["Tools", ["Instructions"], []],
  ];

  expect(highlighted()).toEqual([]);
  for (const [name, children, extensions] of relationships) {
    const button = screen.getByRole("button", { name });
    fireEvent.pointerEnter(button);
    expect(highlighted()).toEqual([...children].sort());
    expect(conditional()).toEqual([...extensions].sort());
    expect(screen.getByRole("status").textContent).toContain(`${name}:`);
    expect(screen.getByRole("button", { name: "Harness", pressed: true })).toBeTruthy();
    fireEvent.pointerLeave(button);
    expect(highlighted()).toEqual([]);
    expect(conditional()).toEqual([]);
    expect(screen.getByRole("status").textContent).toContain("Hover or focus a card");
    fireEvent.focus(button);
    expect(highlighted()).toEqual([...children].sort());
    expect(conditional()).toEqual([...extensions].sort());
    fireEvent.blur(button);
    expect(highlighted()).toEqual([]);
    expect(conditional()).toEqual([]);
  }

  const agents = screen.getByRole("button", { name: "Agents" });
  const prompt = screen.getByRole("button", { name: "Prompt" });
  fireEvent.focus(agents);
  expect(highlighted()).toEqual(["MCP Servers", "Skills", "Instructions", "Hooks", "Tools"].sort());
  fireEvent.blur(agents, { relatedTarget: prompt });
  fireEvent.focus(prompt);
  expect(highlighted()).toEqual(["MCP Servers", "Skills", "Instructions", "Hooks", "Tools"].sort());
  fireEvent.pointerEnter(screen.getByRole("button", { name: "Tools" }));
  expect(highlighted()).toEqual(["Instructions"]);
  fireEvent.pointerLeave(screen.getByRole("button", { name: "Tools" }));
  expect(highlighted()).toEqual(["MCP Servers", "Skills", "Instructions", "Hooks", "Tools"].sort());
  fireEvent.blur(prompt);
  expect(highlighted()).toEqual([]);
});

it("selects each building block and updates its README and Markdown download", () => {
  render(<AgenticPage />);
  expect(screen.getByRole("heading", { level: 1, name: "Agentic" })).toBeTruthy();

  const examples = [
    ["Harness", "Project workspace harness", "harness-README.md"],
    ["Agents", "Code review agent", "agents-README.md"],
    ["Prompt", "Prompt", "prompt-README.md"],
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
    const readme = screen.getByRole("region", {
      name:
        name === "Prompt"
          ? "Agents / Prompt"
          : name.endsWith(".md")
            ? `Instructions / ${name}`
            : `${name} / README.md`,
    });
    expect(card.getAttribute("aria-controls")).toBe(readme.id);
    expect(within(readme).getByRole("heading", { level: 1, name: heading })).toBeTruthy();
    expect(within(readme).getAllByRole("article")).toHaveLength(1);
    expect(within(readme).getByRole("heading", { name: `How ${name} fits in` })).toBeTruthy();
    const download = within(readme).getByRole("link", { name: `Download ${name} template` });
    expect(download.getAttribute("download")).toBe(filename);
    expect(decodeURIComponent(download.getAttribute("href")!)).toContain(`,# ${heading}\n`);
  }
});

it("selects the Prompt badge inside Agents and can return to the agent template", () => {
  render(<AgenticPage />);
  const agents = screen.getByRole("button", { name: "Agents" });
  const card = agents.closest<HTMLElement>(".agentic-card")!;
  const prompt = within(card).getByRole("button", {
    name: "Prompt",
    description: "The request you give an agent.",
  });
  fireEvent.click(prompt);

  expect(screen.getAllByRole("button", { pressed: true })).toEqual([prompt]);
  expect(card.getAttribute("data-selected")).toBe("true");
  const readme = screen.getByRole("region", { name: "Agents / Prompt" });
  expect(
    within(readme).getByRole("heading", { name: "Prompt, instructions, and context" }),
  ).toBeTruthy();
  expect(within(readme).getByRole("heading", { name: "Example prompt" })).toBeTruthy();

  fireEvent.click(agents);
  expect(screen.getAllByRole("button", { pressed: true })).toEqual([agents]);
  expect(screen.getByRole("region", { name: "Agents / README.md" })).toBeTruthy();
});

it("groups instruction files as badges and can return to the Instructions description", () => {
  const { container } = render(<AgenticPage />);
  const instructions = screen.getByRole("button", { name: "Instructions" });
  const card = instructions.closest(".agentic-card")!;
  const files = within(card as HTMLElement).getByRole("group", { name: "Instruction files" });

  expect(container.querySelectorAll(".agentic-card")).toHaveLength(8);
  expect(container.querySelector("button button")).toBeNull();
  for (const name of ["AGENTS.md", "CONTEXT.md"]) {
    const badge = within(files).getByRole("button", { name });
    fireEvent.click(badge);

    expect(screen.getAllByRole("button", { pressed: true })).toEqual([badge]);
    expect(card.getAttribute("data-selected")).toBe("true");
    expect(screen.getByRole("region", { name: `Instructions / ${name}` })).toBeTruthy();
  }

  fireEvent.click(instructions);
  expect(screen.getAllByRole("button", { pressed: true })).toEqual([instructions]);
  expect(screen.getByRole("region", { name: "Instructions / README.md" })).toBeTruthy();
});
