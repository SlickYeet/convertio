"use client"

import { FilePlus2, Upload } from "lucide-react"
import { useCallback, useState } from "react"

import { Button } from "@/components/ui/button"
import { CONFIG } from "@/constants/conversion"
import { cn } from "@/lib/utils"
import type { CurrentType } from "@/types"

interface FileUploadProps {
  setInput: (input: string) => void
  setIsConverted: (isConverted: boolean) => void
  setError: (error: string | null) => void
  setPdfBlob: (pdfBlob: Blob | null) => void
  currentType: CurrentType
}

export function FileUpload(props: FileUploadProps) {
  const { setInput, setIsConverted, setError, setPdfBlob, currentType } = props

  const [isDragOver, setIsDragOver] = useState<boolean>(false)

  const config = CONFIG.converters[currentType]
  const fileTypes = config.fileTypes.join(", or ")

  const handleFileUpload = useCallback(
    (file: File) => {
      if (!config.fileTypes.some((ext: string) => file.name.endsWith(ext))) {
        setError(`Please upload a valid ${fileTypes} file.`)
        return
      }

      const reader = new FileReader()
      reader.onload = (e) => {
        const content = e.target?.result as string
        setInput(content)
        setIsConverted(false)
        setError(null)
        setPdfBlob(null)
      }
      reader.readAsText(file)
    },
    /**
     * We are not including `config.fileTypes` and `fileTypes` in the
     * dependency array because they should not change.
     */
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [setInput, setIsConverted, setError, setPdfBlob],
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
        Drag and drop your {fileTypes} file here, or
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
        accept={config.fileTypes.join(", ")}
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) handleFileUpload(file)
        }}
        className="hidden"
      />
    </div>
  )
}
