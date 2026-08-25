import { useSuspenseQuery } from "@tanstack/react-query";

import { authQueryOptions } from "#/lib/auth/queries.ts";

export function useAuthSuspense() {
  const { data: user } = useSuspenseQuery(authQueryOptions());
  return { user };
}
