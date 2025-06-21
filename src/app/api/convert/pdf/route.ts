import chromium from "@sparticuz/chromium"
import { marked } from "marked"
import { NextResponse, type NextRequest } from "next/server"
import puppeteer from "puppeteer-core"

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

    const htmlContent = marked(markdown)

    const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Converted Document</title>
          <style>
              body {
                  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                  line-height: 1.6;
                  margin: 20mm;
                  color: #333;
              }
              h1, h2, h3, h4, h5, h6 {
                  color: #2d3748;
                  margin-top: 1.5em;
                  margin-bottom: 0.5em;
              }
              h1 { font-size: 2em; border-bottom: 2px solid #e2e8f0; padding-bottom: 0.3em; }
              h2 { font-size: 1.5em; border-bottom: 1px solid #e2e8f0; padding-bottom: 0.3em; }
              h3 { font-size: 1.25em; }
              pre {
                  background-color: #f7fafc;
                  border: 1px solid #e2e8f0;
                  padding: 1em;
                  border-radius: 6px;
                  overflow-x: auto;
                  font-size: 0.875em;
              }
              code {
                  font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
                  background-color: #f7fafc;
                  padding: 0.2em 0.4em;
                  border-radius: 3px;
                  font-size: 0.875em;
              }
              pre code {
                  background-color: transparent;
                  padding: 0;
              }
              blockquote {
                  border-left: 4px solid #4299e1;
                  margin-left: 0;
                  padding-left: 1em;
                  color: #4a5568;
                  font-style: italic;
              }
              table {
                  width: 100%;
                  border-collapse: collapse;
                  margin-bottom: 1em;
                  border: 1px solid #e2e8f0;
              }
              th, td {
                  border: 1px solid #e2e8f0;
                  padding: 12px;
                  text-align: left;
              }
              th {
                  background-color: #f7fafc;
                  font-weight: 600;
              }
              tr:nth-child(even) {
                  background-color: #f9f9f9;
              }
              img {
                  max-width: 100%;
                  height: auto;
                  display: block;
                  margin: 1em auto;
                  border-radius: 4px;
              }
              a {
                  color: #4299e1;
                  text-decoration: none;
              }
              a:hover {
                  text-decoration: underline;
              }
              ul, ol {
                  padding-left: 1.5em;
              }
              li {
                  margin-bottom: 0.25em;
              }
              hr {
                  border: none;
                  border-top: 2px solid #e2e8f0;
                  margin: 2em 0;
              }
          </style>
      </head>
      <body>
          ${htmlContent}
      </body>
      </html>
    `

    const browser = await puppeteer.launch({
      args: [...chromium.args, "--hide-scrollbars", "--disable-web-security"],
      // @ts-expect-error - @sparticuz/chromium has no types
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath(),
      // @ts-expect-error - @sparticuz/chromium has no types
      headless: chromium.headless,
    })
    const page = await browser.newPage()

    await page.setContent(html, {
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
