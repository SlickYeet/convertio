import { AlertCircle } from "lucide-react"

import { Alert, AlertDescription } from "@/components/ui/alert"

export default function ErrorAlert({ error }: { error: string | null }) {
  return (
    <Alert variant="destructive">
      <AlertCircle className="size-4" />
      <AlertDescription>{error}</AlertDescription>
    </Alert>
  )
}
