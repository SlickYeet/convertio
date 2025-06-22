"use client"

import { usePathname } from "next/navigation"

export function PageHeader() {
  const pathname = usePathname()

  switch (pathname) {
    case "/md-to-pdf":
      return (
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-4xl font-bold">Markdown to PDF Converter</h1>
          <p className="text-muted-foreground text-lg">
            Convert your markdown files to beautiful PDFs instantly
          </p>
        </div>
      )
    case "/html-to-pdf":
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
      return null
  }
}
