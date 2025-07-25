import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"

import { DevIndicator } from "@/components/dev-indicator"
import { AppHeader } from "@/components/layout/app-header"
import { Footer } from "@/components/layout/footer"
import { Providers } from "@/components/providers"
import { siteConfig } from "@/config"
import { cn } from "@/lib/utils"

import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: siteConfig.appName,
  description: siteConfig.description,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn("antialiased", geistSans.variable, geistMono.variable)}
      >
        <Providers>
          <div className="dark:from-secondary/50 dark:to-secondary/100 min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100">
            <div className="container px-2.5 md:px-4">
              <AppHeader />
              <div className="flex min-h-[calc(100vh-4rem-1px)] flex-col justify-between pt-2">
                {/* {siteConfig.isDev && <ApiDebug />} */}
                <main className="flex-1">{children}</main>
                <Footer />
              </div>
            </div>
          </div>
          <DevIndicator />
        </Providers>
      </body>
    </html>
  )
}
