export const sanitizeHtml = (htmlContent: string) => {
  return htmlContent
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/on\w+="[^"]*"/g, "")
    .replace(/<[^>]+>/g, (match) => {
      const allowedTags = [
        "b",
        "i",
        "em",
        "strong",
        "u",
        "a",
        "p",
        "br",
        "ul",
        "ol",
        "li",
        "blockquote",
        "code",
        "pre",
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "table",
        "thead",
        "tbody",
        "tr",
        "th",
        "td",
        "img",
        "hr",
        "span",
      ]

      const tagMatch = match.match(/^<\/?([a-z0-9]+)\b/i)
      if (tagMatch && allowedTags.includes(tagMatch[1].toLowerCase())) {
        if (tagMatch[1].toLowerCase() === "a") {
          return match.replace(/\s+(?!href=)[a-z-]+="[^"]*"/gi, "")
        }
        if (tagMatch[1].toLowerCase() === "img") {
          return match.replace(/\s+(?!src=|alt=)[a-z-]+="[^"]*"/gi, "")
        }
        return match
      }
      return ""
    })
}

export const html = (htmlContent: string) => `
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
