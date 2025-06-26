import { CheckCircle, Download, FileText } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { CONFIG } from "@/constants/conversion"
import { downloadFile } from "@/lib/file"
import type { CurrentType } from "@/types"

interface OutputProps {
  input: string
  isConverted: boolean
  pdfBlob: Blob | null
  currentType: CurrentType
}

export function Output(props: OutputProps) {
  const { input, isConverted, pdfBlob, currentType } = props

  const config = CONFIG.converters[currentType]
  const inputLabel = config.inputLabel

  function downloadPDF() {
    if (!pdfBlob) {
      toast.error("Error", {
        description: "No PDF available for download. Please convert first.",
      })
      return
    }
    const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, "-")
    downloadFile(pdfBlob, `converted-${timestamp}.pdf`)
  }

  function downloadOriginal() {
    if (!input.trim()) {
      toast.error("Error", {
        description: "No content available for download.",
      })
      return
    }
    const config = CONFIG.converters[currentType]
    const fileType = config.fileTypes[0]
    const mimeType = config.mimeTypes[0]

    const blob = new Blob([input], {
      type: mimeType,
    })
    const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, "-")
    downloadFile(blob, `converted-${timestamp}${fileType}`)
  }

  return (
    <ScrollArea className="h-full">
      {isConverted ? (
        <div className="space-y-4">
          <div className="rounded-lg border border-emerald-200 bg-emerald-100/40 p-4 dark:border-emerald-800 dark:bg-emerald-900/25">
            <div className="mb-2 flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              <span className="font-medium text-emerald-800 dark:text-emerald-200">
                Conversion Successful!
              </span>
            </div>
            <p className="text-sm text-emerald-700 dark:text-emerald-300">
              Your {inputLabel} has been converted to PDF format.
            </p>
          </div>

          <Separator />

          <div className="space-y-3">
            <h4 className="font-medium">Download Options</h4>

            <div className="grid gap-2">
              <Button
                disabled={!pdfBlob}
                onClick={downloadPDF}
                className="justify-start"
                aria-label="Download PDF"
              >
                <Download className="mr-2 size-4" />
                Download PDF
              </Button>

              <Button
                onClick={downloadOriginal}
                variant="outline"
                className="justify-start capitalize"
                aria-label="Download Markdown"
              >
                <Download className="mr-2 size-4" />
                Download {inputLabel}
              </Button>
            </div>

            {pdfBlob && (
              <div className="text-muted-foreground text-xs">
                PDF size: {(pdfBlob.size / 1024).toFixed(1)} KB
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="text-muted-foreground py-20 text-center">
          <FileText className="mx-auto mb-4 size-12 opacity-50" />
          <p>Convert your markdown to see output options</p>
        </div>
      )}
    </ScrollArea>
  )
}
