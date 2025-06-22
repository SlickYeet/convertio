import Link from "next/link"

import { Credits } from "@/components/layout/credits"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="container border-t py-4">
      <div className="text-muted-foreground flex items-center justify-between text-center">
        <p>
          &copy; {currentYear}{" "}
          <Link
            href="/"
            className="hover:text-primary underline-offset-2 transition-colors hover:underline"
          >
            HHN Converter
          </Link>
          . All rights reserved.
        </p>

        <Credits />
      </div>
    </footer>
  )
}
