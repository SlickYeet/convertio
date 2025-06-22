import { marked } from "marked"
import { NextResponse, type NextRequest } from "next/server"

import { html } from "@/lib/full-html"
import { getBrowser } from "@/lib/pupeteer"

export async function POST(req: NextRequest) {
  try {
    const { input, inputType, outputType } = await req.json()
    if (!input || typeof input !== "string") {
      return NextResponse.json(
        { error: "Invalid or missing 'input' in request body" },
        { status: 400 },
      )
    }
    if (!inputType || !outputType) {
      return NextResponse.json(
        { error: "Both 'inputType' and 'outputType' are required" },
        { status: 400 },
      )
    }

    let htmlContent = ""

    if (inputType === "markdown") {
      htmlContent = await marked(input)
    } else if (inputType === "html") {
      htmlContent = input
    } else {
      return NextResponse.json(
        { error: `Unsupported input type: ${inputType}` },
        { status: 400 },
      )
    }

    if (outputType === "pdf") {
      const fullHtml = html(htmlContent)

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
      const filename = `converted-${timestamp}.pdf`

      return new NextResponse(pdfBuffer, {
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": `attachment; filename="${filename}"`,
          "Content-Length": pdfBuffer.length.toString(),
        },
        status: 200,
      })
    } else {
      return NextResponse.json(
        { error: `Unsupported output type: ${outputType}` },
        { status: 400 },
      )
    }
  } catch (error) {
    console.error("Error during conversion:", error)
    return NextResponse.json(
      {
        error: "Conversion failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
