// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vite-plus/test";

import { IssueCards } from "./issue-cards";

vi.mock("@tanstack/react-router", () => ({
  Link: ({ to, params, search, className, children }: any) => (
    <a href={`#${to}`} className={className} onClick={(event) => event.preventDefault()}>
      {children}
    </a>
  ),
  useNavigate: () => vi.fn(),
}));

vi.mock("@tanstack/react-query", () => ({
  useQuery: ({ enabled, queryFn }: any) => {
    if (!enabled) {
      return { data: undefined, isPending: false, isError: false, error: null, refetch: vi.fn() };
    }
    try {
      return {
        data: queryFn({ signal: undefined }),
        isPending: false,
        isError: false,
        error: null,
        refetch: vi.fn(),
      };
    } catch (error) {
      return {
        data: undefined,
        isPending: false,
        isError: true,
        error,
        refetch: vi.fn(),
      };
    }
  },
}));

// readme body per resolved label element id (see labelElementId in issue-cards.tsx)
const readmeByElement: Record<string, string> = {
  P1: "# P1\n\nHigh-priority item.",
  Feat: "# Feature\n\nAdds a new feature.",
  "In Review": "# In Review\n\nAwaiting review.",
  "To Do": "# To Do\n\nPrioritized, not started.",
  "On hold": "# On hold\n\nTemporarily paused.",
  Documentation: "# Documentation\n\nDocs-only change.",
};

vi.mock("#/lib/structures.ts", async (importOriginal) => {
  const actual = await importOriginal<typeof import("#/lib/structures.ts")>();
  return {
    ...actual,
    defaultSource: () => "/assets/software/",
    fetchMarkdown: (_source: string, element: string) => {
      const body = readmeByElement[element];
      if (!body) throw new Error(`No documentation was found for “${element}”.`);
      return body;
    },
  };
});

afterEach(cleanup);

describe("issue cards label sidenav", () => {
  it("explains a hovered priority label in the sidebar using its readme", async () => {
    render(<IssueCards />);
    expect(screen.getByText("Conventional commit naming")).toBeTruthy();
    expect(screen.getByText("Hover a label to read what it means")).toBeTruthy();

    const labels = screen.getAllByRole("button", { name: "P1" });
    const p1 = labels[0];
    fireEvent.pointerEnter(p1);

    await waitFor(() => expect(screen.getByRole("heading", { name: "P1" })).toBeTruthy());
    expect(screen.getByText(/High-priority item/)).toBeTruthy();
  });

  it("explains a hovered status label using its own readme", async () => {
    render(<IssueCards />);
    fireEvent.pointerEnter(screen.getAllByRole("button", { name: "In Review" })[0]);
    await waitFor(() => expect(screen.getByText(/Awaiting review/)).toBeTruthy());
  });

  it("shows a no-description message for a missing readme", async () => {
    render(<IssueCards />);
    fireEvent.pointerEnter(screen.getAllByRole("button", { name: "CI" })[0]);
    await waitFor(() => expect(screen.getByText(/No description found/)).toBeTruthy());
  });
});
