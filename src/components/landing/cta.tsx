import { ArrowRight } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"

export default function CTA() {
  return (
    <section className="container py-16">
      <div className="bg-primary rounded-2xl p-8 text-center text-white md:p-12">
        <h2 className="mb-4 text-3xl font-bold md:text-4xl">
          Ready to Convert Your Documents?
        </h2>
        <p className="text-primary-foreground mx-auto mb-8 max-w-2xl text-center text-xl opacity-90">
          Experience the easiest way to convert your documents. No sign-up, no
          hassle, just fast and reliable conversion.
        </p>

        <Button size="lg" variant="secondary" className="px-8 text-lg" asChild>
          <Link href="/markdown-to-pdf">
            Start Converting Now
            <ArrowRight className="ml-2 size-5" />
          </Link>
        </Button>
      </div>
    </section>
  )
}
