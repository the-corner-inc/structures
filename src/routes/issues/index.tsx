import { createFileRoute, Link } from "@tanstack/react-router"
import { Tag, AlertCircle } from "lucide-react"

export const Route = createFileRoute("/issues/")({
  component: IssuesIndex,
})

function IssuesIndex() {
  const issueCategories = [
    {
      name: "Labels",
      path: "labels",
      description: "Issue labels and categorization",
      icon: "🏷️",
      count: "Multiple"
    },
    {
      name: "Priority",
      path: "priority",
      description: "Priority levels (P0-P4)",
      icon: "⚡",
      count: "5 levels"
    },
    {
      name: "Status",
      path: "status",
      description: "Issue status workflow",
      icon: "📊",
      count: "Multiple"
    },
    {
      name: "Type",
      path: "type",
      description: "Issue types and classifications",
      icon: "📝",
      count: "Multiple"
    }
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-2 text-4xl font-bold">Issue Management</h1>
        <p className="text-muted-foreground">
          Explore issue labels, priorities, and categorization standards
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {issueCategories.map((category) => (
          <Link
            key={category.path}
            to="/issues/$element"
            params={{ element: category.path }}
            className="group block rounded-lg border bg-card p-6 transition-all hover:border-primary hover:shadow-lg"
          >
            <div className="mb-4 flex items-center gap-3">
              <div className="text-4xl">{category.icon}</div>
              <div>
                <h2 className="text-xl font-semibold group-hover:text-primary">
                  {category.name}
                </h2>
                <p className="text-xs text-muted-foreground">{category.count}</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              {category.description}
            </p>
            <div className="mt-4 flex items-center gap-2 text-sm text-primary">
              <Tag className="h-4 w-4" />
              <span>View labels</span>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-12 rounded-lg border bg-muted/50 p-6">
        <h3 className="mb-2 flex items-center gap-2 text-lg font-semibold">
          <AlertCircle className="h-5 w-5" />
          About Issue Labels
        </h3>
        <p className="text-sm text-muted-foreground">
          This section contains standardized issue labels, priorities, and status definitions
          for effective project management. Each label includes documentation explaining its
          purpose and when to use it.
        </p>
      </div>
    </div>
  )
}
