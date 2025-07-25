"use client"

import { Clipboard, ClipboardCheck } from "lucide-react"
import { useState } from "react"

import { Hint } from "@/components/hint"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { formatByteValue, getUnitBySymbol, type ByteUnit } from "@/lib/bytes"

interface ToInputProps {
  currentUnits: ByteUnit[]
  result: number
  toUnit: ByteUnit
  setToUnit: (unit: ByteUnit) => void
}

export function ToInput(props: ToInputProps) {
  const { result, currentUnits, toUnit, setToUnit } = props

  const [copied, setCopied] = useState(false)

  function handleCopyResult() {
    navigator.clipboard.writeText(formatByteValue(result))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative flex items-center justify-center">
      <Select
        value={toUnit.symbol}
        onValueChange={(v) => {
          const unit = getUnitBySymbol(v)
          if (unit) setToUnit(unit)
        }}
      >
        <SelectTrigger showIcon={false} className="rounded-r-none">
          <SelectValue>
            <span>{toUnit.symbol}</span>
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {currentUnits.map((unit) => (
            <SelectItem key={unit.symbol} value={unit.symbol}>
              <div className="flex w-full items-center justify-center">
                <span>{unit.symbol}</span>
                <span className="text-muted-foreground ml-2">{unit.label}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Input
        id="to-value"
        type="text"
        value={formatByteValue(result)}
        readOnly
        className="pointer-events-none rounded-l-none border-l-0 font-mono text-lg"
      />
      <Hint label="Copy result" asChild>
        <Button
          onClick={handleCopyResult}
          size="icon"
          variant="ghost"
          className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
        >
          {copied ? (
            <ClipboardCheck className="text-emerald-500" />
          ) : (
            <Clipboard />
          )}
        </Button>
      </Hint>
    </div>
  )
}
