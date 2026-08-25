import { createServerFn, createServerOnlyFn } from "@tanstack/react-start";
import { getRequest, setResponseHeader } from "@tanstack/react-start/server";

export const $getUser = createServerFn({ method: "GET" }).handler(async () => _getUser());

interface GetUserOptions {
  disableCookieCache?: boolean;
  disableRefresh?: boolean;
}

export const _getUser = createServerOnlyFn(async (query?: GetUserOptions) => {
  const { env } = await import("#/env/server.ts");
  if (!env.AUTH_ENABLED) return null;

  const { auth } = await import("#/lib/auth/auth.ts");
  const sessionResult = await auth.api.getSession({
    headers: getRequest().headers,
    query,
    returnHeaders: true,
  });

  const cookies = sessionResult.headers?.getSetCookie();
  if (cookies?.length) setResponseHeader("Set-Cookie", cookies);
  return sessionResult.response?.user || null;
});
