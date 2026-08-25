import { createFileRoute } from "@tanstack/react-router";

async function handleAuthRequest(request: Request) {
  if (process.env.AUTH_ENABLED !== "true") {
    return Response.json(
      { message: "Accounts are not enabled on this deployment yet." },
      { status: 503 },
    );
  }

  const { auth } = await import("#/lib/auth/auth.ts");
  return auth.handler(request);
}

export const Route = createFileRoute("/api/auth/$")({
  server: {
    handlers: {
      GET: ({ request }) => handleAuthRequest(request),
      POST: ({ request }) => handleAuthRequest(request),
    },
  },
});
