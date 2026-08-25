import { useMutation } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { LoaderCircleIcon } from "lucide-react";
import { useState } from "react";

import { env } from "#/env/client.ts";
import { authClient } from "#/lib/auth/auth-client.ts";

export const Route = createFileRoute("/_guest/signup")({ component: SignupPage });

function SignupPage() {
  const { redirectUrl } = Route.useRouteContext();
  const [error, setError] = useState<string>();
  const signup = useMutation({
    mutationFn: async (details: { name: string; email: string; password: string }) => {
      const result = await authClient.signUp.email({ ...details, callbackURL: redirectUrl });
      if (result.error) throw new Error(result.error.message || "Sign up failed.");
      return result.data;
    },
    onError: (cause) => setError(cause.message),
  });

  const submit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!env.VITE_AUTH_ENABLED || signup.isPending) return;
    const data = new FormData(event.currentTarget);
    const name = data.get("name");
    const email = data.get("email");
    const password = data.get("password");
    if (typeof name === "string" && typeof email === "string" && typeof password === "string") {
      setError(undefined);
      signup.mutate({ name, email, password });
    }
  };

  return (
    <section className="auth-content">
      <div>
        <p className="eyebrow">Start a shared library</p>
        <h1>Create your account</h1>
        <p>Save structures now and choose which ones to share later.</p>
      </div>
      {!env.VITE_AUTH_ENABLED && (
        <div className="auth-notice">Account creation is coming soon.</div>
      )}
      <form onSubmit={submit}>
        <label>
          Name
          <input name="name" autoComplete="name" required disabled={!env.VITE_AUTH_ENABLED} />
        </label>
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
            minLength={8}
            autoComplete="new-password"
            required
            disabled={!env.VITE_AUTH_ENABLED}
          />
        </label>
        {error && <p className="form-error">{error}</p>}
        <button
          type="submit"
          className="primary-button"
          disabled={!env.VITE_AUTH_ENABLED || signup.isPending}
        >
          {signup.isPending && <LoaderCircleIcon className="spin" />} Create account
        </button>
      </form>
      <p className="auth-switch">
        Already have an account? <Link to="/login">Sign in</Link>
      </p>
    </section>
  );
}
