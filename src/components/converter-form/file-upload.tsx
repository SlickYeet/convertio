"use client"

import { FilePlus2, Upload } from "lucide-react"
import { useCallback, useState } from "react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { CONFIG } from "@/constants/conversion"
import { cn } from "@/lib/utils"
import type { BatchFile, CurrentType } from "@/types"

interface FileUploadProps {
  setInput?: (input: string) => void
  setIsConverted?: (isConverted: boolean) => void
  setError: (error: string | null) => void
  setPdfBlob?: (pdfBlob: Blob | null) => void
  setBatchFiles?: React.Dispatch<React.SetStateAction<BatchFile[]>>
  currentType: CurrentType
  conversionMode: "single" | "batch"
}

export function FileUpload(props: FileUploadProps) {
  const {
    setInput,
    setIsConverted,
    setError,
    setPdfBlob,
    setBatchFiles,
    currentType,
    conversionMode,
  } = props

  const [isDragOver, setIsDragOver] = useState<boolean>(false)

  const config =
    CONFIG.converters[currentType as keyof typeof CONFIG.converters]
  const fileTypes = config.fileTypes.join(" or ")

  const handleFileUpload = useCallback(
    (file: File) => {
      if (!config.fileTypes.some((ext) => file.name.endsWith(ext))) {
        setError(`Please upload a valid ${fileTypes} file.`)
        return
      }

      const reader = new FileReader()
      reader.onload = (e) => {
        const content = e.target?.result as string
        if (setInput) setInput(content)
        if (setIsConverted) setIsConverted(false)
        if (setPdfBlob) setPdfBlob(null)
        setError(null)
      }
      reader.readAsText(file)
    },
    [config, fileTypes, setInput, setIsConverted, setError, setPdfBlob],
  )

  const handleBatchFileUpload = useCallback(
    (files: FileList) => {
      Array.from(files).forEach((file) => {
        const isValidType =
          config.mimeTypes.includes(file.type) ||
          config.fileTypes.some((ext) => file.name.endsWith(ext))

        if (isValidType) {
          const reader = new FileReader()
          reader.onload = (e) => {
            const fileContent = e.target?.result as string
            const batchFile: BatchFile = {
              id: `${file.name}-${Date.now()}`,
              file,
              content: fileContent,
              status: "pending",
              progress: 0,
            }

            if (setBatchFiles) setBatchFiles((prev) => [...prev, batchFile])
          }
          reader.readAsText(file)
        } else {
          toast.error("Invalid File Type", {
            description: `${file.name} is not a supported file type. Please upload ${config.fileTypes.join(" or ")} files.`,
          })
        }
      })
    },
    [config, setBatchFiles],
  )

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragOver(false)

      const files = e.dataTransfer.files
      if (conversionMode === "batch" && files.length > 1) {
        handleBatchFileUpload(files)
      } else if (files.length > 0) {
        handleFileUpload(files[0])
      }
    },
    [conversionMode, handleFileUpload, handleBatchFileUpload],
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
      onClick={() => {
        if (conversionMode === "single") {
          document.getElementById("single-file-upload")?.click()
        } else if (conversionMode === "batch") {
          document.getElementById("batch-file-upload")?.click()
        }
      }}
      className={cn(
        "rounded-lg border-2 border-dashed p-6 text-center transition-colors",
        isDragOver
          ? "border-primary bg-primary/5"
          : "border-muted-foreground/25 hover:border-muted-foreground/50",
      )}
    >
      <Upload className="text-muted-foreground mx-auto mb-2 size-8" />
      <p className="text-muted-foreground mb-2 text-sm">
        Drag and drop your {fileTypes} file{conversionMode === "batch" && "s"}{" "}
        here, or
      </p>

      {conversionMode === "single" && (
        <>
          <Button
            onClick={() =>
              document.getElementById("single-file-upload")?.click()
            }
            variant="outline"
          >
            <FilePlus2 className="size-4" />
            <span>Choose File</span>
          </Button>

          <input
            id="single-file-upload"
            type="file"
            accept={config.fileTypes.join(", ")}
            onChange={(e) => {
              const file = e.target.files?.[0]
              if (file) handleFileUpload(file)
            }}
            className="hidden"
          />
        </>
      )}
      {conversionMode === "batch" && (
        <>
          <Button
            onClick={() =>
              document.getElementById("batch-file-upload")?.click()
            }
            variant="outline"
          >
            <FilePlus2 className="size-4" />
            <span>Upload Files</span>
          </Button>

          <input
            id="batch-file-upload"
            type="file"
            accept={config.fileTypes.join(", ")}
            multiple
            onChange={(e) => {
              const files = e.target.files
              if (files) handleBatchFileUpload(files)
            }}
            className="hidden"
          />
        </>
      )}
    </div>
  )
}
