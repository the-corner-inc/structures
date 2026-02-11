import { createFileRoute, Link } from "@tanstack/react-router"
import { FolderOpen, FileText } from "lucide-react"

export const Route = createFileRoute("/folders/")({
  component: FoldersIndex,
})

function FoldersIndex() {
  const structures = [
    {
      name: "Go",
      path: "go",
      description: "Go project structure standards",
      icon: "🐹"
    },
    {
      name: "Angular",
      path: "angular",
      description: "Angular project structure standards",
      icon: "🅰️"
    },
    {
      name: "User",
      path: "user",
      description: "User-specific folder structures",
      icon: "👤"
    }
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-2 text-4xl font-bold">Folder Structures</h1>
        <p className="text-muted-foreground">
          Explore different project structure standards and best practices
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {structures.map((structure) => (
          <Link
            key={structure.path}
            to="/folders/$element"
            params={{ element: structure.path }}
            className="group block rounded-lg border bg-card p-6 transition-all hover:border-primary hover:shadow-lg"
          >
            <div className="mb-4 flex items-center gap-3">
              <div className="text-4xl">{structure.icon}</div>
              <h2 className="text-2xl font-semibold group-hover:text-primary">
                {structure.name}
              </h2>
            </div>
            <p className="text-sm text-muted-foreground">
              {structure.description}
            </p>
            <div className="mt-4 flex items-center gap-2 text-sm text-primary">
              <FolderOpen className="h-4 w-4" />
              <span>View structure</span>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-12 rounded-lg border bg-muted/50 p-6">
        <h3 className="mb-2 flex items-center gap-2 text-lg font-semibold">
          <FileText className="h-5 w-5" />
          About Folder Structures
        </h3>
        <p className="text-sm text-muted-foreground">
          These folder structures provide standardized organization patterns for different types
          of projects. Each structure includes documentation for folders and files, explaining
          their purpose and best practices.
        </p>
      </div>
    </div>
  )
}
