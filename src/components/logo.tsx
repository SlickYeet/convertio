import { FileText } from "lucide-react"
import Link from "next/link"

import { cn } from "@/lib/utils"

interface LogoProps {
  href?: string
  className?: string
  iconClassName?: string
}

export function Logo({ href = "/", className, iconClassName }: LogoProps) {
  return (
    <Link href={href} className={cn("flex items-center space-x-2", className)}>
      <div
        className={cn(
          "bg-primary text-primary-foreground flex size-8 items-center justify-center rounded-lg",
          iconClassName,
        )}
      >
        <FileText className="size-4" />
      </div>
      <span className="text-xl font-bold">HHN Converter</span>
    </Link>
  )
}
