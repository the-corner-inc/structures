import { createFileRoute, Link } from "@tanstack/react-router"
import { FolderOpen, Tag, ArrowRight } from "lucide-react"

export const Route = createFileRoute("/")({
  component: HomePage,
})

function HomePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-5xl font-bold">Project Structures</h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          Standardized project structures and issue management guidelines to help you organize
          and document your projects effectively
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Folders Section */}
        <Link
          to="/folders"
          className="group relative overflow-hidden rounded-xl border bg-gradient-to-br from-blue-50 to-cyan-50 p-8 transition-all hover:shadow-2xl dark:from-blue-950 dark:to-cyan-950"
        >
          <div className="relative z-10">
            <div className="mb-4 flex items-center gap-3">
              <div className="rounded-lg bg-blue-500 p-3 text-white">
                <FolderOpen className="h-8 w-8" />
              </div>
              <h2 className="text-3xl font-bold">Folder Structures</h2>
            </div>
            <p className="mb-6 text-muted-foreground">
              Explore standardized folder structures for different project types including Go,
              Angular, and more.
            </p>
            <div className="flex items-center gap-2 font-semibold text-blue-600 dark:text-blue-400">
              <span>View structures</span>
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
          <div className="absolute -bottom-8 -right-8 h-32 w-32 rounded-full bg-blue-500/10" />
          <div className="absolute -top-8 -right-8 h-32 w-32 rounded-full bg-cyan-500/10" />
        </Link>

        {/* Issues Section */}
        <Link
          to="/issues"
          className="group relative overflow-hidden rounded-xl border bg-gradient-to-br from-purple-50 to-pink-50 p-8 transition-all hover:shadow-2xl dark:from-purple-950 dark:to-pink-950"
        >
          <div className="relative z-10">
            <div className="mb-4 flex items-center gap-3">
              <div className="rounded-lg bg-purple-500 p-3 text-white">
                <Tag className="h-8 w-8" />
              </div>
              <h2 className="text-3xl font-bold">Issue Management</h2>
            </div>
            <p className="mb-6 text-muted-foreground">
              Discover issue labels, priorities, and status definitions for effective project
              management.
            </p>
            <div className="flex items-center gap-2 font-semibold text-purple-600 dark:text-purple-400">
              <span>View labels</span>
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
          <div className="absolute -bottom-8 -right-8 h-32 w-32 rounded-full bg-purple-500/10" />
          <div className="absolute -top-8 -right-8 h-32 w-32 rounded-full bg-pink-500/10" />
        </Link>
      </div>

      <div className="mt-12 rounded-xl border bg-card p-8 text-center">
        <h3 className="mb-3 text-2xl font-bold">Documentation & Best Practices</h3>
        <p className="mx-auto max-w-3xl text-muted-foreground">
          Each structure and label includes comprehensive documentation explaining its purpose,
          when to use it, and best practices. Navigate through the sections to learn more about
          organizing your projects effectively.
        </p>
      </div>
    </div>
  )
}
