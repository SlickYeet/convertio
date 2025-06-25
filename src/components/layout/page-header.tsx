"use client"

import { useSearchParams } from "next/navigation"

import { CONFIG } from "@/constants/conversion"

export function PageHeader({ wrongType = false }: { wrongType?: boolean }) {
  const searchPrams = useSearchParams()
  const type =
    (searchPrams.get("type") as keyof typeof CONFIG.converters) || "md-to-pdf"

  const config = CONFIG.converters[type]

  if (wrongType) {
    return (
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-4xl font-bold">Invalid conversion type</h1>
      </div>
    )
  }

  return (
    <div className="mb-8 text-center">
      <h1 className="mb-2 text-4xl font-bold">{config.label}</h1>
      <p className="text-muted-foreground text-lg">{config.description}</p>
    </div>
  )
}
