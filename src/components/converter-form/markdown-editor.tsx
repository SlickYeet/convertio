"use client"

import { Copy, CopyCheck, FileText, Loader2 } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { convertMarkdownToPDF } from "@/lib/conversion"

interface MarkdownEditorProps {
  markdown: string
  setMarkdown: (markdown: string) => void
  setIsConverted: (isConverted: boolean) => void
  setError: (error: string | null) => void
  setPdfBlob: (pdfBlob: Blob | null) => void
}

export function MarkdownEditor(props: MarkdownEditorProps) {
  const { markdown, setMarkdown, setIsConverted, setError, setPdfBlob } = props

  const [isConverting, setIsConverting] = useState<boolean>(false)
  const [isCoping, setIsCoping] = useState<boolean>(false)
  const [isCopied, setIsCopied] = useState<boolean>(false)

  async function handleConvert() {
    if (!markdown.trim()) {
      toast.error("Error", {
        description: "Please enter some markdown content to convert.",
      })
      return
    }

    setIsConverting(true)
    setError(null)
    setPdfBlob(null)

    try {
      const pdfBlob = await convertMarkdownToPDF(markdown)
      setPdfBlob(pdfBlob)
      setIsConverted(true)
      toast.success("Conversion complete", {
        description: "Your markdown has been converted to PDF.",
      })
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unexpected error occurred"
      setError(errorMessage)
      toast.error("Conversion failed", { description: errorMessage })
    } finally {
      setIsConverting(false)
    }
  }

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

  return (
    <>
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
    </>
  )
}
