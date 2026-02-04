import { queryOptions } from "@tanstack/react-query"
import { $getUser, $getUsers } from "./functions"

export const authQueryOptions = () =>
  queryOptions({
    queryKey: ["user"],
    queryFn: ({ signal }) => $getUser({ signal }),
  })

export const usersQueryOptions = () =>
  queryOptions({
    queryKey: ["users"],
    queryFn: ({ signal }) => $getUsers({ signal }),
  })

export type AuthQueryResult = Awaited<ReturnType<typeof $getUser>>
export type UsersQueryResult = Awaited<ReturnType<typeof $getUsers>>
