import { ArrowRight, BadgeCheck, ThumbsUp, Zap } from "lucide-react"
import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export default function Hero() {
  return (
    <section className="container py-16 md:py-24">
      <div className="mx-auto max-w-4xl text-center">
        <div className="lex justify-center gap-2">
          <Badge variant="secondary">
            <Zap className="mr-1 size-3" />
            Fast Conversion
          </Badge>
          <Badge variant="secondary">
            <BadgeCheck className="mr-1 size-3" />
            High Quality
          </Badge>
          <Badge variant="secondary">
            <ThumbsUp className="mr-1 size-3" />
            Free to Use
          </Badge>
        </div>
        <h1 className="mb-6 text-4xl font-bold md:text-6xl">
          Document Conversion
          <span className="text-primary"> Made Simple</span>
        </h1>
        <p className="text-muted-foreground mb-8 text-xl leading-relaxed">
          Transform your documents between different formats with professional
          quality results. Fast, secure, and completely free to use.
        </p>

        <Button size="lg" className="px-8 text-lg" asChild>
          <Link href="/md-to-pdf">
            Get Started Free
            <ArrowRight className="ml-2 size-4" />
          </Link>
        </Button>
      </div>
    </section>
  )
}
