import type { ErrorComponentProps } from "@tanstack/react-router";

export function DefaultCatchBoundary({ error, reset }: ErrorComponentProps) {
  return (
    <main className="centered-state">
      <p className="eyebrow">Something went wrong</p>
      <h1>The explorer could not be rendered.</h1>
      <p>{error.message}</p>
      <button type="button" className="primary-button" onClick={reset}>
        Try again
      </button>
    </main>
  );
}
