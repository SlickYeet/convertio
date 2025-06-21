import { ConverterForm } from "@/components/converter-form"
import { Badge } from "@/components/ui/badge"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-4xl font-bold text-slate-900">
            Markdown to PDF Converter
          </h1>
          <p className="text-lg text-slate-600">
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

        <div className="text-muted-foreground mt-12 text-center text-sm">
          <p>
            Built with Next.js, Tailwind CSS, and shadcn/ui. Backend powered by
            marked and puppeteer.
          </p>
        </div>
      </div>
    </div>
  )
}
