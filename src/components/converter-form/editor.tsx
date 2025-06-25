"use client"

import { Copy, CopyCheck, FileText, Loader2 } from "lucide-react"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { convert } from "@/lib/conversion"

interface EditorProps {
  input: string
  setInput: (input: string) => void
  setIsConverted: (isConverted: boolean) => void
  setError: (error: string | null) => void
  setPdfBlob: (pdfBlob: Blob | null) => void
  setActiveTab: (tab: string) => void
}

export function Editor(props: EditorProps) {
  const searchParams = useSearchParams()
  const type = searchParams.get("type") || "md-to-pdf"

  const [inputType, setInputType] = useState<string>("")
  const [outputType, setOutputType] = useState<string>("")
  const [isConverting, setIsConverting] = useState<boolean>(false)
  const [isCoping, setIsCoping] = useState<boolean>(false)
  const [isCopied, setIsCopied] = useState<boolean>(false)

  const {
    input,
    setInput,
    setIsConverted,
    setError,
    setPdfBlob,
    setActiveTab,
  } = props

  useEffect(() => {
    if (type === "html-to-pdf") {
      setInputType("html")
      setOutputType("pdf")
    } else if (type === "md-to-pdf") {
      setInputType("markdown")
      setOutputType("pdf")
    } else {
      setInputType("")
      setOutputType("")
      toast.error("Unsupported conversion type")
    }
  }, [type])

  async function handleConvert() {
    if (!input.trim()) {
      toast.error("Error", {
        description: "Please enter content to convert.",
      })
      return
    }

    setIsConverting(true)
    setError(null)
    setPdfBlob(null)
    setActiveTab("preview")

    try {
      const pdfBlob = await convert(input, inputType, outputType)
      setPdfBlob(pdfBlob)
      setIsConverted(true)
      setActiveTab("output")
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
      await navigator.clipboard.writeText(input)
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
        value={input}
        onChange={(e) => {
          setInput(e.target.value)
          setIsConverted(false)
          setError(null)
          setPdfBlob(null)
        }}
        placeholder="Paste your content here..."
        className="min-h-[400px] resize-y font-mono text-sm"
      />

      <div className="flex gap-2">
        <Button
          onClick={handleConvert}
          disabled={!input.trim() || isConverting}
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
          disabled={!input.trim() || isCoping || isCopied}
          onClick={copyToClipboard}
          size="icon"
          variant="outline"
        >
          {isCopied ? (
            <>
              <CopyCheck className="size-4 text-emerald-600 dark:text-emerald-400" />
              <span className="sr-only">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="size-4" />
              <span className="sr-only">Copy</span>
            </>
          )}
        </Button>
      </div>
    </>
  )
}
