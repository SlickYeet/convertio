import { ArrowRight } from "lucide-react"
import Link from "next/link"

import { Button, type ButtonProps } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ButtonWithAnimatedArrowProps extends ButtonProps {
  label: string
  href: string
  comingSoon?: boolean
}

export default function ButtonWithAnimatedArrow(
  props: ButtonWithAnimatedArrowProps,
) {
  const { label, href, comingSoon, size = "lg", variant, className } = props

  return (
    <Button
      size={size}
      variant={variant}
      className={cn("group/btn px-8 text-lg", className)}
      asChild
    >
      {comingSoon ? (
        <span>Coming Soon</span>
      ) : (
        <Link href={href}>
          <span className="mr-0 transition-all md:mr-[-23px] md:group-hover/btn:mr-0 md:group-focus/btn:mr-0">
            {label}
          </span>
          <ArrowRight className="size-4 scale-100 transition-transform md:scale-0 md:group-hover/btn:scale-100 md:group-focus/btn:scale-100" />
        </Link>
      )}
    </Button>
  )
}
