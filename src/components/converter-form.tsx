"use client"

import {
  AlertCircle,
  CheckCircle,
  Copy,
  CopyCheck,
  Download,
  FilePlus2,
  FileText,
  Loader2,
  Upload,
} from "lucide-react"
import { useCallback, useEffect, useState } from "react"
import { toast } from "sonner"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

const SAMPLE_MARKDOWN = "# Hello World"

export function ConverterForm() {
  const [markdown, setMarkdown] = useState<string>(SAMPLE_MARKDOWN)
  const [isConverting, setIsConverting] = useState<boolean>(false)
  const [isConverted, setIsConverted] = useState<boolean>(false)
  const [isCoping, setIsCoping] = useState<boolean>(false)
  const [isCopied, setIsCopied] = useState<boolean>(false)
  const [isDragOver, setIsDragOver] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [pdfBlob, setPdfBlob] = useState<Blob | null>(null)
  const [activeTab, setActiveTab] = useState<string>("preview")

  useEffect(() => {
    if (isConverted) {
      setActiveTab("output")
    } else {
      setActiveTab("preview")
    }
  }, [isConverted, setActiveTab])

  async function handleConvert() {
    if (!markdown.trim()) {
      toast.error("Error", {
        description: "Please enter some markdown content to convert.",
      })
      return
    }

    setIsConverting(true)
    setIsConverted(false)
    setError(null)
    setPdfBlob(null)

    try {
      const response = await fetch("/api/convert/pdf", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ markdown }),
      })
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Conversion failed")
      }

      const pdfBlob = await response.blob()
      setPdfBlob(pdfBlob)
      setIsConverted(true)

      toast.success("Conversion complete", {
        description: "Your markdown has been converted to PDF.",
      })
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unexpected error occurred"
      setError(errorMessage)
      toast.error("Conversion failed", {
        description: errorMessage,
      })
    } finally {
      setIsConverting(false)
    }
  }

  const handleFileUpload = useCallback(
    (file: File) => {
      if (
        file.type === "text/markdown" ||
        file.name.endsWith(".md") ||
        file.type === "text/plain"
      ) {
        const reader = new FileReader()
        reader.onload = (e) => {
          const content = e.target?.result as string
          setMarkdown(content)
          setIsConverted(false)
          setError(null)
          setPdfBlob(null)
          toast.success("File uploaded", {
            description: `${file.name} has been loaded successfully.`,
          })
        }
        reader.readAsText(file)
      } else {
        toast.error("INvalid file type", {
          description: "Please upload a .md or .txt file.",
        })
      }
    },
    [toast],
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

  async function copyToClipboard() {
    setIsCoping(true)
    setIsCopied(false)

    try {
      await navigator.clipboard.writeText(markdown)
      setIsCopied(true)
    } catch (err) {
      console.error("Failed to copy to clipboard:", err)
      toast.error("Copy Failed", {
        description: "Unable to copy to clipboard.",
      })
    } finally {
      setIsCoping(false)
      setTimeout(() => {
        setIsCopied(false)
      }, 2000)
    }
  }

  function downloadPDF() {
    if (!pdfBlob) {
      toast.error("Error", {
        description: "No PDF available for download. Please convert first.",
      })
      return
    }

    const url = URL.createObjectURL(pdfBlob)
    const a = document.createElement("a")
    a.href = url
    const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, "-")
    a.download = `markdown-document-${timestamp}.pdf`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  function downloadMarkdown() {
    const blob = new Blob([markdown], { type: "text/markdown" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "document.md"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  function renderMarkdown(text: string) {
    return text
      .replace(
        /^# (.*$)/gim,
        '<h1 class="text-3xl font-bold mb-4 pb-2 border-b">$1</h1>',
      )
      .replace(
        /^## (.*$)/gim,
        '<h2 class="text-2xl font-semibold mb-3 pb-1 border-b">$1</h2>',
      )
      .replace(/^### (.*$)/gim, '<h3 class="text-xl font-medium mb-2">$1</h3>')
      .replace(/\*\*(.*?)\*\*/gim, '<strong class="font-semibold">$1</strong>')
      .replace(/\*(.*?)\*/gim, '<em class="italic">$1</em>')
      .replace(
        /`([^`]+)`/gim,
        '<code class="bg-muted px-1 py-0.5 rounded text-sm font-mono">$1</code>',
      )
      .replace(/^- (.*$)/gim, '<li class="ml-4 mb-1">• $1</li>')
      .replace(
        /^> (.*$)/gim,
        '<blockquote class="border-l-4 border-blue-400 pl-4 italic my-4 text-slate-600">$1</blockquote>',
      )
      .replace(
        /\[([^\]]+)\]$$([^)]+)$$/gim,
        '<a href="$2" class="text-blue-600 underline hover:text-blue-800">$1</a>',
      )
      .replace(/^---$/gim, '<hr class="my-6 border-t-2 border-slate-200">')
      .replace(/\n/gim, "<br>")
  }

  return (
    <>
      <Card className="h-fit">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="size-5" />
            Input Markdown
          </CardTitle>
          <CardDescription>
            Paste your markdown content or upload a .md file
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
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
              accept=".md,.txt"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) handleFileUpload(file)
              }}
            />
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="size-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Textarea
            value={markdown}
            onChange={(e) => {
              setMarkdown(e.target.value)
              setIsConverted(false)
              setError(null)
              setPdfBlob(null)
            }}
            placeholder="Paste your markdown content here..."
            className="min-h-[400px] resize-y font-mono text-sm"
          />

          <div className="flex gap-2">
            <Button
              onClick={handleConvert}
              disabled={!markdown.trim() || isConverting}
              className="flex-1"
            >
              {isConverting ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  <span>Converting...</span>
                </>
              ) : (
                <>
                  <FileText className="size-4" />
                  <span>Convert to PDF</span>
                </>
              )}
            </Button>
            <Button
              disabled={!markdown.trim() || isCoping || isCopied}
              onClick={copyToClipboard}
              size="icon"
              variant="outline"
            >
              {isCopied ? (
                <>
                  <CopyCheck className="size-4 text-emerald-600" />
                  <span className="sr-only">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="size-4" />
                  <span className="sr-only">Copy Markdown</span>
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="h-fit">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {isConverted ? (
              <>
                <CheckCircle className="size-4 text-emerald-600" />
                Conversion Complete
              </>
            ) : (
              <>
                <FileText className="size-4" />
                Preview & Output
              </>
            )}
          </CardTitle>
          <CardDescription>
            {isConverted
              ? "Your PDF is ready for download"
              : "Live preview of your markdown content"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs
            value={activeTab}
            onValueChange={(t) => setActiveTab(t)}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger disabled={!isConverted} value="output">
                Output
              </TabsTrigger>
            </TabsList>

            <TabsContent value="preview" className="mt-4">
              <div className="min-h-[400px] overflow-auto rounded-lg border bg-white p-4">
                {markdown.trim() ? (
                  <div
                    className="prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{
                      __html: renderMarkdown(markdown),
                    }}
                  />
                ) : (
                  <p className="text-muted-foreground py-20 text-center">
                    Your markdown preview will appear here
                  </p>
                )}
              </div>
            </TabsContent>

            <TabsContent value="output" className="mt-4">
              {isConverted ? (
                <div className="space-y-4">
                  <div className="rounded-lg border border-green-200 bg-green-50 p-4">
                    <div className="mb-2 flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span className="font-medium text-green-800">
                        Conversion Successful!
                      </span>
                    </div>
                    <p className="text-sm text-green-700">
                      Your markdown has been converted to PDF format.
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
                      >
                        <Download className="mr-2 size-4" />
                        Download PDF
                      </Button>

                      <Button
                        onClick={downloadMarkdown}
                        variant="outline"
                        className="justify-start"
                      >
                        <Download className="mr-2 size-4" />
                        Download Markdown
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
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </>
  )
}
