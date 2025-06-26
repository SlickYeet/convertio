"use client"

import { usePathname, useSearchParams } from "next/navigation"

import { CONFIG } from "@/constants/conversion"

export function PageHeader({ wrongType = false }: { wrongType?: boolean }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const key = (pathname.split("/").pop() as keyof typeof CONFIG) || "converters"
  const type =
    (searchParams.get("type") as keyof (typeof CONFIG)[typeof key]) ||
    "md-to-pdf"

  const config = CONFIG[key][type]

  if (wrongType) {
    return (
      <div className="mt-4 mb-6 text-center">
        <h1 className="mb-2 text-4xl font-bold">Invalid conversion type</h1>
      </div>
    )
  }

  return (
    <div className="mt-4 mb-6 text-center">
      {/* @ts-expect-error - I don't feel like dealing with this, until I have to. */}
      <h1 className="mb-2 text-4xl font-bold">{config.label}</h1>
      {/* @ts-expect-error - I don't feel like dealing with this, until I have to. */}
      <p className="text-muted-foreground text-lg">{config.description}</p>
    </div>
  )
}
