import Link from "next/link"

import { Credits } from "@/components/layout/credits"
import { siteConfig } from "@/config"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="container border-t py-4">
      <div className="text-muted-foreground flex flex-col items-center justify-between gap-y-4 text-center md:flex-row">
        <p>
          &copy; {currentYear}{" "}
          <Link
            href="/"
            className="hover:text-primary underline-offset-2 transition-colors hover:underline"
          >
            {siteConfig.appName}
          </Link>
          . All rights reserved.
        </p>

        <Credits />
      </div>
    </footer>
  )
}
