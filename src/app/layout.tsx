import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"

import { AppHeader } from "@/components/layout/app-header"
import { Credits } from "@/components/layout/credits"
import { Providers } from "@/components/providers"
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
  title: "MD To PDF Converter",
  description: "Easily convert Markdown files to PDF.",
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
            <div className="container">
              <AppHeader />
              <div className="flex min-h-[calc(100vh-4rem)] flex-col justify-between">
                <main>{children}</main>
                <Credits />
              </div>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  )
}
