import { BadgeCheck, ThumbsUp, Zap } from "lucide-react"

import ButtonWithAnimatedArrow from "@/components/button-with-animated-arrow"
import { Badge } from "@/components/ui/badge"

export default function Hero() {
  return (
    <section className="py-16 md:py-24">
      <div className="@container mx-auto max-w-4xl text-center">
        <div className="mb-2 flex flex-col items-center justify-center gap-4 @sm:flex-row @sm:gap-2">
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
          Conversion
          <br className="sm:hidden" />
          <span className="text-primary"> Made Simple</span>
        </h1>
        <p className="text-muted-foreground mb-8 text-xl leading-relaxed text-balance">
          Transform using our powerful, user-friendly converters with
          professional quality results. Fast, secure, and completely free to
          use.
        </p>

        <ButtonWithAnimatedArrow
          label="Get Started Free"
          href="/converters?type=md-to-pdf"
        />
      </div>
    </section>
  )
}
