"use client"

import { useSearchParams } from "next/navigation"

import { CONFIG } from "@/constants/conversion"

export function PageHeader() {
  const searchPrams = useSearchParams()
  const type =
    (searchPrams.get("type") as keyof typeof CONFIG.converters) || "md-to-pdf"

  switch (type) {
    case "md-to-pdf":
      return (
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-4xl font-bold">Markdown to PDF Converter</h1>
          <p className="text-muted-foreground text-lg">
            Convert your markdown files to beautiful PDFs instantly
          </p>
        </div>
      )
    case "html-to-pdf":
      return (
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-4xl font-bold">
            Markdown to HTML Converter
          </h1>
          <p className="text-muted-foreground text-lg">
            Convert your markdown files to HTML instantly
          </p>
        </div>
      )
    default:
      return <div className="mt-12" />
  }
}
