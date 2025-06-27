"use client"

import { Copy, CopyCheck } from "lucide-react"
import { useState } from "react"

import { Hint } from "@/components/hint"
import { Button } from "@/components/ui/button"

export function CopyButton({ text, label }: { text: string; label: string }) {
  const [IsActive, setIsActive] = useState<boolean>(false)

  if (!text) return null

  return (
    <Hint label={label} side="left" asChild>
      <Button
        onClick={() => {
          navigator.clipboard.writeText(text)
          setIsActive(true)
          setTimeout(() => setIsActive(false), 2000)
        }}
        size="icon"
        variant="ghost"
        className="text-muted-foreground hover:text-primary absolute top-5 right-2 opacity-100 transition-opacity md:opacity-0 md:group-focus-within:opacity-100 md:group-hover:opacity-100"
      >
        {IsActive ? (
          <CopyCheck className="size-4 text-emerald-500" />
        ) : (
          <Copy className="size-4" />
        )}
        <span className="sr-only">{label}</span>
      </Button>
    </Hint>
  )
}
