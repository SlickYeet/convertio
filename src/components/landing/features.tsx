import { Download, Shield, Zap } from "lucide-react"

export default function Features() {
  return (
    <section className="py-16">
      <div className="mb-12 text-center">
        <h2 className="mb-4 text-3xl font-bold md:text-4xl">
          Why We Are The Best
        </h2>
        <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
          Built with modern technologies to provide the best document conversion
          experience.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="text-center">
          <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/25 text-emerald-600 dark:text-emerald-400">
            <Zap className="size-8" />
          </div>
          <h3 className="mb-2 text-xl font-semibold">Lightning Fast</h3>
          <p className="text-muted-foreground">
            Convert your documents in seconds with our lightweight and efficient
            processing engine.
          </p>
        </div>

        <div className="text-center">
          <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-sky-500/25 text-sky-600 dark:text-sky-400">
            <Shield className="size-8" />
          </div>
          <h3 className="mb-2 text-xl font-semibold">Secure & Private</h3>
          <p className="text-muted-foreground">
            Your documents are processed securely and never stored on our
            servers.
          </p>
        </div>

        <div className="text-center">
          <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-purple-500/25 text-purple-600 dark:text-purple-400">
            <Download className="size-8" />
          </div>
          <h3 className="mb-2 text-xl font-semibold">High Quality Output</h3>
          <p className="text-muted-foreground">
            Professional-grade conversions with perfect formatting and styling.
          </p>
        </div>
      </div>
    </section>
  )
}
