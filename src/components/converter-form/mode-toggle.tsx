import { Files, FileText } from "lucide-react"

import { Button } from "@/components/ui/button"

interface ConversionModeToggleProps {
  conversionMode: "single" | "batch"
  setConversionMode: React.Dispatch<React.SetStateAction<"single" | "batch">>
}

export function ConversionModeToggle(props: ConversionModeToggleProps) {
  const { conversionMode, setConversionMode } = props

  return (
    <div className="mb-6 flex justify-center">
      <div className="bg-muted rounded-lg p-1">
        <Button
          onClick={() => setConversionMode("single")}
          size="sm"
          variant={conversionMode === "single" ? "default" : "ghost"}
        >
          <FileText className="size-4" />
          <span>Single File</span>
        </Button>
        <Button
          onClick={() => setConversionMode("batch")}
          size="sm"
          variant={conversionMode === "batch" ? "default" : "ghost"}
        >
          <Files className="size-4" />
          <span>Batch Convert</span>
        </Button>
      </div>
    </div>
  )
}
