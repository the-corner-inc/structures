import { useMutation } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { LoaderCircleIcon } from "lucide-react";
import { useState } from "react";

import { env } from "#/env/client.ts";
import { authClient } from "#/lib/auth/auth-client.ts";

export const Route = createFileRoute("/_guest/login")({ component: LoginPage });

function LoginPage() {
  const { redirectUrl } = Route.useRouteContext();
  const [error, setError] = useState<string>();
  const login = useMutation({
    mutationFn: async (credentials: { email: string; password: string }) => {
      const result = await authClient.signIn.email({ ...credentials, callbackURL: redirectUrl });
      if (result.error) throw new Error(result.error.message || "Sign in failed.");
      return result.data;
    },
    onError: (cause) => setError(cause.message),
  });

  const submit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!env.VITE_AUTH_ENABLED || login.isPending) return;
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");
    if (typeof email === "string" && typeof password === "string") {
      setError(undefined);
      login.mutate({ email, password });
    }
  };

  return (
    <section className="auth-content">
      <div>
        <p className="eyebrow">Your structures, everywhere</p>
        <h1>Welcome back</h1>
        <p>Sign in to manage private structures and share public ones.</p>
      </div>

      {!env.VITE_AUTH_ENABLED && (
        <div className="auth-notice">
          Accounts are wired for Better Auth but are not enabled on this deployment yet.
        </div>
      )}

      <form onSubmit={submit}>
        <label>
          Email
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            disabled={!env.VITE_AUTH_ENABLED}
          />
        </label>
        <label>
          Password
          <input
            name="password"
            type="password"
            autoComplete="current-password"
            required
            disabled={!env.VITE_AUTH_ENABLED}
          />
        </label>
        {error && <p className="form-error">{error}</p>}
        <button
          type="submit"
          className="primary-button"
          disabled={!env.VITE_AUTH_ENABLED || login.isPending}
        >
          {login.isPending && <LoaderCircleIcon className="spin" />} Sign in
        </button>
      </form>

      <p className="auth-switch">
        New here? <Link to="/signup">Create an account</Link>
      </p>
    </section>
  );
}
