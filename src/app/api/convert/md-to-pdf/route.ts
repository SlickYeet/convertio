import { marked } from "marked"
import { NextResponse, type NextRequest } from "next/server"

import { html, sanitizeHtml } from "@/lib/full-html"
import { getBrowser } from "@/lib/pupeteer"

export async function POST(req: NextRequest) {
  try {
    const { markdown } = await req.json()
    if (!markdown || typeof markdown !== "string") {
      return NextResponse.json(
        { error: "Invalid or missing 'markdown' content" },
        { status: 400 },
      )
    }
    if (!markdown.trim()) {
      return NextResponse.json(
        { error: "Markdown content cannot be empty" },
        { status: 400 },
      )
    }

    const htmlContent = await marked(markdown)
    const sanitizedHtml = sanitizeHtml(htmlContent)
    const fullHtml = html(sanitizedHtml)

    const browser = await getBrowser()
    const page = await browser.newPage()

    await page.setContent(fullHtml, {
      waitUntil: "networkidle0",
    })

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
    })

    await browser.close()

    const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, "-")
    const filename = `markdown-document-${timestamp}.pdf`

    return new NextResponse(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Content-Length": pdfBuffer.length.toString(),
      },
      status: 200,
    })
  } catch (error) {
    console.error("Error converting Markdown to PDF:", error)
    return NextResponse.json(
      {
        error: "Failed to convert Markdown to PDF",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
