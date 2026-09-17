// @vitest-environment jsdom
import { act, cleanup, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { hydrateRoot } from "react-dom/client";
import { renderToString } from "react-dom/server";
import { afterEach, describe, expect, it, vi } from "vite-plus/test";

import {
  StructureExplorer,
  parseStructures,
  type GetDocumentation,
  type StructureNode,
} from "./structure-explorer";

const items: StructureNode[] = [
  {
    name: "src",
    type: "folder",
    children: [
      {
        id: "public",
        name: "_public",
        type: "folder",
        children: [{ id: "public-layout", name: "route.tsx", type: "file" }],
      },
      {
        id: "auth",
        name: "_auth",
        type: "folder",
        children: [{ id: "auth-layout", name: "route.tsx", type: "file" }],
      },
    ],
  },
];
afterEach(cleanup);

describe("portable structure explorer", () => {
  it("requires distinct IDs for repeated names and rejects unsafe JSON IDs", () => {
    expect(parseStructures(items)).toBe(items);
    expect(() =>
      parseStructures([
        { name: "x", type: "file" },
        { name: "x", type: "file" },
      ]),
    ).toThrow("Duplicate");
    for (const id of [null, "", "../route", "a\\b", "..", "\u0000"])
      expect(() => parseStructures([{ id, name: "route.tsx", type: "file" }])).toThrow("Invalid");
  });
  it("selects repeated filenames independently, supports controlled selection, and scopes multiple instances", () => {
    const onSelect = vi.fn();
    const view = render(
      <>
        <StructureExplorer items={items} onSelect={onSelect} selectedId="public-layout" />
        <StructureExplorer items={items} label="Second" />
      </>,
    );
    const first = screen.getAllByRole("tree")[0];
    const routes = within(first).getAllByRole("treeitem", { name: "route.tsx" });
    fireEvent.click(routes[1]);
    expect(onSelect.mock.calls[0][0].id).toBe("auth-layout");
    expect(routes[0].getAttribute("aria-selected")).toBe("true");
    expect(routes[1].getAttribute("aria-selected")).toBe("false");
    expect(
      new Set(Array.from(view.container.querySelectorAll("input")).map((input) => input.id)).size,
    ).toBe(2);
    expect(view.container.querySelector(".structures-document")).toBeNull();
  });
  it("navigates visible nodes, collapses branches, reveals search results, and restores collapsed state", () => {
    const onSelect = vi.fn();
    render(<StructureExplorer items={items} onSelect={onSelect} />);
    const src = screen.getByRole("treeitem", { name: "src" });
    act(() => src.focus());
    fireEvent.keyDown(src, { key: "ArrowRight" });
    expect(document.activeElement?.getAttribute("aria-label")).toBe("_public");
    fireEvent.keyDown(document.activeElement!, { key: "ArrowLeft" });
    expect(screen.getAllByRole("treeitem", { name: "route.tsx" })).toHaveLength(1);
    fireEvent.change(screen.getByRole("searchbox"), { target: { value: "route" } });
    expect(screen.getAllByRole("treeitem", { name: "route.tsx" })).toHaveLength(2);
    fireEvent.change(screen.getByRole("searchbox"), { target: { value: "" } });
    expect(screen.getAllByRole("treeitem", { name: "route.tsx" })).toHaveLength(1);
    fireEvent.keyDown(src, { key: "End" });
    expect(document.activeElement?.getAttribute("data-structure-id")).toBe("auth-layout");
    fireEvent.keyDown(document.activeElement!, { key: "Enter" });
    expect(onSelect.mock.calls.at(-1)?.[0].id).toBe("auth-layout");
    fireEvent.keyDown(document.activeElement!, { key: "Home" });
    expect(document.activeElement).toBe(src);
    fireEvent.change(screen.getByRole("searchbox"), { target: { value: "nothing" } });
    expect(screen.getByRole("status").textContent).toContain("No matching");
  });
  it("cancels stale documentation, ignores late results, and displays missing/error/retry states", async () => {
    let resolveFirst!: (value: string) => void;
    let firstSignal!: AbortSignal;
    const load = vi.fn<GetDocumentation>((node, { signal }) => {
      if (node.id === "public-layout") {
        firstSignal = signal;
        return new Promise((resolve) => {
          resolveFirst = resolve;
        });
      }
      return null;
    });
    const view = render(
      <StructureExplorer items={items} getDocumentation={load} defaultSelectedId="public-layout" />,
    );
    await waitFor(() => expect(load).toHaveBeenCalledTimes(1));
    expect(screen.getByRole("status").textContent).toContain("Loading");
    fireEvent.click(screen.getAllByRole("treeitem", { name: "route.tsx" })[1]);
    await waitFor(() =>
      expect(screen.getByRole("status").textContent).toContain("No documentation"),
    );
    expect(firstSignal.aborted).toBe(true);
    await act(async () => resolveFirst("STALE"));
    expect(screen.queryByText("STALE")).toBeNull();
    const retry = vi
      .fn<GetDocumentation>()
      .mockRejectedValueOnce(new Error("Offline"))
      .mockResolvedValue("# Loaded\n\n<script>alert(1)</script>\n\n[unsafe](javascript:alert(1))");
    view.rerender(
      <StructureExplorer items={items} getDocumentation={retry} selectedId="auth-layout" />,
    );
    await screen.findByRole("alert");
    fireEvent.click(screen.getByRole("button", { name: "Try again" }));
    await screen.findByRole("heading", { name: "Loaded" });
    expect(view.container.querySelector("script")).toBeNull();
    expect(view.container.querySelector('a[href^="javascript:"]')).toBeNull();
  });
  it("server-renders and hydrates two instances without mismatches or eager documentation requests", async () => {
    const error = vi.spyOn(console, "error").mockImplementation(() => {});
    const load = vi.fn<GetDocumentation>(() => null);
    const ui = (
      <>
        <StructureExplorer items={items} getDocumentation={load} />
        <StructureExplorer items={items} />
      </>
    );
    const container = document.createElement("div");
    container.innerHTML = renderToString(ui);
    document.body.append(container);
    expect(load).not.toHaveBeenCalled();
    let root!: ReturnType<typeof hydrateRoot>;
    await act(async () => {
      root = hydrateRoot(container, ui);
    });
    expect(error).not.toHaveBeenCalled();
    await act(async () => root.unmount());
    container.remove();
    error.mockRestore();
  });
});
