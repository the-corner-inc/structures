import { Link } from "@tanstack/react-router";

export function DefaultNotFound() {
  return (
    <main className="centered-state">
      <p className="eyebrow">404</p>
      <h1>That structure does not exist.</h1>
      <Link to="/folders" search={{}} className="primary-button">
        Return to the explorer
      </Link>
    </main>
  );
}
