import { Badge } from "@/components/ui/badge"

export function PageHeader() {
  return (
    <div className="mb-8 text-center">
      <h1 className="mb-2 text-4xl font-bold">Markdown to PDF Converter</h1>
      <p className="text-muted-foreground text-lg">
        Convert your markdown files to beautiful PDFs instantly
      </p>
      <div className="mt-4 flex justify-center gap-2">
        <Badge variant="secondary">Fast Conversion</Badge>
        <Badge variant="secondary">High Quality</Badge>
        <Badge variant="secondary">Free to Use</Badge>
      </div>
    </div>
  )
}
