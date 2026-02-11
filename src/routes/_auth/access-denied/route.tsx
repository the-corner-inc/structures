import { Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { createFileRoute } from "@tanstack/react-router"
import { LockIcon } from "lucide-react"

export const Route = createFileRoute("/_auth/access-denied")({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <Card className="flex w-full max-w-md flex-col items-center gap-6 p-8 shadow-lg">
        <Avatar size="lg" className="mb-2 flex items-center justify-center">
          <LockIcon className="text-muted-foreground size-6" />
        </Avatar>
        <div className="text-center">
          <h1 className="text-destructive mb-2 text-2xl font-bold">Access Denied</h1>
          <p className="text-muted-foreground mb-4">
            You do not have permission to view this page.
            <br />
            Please request access from your manager if you believe this is a mistake.
          </p>
        </div>
        <Button
          variant="outline"
          className="w-full"
          onClick={() => (window.location.href = "/")}
        >
          Back to Home
        </Button>
      </Card>
    </div>
  )
}
