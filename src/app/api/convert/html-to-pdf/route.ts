import { NextResponse, type NextRequest } from "next/server"

import { html, sanitizeHtml } from "@/lib/full-html"
import { getBrowser } from "@/lib/pupeteer"

export async function POST(req: NextRequest) {
  try {
    const { input, inputType } = await req.json()
    if (!input || typeof input !== "string") {
      return NextResponse.json(
        { error: "Invalid or missing 'input' in request body" },
        { status: 400 },
      )
    }
    if (!inputType) {
      return NextResponse.json(
        { error: "Missing 'inputType' in request body" },
        { status: 400 },
      )
    }

    const sanitizedHtml = sanitizeHtml(input)
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

    const timestamp = new Date().toISOString().replace(/[:.]/g, "-")
    const filename = `converted-${timestamp}.pdf`

    return new NextResponse(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Content-Length": pdfBuffer.length.toString(),
      },
      status: 200,
    })
  } catch (error) {
    console.error("Error converting HTML to PDF:", error)
    return NextResponse.json(
      {
        error: "Failed to convert HTML to PDF",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
