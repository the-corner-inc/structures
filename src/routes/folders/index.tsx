import { createFileRoute, Link } from "@tanstack/react-router"
import { FolderOpen, FileText, ExternalLink } from "lucide-react"
import { useState } from "react"

export const Route = createFileRoute("/folders/")({
  component: FoldersIndex,
})

function FoldersIndex() {
  const [gistUrl, setGistUrl] = useState("")

  const handleLoadGist = () => {
    if (gistUrl) {
      // For now, just log it. Can be implemented to load custom gist
      console.log("Loading gist:", gistUrl)
      alert("Custom Gist loading will be implemented soon!")
    }
  }

  const handleCreateGist = () => {
    window.open("https://gist.github.com/", "_blank")
  }

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

      {/* Gist URL Input Section */}
      <div className="mb-8 rounded-lg border bg-card p-6">
        <h2 className="mb-4 text-xl font-semibold">Enter your Gist URL</h2>
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="https://gist.github.com/username/..."
            value={gistUrl}
            onChange={(e) => setGistUrl(e.target.value)}
            className="flex-1 rounded-md border bg-background px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <button
            type="button"
            onClick={handleLoadGist}
            disabled={!gistUrl}
            className="rounded-md bg-primary px-6 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
          >
            Load
          </button>
        </div>
        <div className="mt-4 flex items-center justify-center gap-4">
          <span className="text-sm text-muted-foreground">or</span>
        </div>
        <div className="mt-4 flex justify-center">
          <button
            type="button"
            onClick={handleCreateGist}
            className="inline-flex items-center gap-2 rounded-md border bg-background px-6 py-2 text-sm font-medium hover:bg-accent"
          >
            <ExternalLink className="h-4 w-4" />
            Create a Gist
          </button>
        </div>
      </div>

      {/* Best Practices Section */}
      <div className="mb-4">
        <h2 className="text-2xl font-semibold">Pick a best practice</h2>
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
