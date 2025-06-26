"use client"

import {
  AlertCircle,
  CheckCircle,
  Download,
  Files,
  FileText,
  Loader2,
  RefreshCw,
  Trash2,
} from "lucide-react"
import { toast } from "sonner"

import { FileUpload } from "@/components/converter-form/file-upload"
import { Hint } from "@/components/hint"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { CONFIG } from "@/constants/conversion"
import { convertBatchFile } from "@/lib/batch-file"
import { downloadFile } from "@/lib/file"
import type { BatchFile, CurrentType } from "@/types"

interface ConvertBatchFilesProps {
  currentType: CurrentType
  conversionMode?: "single" | "batch"
  error: string | null
  isConverted: boolean
  batchFiles: BatchFile[]
  isBatchConverting: boolean
  batchProgress: number
  setError: React.Dispatch<React.SetStateAction<string | null>>
  setIsConverted: React.Dispatch<React.SetStateAction<boolean>>
  setBatchFiles: React.Dispatch<React.SetStateAction<BatchFile[]>>
  setIsBatchConverting: React.Dispatch<React.SetStateAction<boolean>>
  setBatchProgress: React.Dispatch<React.SetStateAction<number>>
}

export function ConvertBatchFiles(props: ConvertBatchFilesProps) {
  const {
    currentType,
    conversionMode = "batch",
    error,
    isConverted,
    batchFiles,
    isBatchConverting,
    batchProgress,
    setError,
    setIsConverted,
    setBatchFiles,
    setIsBatchConverting,
    setBatchProgress,
  } = props

  const config = CONFIG.converters[currentType]
  const inputLabel = config.inputLabel
  const fileTypes = config.fileTypes.join(" or ")

  async function handleBatchConvert() {
    if (!batchFiles || batchFiles.length === 0) {
      toast.error("No files", {
        description: "Upload files to start converting.",
      })
      return
    }

    if (config.comingSoon) {
      toast.error("Coming Soon", {
        description: "Batch conversion is not yet available.",
      })
      return
    }

    setIsBatchConverting(true)
    setBatchProgress(0)
    setIsConverted(false)

    const pendingFiles = batchFiles.filter((f) => f.status === "pending")
    let completedCount = 0

    // Process 3 files in parallel at a time
    const concurrencyLimit = 3
    const chunks = []
    for (let i = 0; i < pendingFiles.length; i += concurrencyLimit) {
      chunks.push(pendingFiles.slice(i, i + concurrencyLimit))
    }

    for (const chunk of chunks) {
      const promises = chunk.map((file) =>
        convertBatchFile({
          file,
          setBatchFiles,
          currentType,
        }),
      )
      const results = await Promise.all(promises)

      results.forEach((result) => {
        if (result && setBatchFiles) {
          setBatchFiles((prev) =>
            prev.map((f) => (f.id === result.id ? result : f)),
          )
        }
        completedCount++
        setBatchProgress((completedCount / pendingFiles.length) * 100)
      })
    }

    setIsBatchConverting(false)
    setIsConverted(true)
  }

  function downloadBatchFile(file: BatchFile) {
    if (!file.pdfBlob) {
      toast.error("Error", {
        description: "No PDF available for this batch file.",
      })
      return
    }
    const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, "-")
    downloadFile(file.pdfBlob, `${file.file.name}-${timestamp}.pdf`)
  }

  function downloadAllBatchFiles() {
    // TODO: Download as zip

    const completedFiles = batchFiles?.filter(
      (f) => f.status === "completed" && f.pdfBlob,
    )
    if (completedFiles?.length === 0) {
      toast.error("No completed files", {
        description: "No batch files have been converted yet.",
      })
      return
    }

    completedFiles?.forEach((file, index) => {
      // Stagger downloads
      setTimeout(() => downloadBatchFile(file), index * 100)
    })
  }

  function removeBatchFile(id: string) {
    setBatchFiles((prev) => prev.filter((f) => f.id !== id))
  }

  function clearBatchFiles() {
    setBatchFiles([])
    setBatchProgress(0)
    setIsConverted(false)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 capitalize">
            <Files className="size-5" />
            Batch {inputLabel} Upload
          </CardTitle>
          <CardDescription>
            Upload multiple {fileTypes} files for batch conversion
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <FileUpload
            setError={setError}
            currentType={currentType}
            conversionMode={conversionMode}
            setBatchFiles={setBatchFiles}
          />

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="size-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="flex gap-2">
            <Button
              disabled={
                batchFiles.length === 0 ||
                isBatchConverting ||
                config.comingSoon ||
                batchFiles.filter((f) => f.status === "pending").length === 0
              }
              onClick={handleBatchConvert}
              className="flex-1"
            >
              {isBatchConverting ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  <span>
                    Converting{" "}
                    {batchFiles.filter((f) => f.status === "converting").length}{" "}
                    files...
                  </span>
                </>
              ) : config.comingSoon ? (
                <>
                  <RefreshCw className="size-4" />
                  <span>This conversion is not yet available.</span>
                </>
              ) : (
                <>
                  <FileText className="size-4" />
                  <span>
                    Convert All (
                    {batchFiles.filter((f) => f.status === "pending").length})
                  </span>
                </>
              )}
            </Button>
            <Button
              disabled={
                batchFiles.filter((f) => f.status === "completed").length === 0
              }
              onClick={downloadAllBatchFiles}
              variant="outline"
            >
              <Download className="size-4" />
              Download All (
              {batchFiles.filter((f) => f.status === "completed").length})
            </Button>
            <Button
              disabled={batchFiles.length === 0}
              onClick={clearBatchFiles}
              size="icon"
              variant="destructive"
            >
              <Trash2 className="size-4" />
            </Button>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              {isBatchConverting ? (
                <span>Converting files...</span>
              ) : isConverted ? (
                <span>Batch conversion completed</span>
              ) : (
                <span>Start conversion to see progress</span>
              )}
              <span>{Math.round(batchProgress)}%</span>
            </div>
            <Progress value={batchProgress} className="w-full" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Files ({batchFiles.length})</CardTitle>
          <CardDescription>
            {batchFiles.filter((f) => f.status === "completed").length}{" "}
            completed, {batchFiles.filter((f) => f.status === "error").length}{" "}
            failed, {batchFiles.filter((f) => f.status === "pending").length}{" "}
            pending{" "}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="max-h-[400px] space-y-2 overflow-y-auto">
            {batchFiles.map((file) => (
              <div
                key={file.id}
                className="flex items-center gap-3 rounded-lg border p-3"
              >
                <div className="flex-shrink-0">
                  {file.status === "completed" && (
                    <CheckCircle className="size-5 text-emerald-500" />
                  )}
                  {file.status === "error" && (
                    <AlertCircle className="text-destructive size-5" />
                  )}
                  {file.status === "converting" && (
                    <Loader2 className="text-primary size-5 animate-spin" />
                  )}
                  {file.status === "pending" && (
                    <FileText className="text-muted-foreground size-5" />
                  )}
                </div>

                <div className="min-h-9 min-w-0 flex-1">
                  <div className="flex h-full items-center justify-between gap-2">
                    <div className="w-full">
                      <span className="flex items-center gap-2">
                        <p className="truncate text-sm font-medium">
                          {file.file.name}
                        </p>

                        {file.error && (
                          <Hint label={file.error} asChild>
                            <p className="-ml-1 line-clamp-1 max-w-2xl text-xs">
                              -{" "}
                              <span className="text-destructive">
                                {file.error}
                              </span>
                            </p>
                          </Hint>
                        )}
                      </span>

                      {file.status !== "converting" && (
                        <Progress
                          value={file.progress}
                          className="mt-2 h-1 w-full"
                        />
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground shrink-0 text-xs">
                        {(file.file.size / 1024).toFixed(1)} KB
                      </span>
                      <Button
                        disabled={file.status !== "completed"}
                        onClick={() =>
                          file.status !== "completed"
                            ? undefined
                            : downloadBatchFile(file)
                        }
                        size="icon"
                        variant="outline"
                      >
                        <Download className="size-4" />
                      </Button>
                      <Button
                        disabled={file.status === "converting"}
                        onClick={() => removeBatchFile(file.id)}
                        size="icon"
                        variant="destructive"
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
