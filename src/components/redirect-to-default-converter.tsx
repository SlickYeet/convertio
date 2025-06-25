"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useEffect } from "react"

export function RedirectToDefaultConverter() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const type = searchParams.get("type") || "md-to-pdf"

  useEffect(() => {
    // Redirect to the first type if no type is specified
    if (!searchParams.has("type")) {
      router.replace(`/convert?type=${type}`)
    }
  }, [])

  return null
}
