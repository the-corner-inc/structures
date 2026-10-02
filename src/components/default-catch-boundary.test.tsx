// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vite-plus/test";

import { DefaultCatchBoundary } from "./default-catch-boundary";

afterEach(cleanup);

it.each<[unknown, string]>([
  [new Error("Could not load the page."), "Could not load the page."],
  [null, "An unexpected error occurred."],
  ["failed", "An unexpected error occurred."],
])("renders thrown value %s and lets the user retry", (error, message) => {
  const reset = vi.fn();
  render(<DefaultCatchBoundary error={error} reset={reset} />);

  expect(screen.getByText(message)).toBeTruthy();
  fireEvent.click(screen.getByRole("button", { name: "Try again" }));
  expect(reset).toHaveBeenCalledOnce();
});
