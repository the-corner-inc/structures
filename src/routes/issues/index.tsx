import { createFileRoute, Navigate } from "@tanstack/react-router"

export const Route = createFileRoute("/issues/")({
  component: IssuesIndex,
})

function IssuesIndex() {
  // Show work in progress page for the base issues route
  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col items-center justify-center py-20">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="mb-4 h-16 w-16 text-yellow-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 8v4m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"
        />
      </svg>
      <h2 className="mb-2 text-2xl font-bold">Work in Progress</h2>
      <p className="text-gray-600 dark:text-gray-400">
        This page is under construction. Let us know your thoughts!
      </p>
    </div>
  )
}
