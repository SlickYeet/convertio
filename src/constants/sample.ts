export const sampleContent = (fileType: string): string => {
  switch (fileType) {
    case "md":
      return SAMPLE_MARKDOWN
    case "html":
      return SAMPLE_HTML
    default:
      return SAMPLE_MARKDOWN
  }
}

const SAMPLE_MARKDOWN = `# Welcome to Markdown to PDF Converter

## Features

This converter supports **all standard markdown features**:

- **Bold text** and *italic text*
- [Links](https://example.com)
- \`inline code\` and code blocks
- Lists and numbered lists
- Tables
- Blockquotes
- And much more!

### Code Example

\`\`\`javascript
function convertToPDF(markdown) {
  // Your conversion logic here
  return pdf;
}
\`\`\`

### Table Example

| Feature | Supported |
|---------|-----------|
| Headers |     ✅    |
| Lists   |     ✅    |
| Code    |     ✅    |
| Tables  |     ✅    |

> This is a blockquote example. Perfect for highlighting important information!

---

**Ready to convert?** Just paste your markdown above and click convert!`

const SAMPLE_HTML = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Simple HTML Document</title>
  </head>
  <body>
    <h1>Welcome to HTML to PDF Converter</h1>
    <p>This is a paragraph in my simple HTML document. It contains some text to demonstrate basic HTML structure</p>
    <p>Here is another paragraph with <strong>bold text</strong> and <em>italic text</em>.</p>
    <ul>
        <li>First item in a list</li>
        <li>Second item in a list</li>
        <li>Third item in a list</li>
    </ul>
    <p>For more information, visit <a href="https://www.example.com">Example Website</a>.</p>
    <footer>
        <p>&copy; 2023 My Simple HTML Document</p>
    </footer>
  </body>
</html>`
