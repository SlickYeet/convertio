"use client"

import { FilePlus2, Upload } from "lucide-react"
import { useCallback, useState } from "react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface FileUploadProps {
  setMarkdown: (markdown: string) => void
  setIsConverted: (isConverted: boolean) => void
  setError: (error: string | null) => void
  setPdfBlob: (pdfBlob: Blob | null) => void
}

export function FileUpload(props: FileUploadProps) {
  const { setMarkdown, setIsConverted, setError, setPdfBlob } = props

  const [isDragOver, setIsDragOver] = useState<boolean>(false)

  const handleFileUpload = useCallback(
    (file: File) => {
      if (file.type === "text/markdown" || file.name.endsWith(".md")) {
        const reader = new FileReader()
        reader.onload = (e) => {
          const content = e.target?.result as string
          setMarkdown(content)
          setIsConverted(false)
          setError(null)
          setPdfBlob(null)
        }
        reader.readAsText(file)
      } else {
        toast.error("Invalid file type", {
          description: "Please upload a .md.",
        })
      }
    },
    [setMarkdown, setIsConverted, setError, setPdfBlob],
  )

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragOver(false)

      const files = Array.from(e.dataTransfer.files)
      if (files.length > 0) {
        handleFileUpload(files[0])
      }
    },
    [handleFileUpload],
  )

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onClick={() => document.getElementById("file-upload")?.click()}
      className={cn(
        "rounded-lg border-2 border-dashed p-6 text-center transition-colors",
        isDragOver
          ? "border-primary bg-primary/5"
          : "border-muted-foreground/25 hover:border-muted-foreground/50",
      )}
    >
      <Upload className="text-muted-foreground mx-auto mb-2 size-8" />
      <p className="text-muted-foreground mb-2 text-sm">
        Drag and drop your .md file here, or
      </p>

      <Button
        onClick={() => document.getElementById("file-upload")?.click()}
        variant="outline"
      >
        <FilePlus2 className="size-4" />
        <span>Choose File</span>
      </Button>

      <input
        id="file-upload"
        type="file"
        accept=".md"
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) handleFileUpload(file)
        }}
        className="hidden"
      />
    </div>
  )
}
