import { createMiddleware } from "@tanstack/react-start";
import { setResponseStatus } from "@tanstack/react-start/server";

import { _getUser } from "#/lib/auth/functions.ts";

export const authMiddleware = createMiddleware().server(async ({ next }) => {
  const user = await _getUser();
  if (!user) {
    setResponseStatus(401);
    throw new Error("Unauthorized");
  }
  return next({ context: { user } });
});

export const freshAuthMiddleware = createMiddleware().server(async ({ next }) => {
  const user = await _getUser({ disableCookieCache: true });
  if (!user) {
    setResponseStatus(401);
    throw new Error("Unauthorized");
  }
  return next({ context: { user } });
});
