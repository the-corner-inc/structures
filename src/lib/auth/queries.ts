import { queryOptions } from "@tanstack/react-query";

import { $getUser } from "#/lib/auth/functions.ts";

export const authQueryOptions = () =>
  queryOptions({
    queryKey: ["auth"],
    queryFn: ({ signal }) => $getUser({ signal }),
  });
