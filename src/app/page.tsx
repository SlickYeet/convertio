import { ConverterForm } from "@/components/converter-form"
import { Credits } from "@/components/credits"
import { Badge } from "@/components/ui/badge"

export default function HomePage() {
  return (
    <div className="dark:from-secondary/50 dark:to-secondary/100 min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 p-4">
      <div className="mx-auto max-w-7xl">
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

        <div className="grid gap-6 lg:grid-cols-2">
          <ConverterForm />
        </div>

        <Credits />
      </div>
    </div>
  )
}
