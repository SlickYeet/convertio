"use client"

import { ArrowRightLeft, ArrowUpDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { FromInput } from "@/components/utilities/byte-calculator/from-input"
import { ToInput } from "@/components/utilities/byte-calculator/to-input"
import { BINARY_UNITS, DECIMAL_UNITS, type ByteUnit } from "@/lib/bytes"

interface CalculatorProps {
  unitSystem: "binary" | "decimal"
  inputValue: number
  setInputValue: (value: number) => void
  fromUnit: ByteUnit
  setFromUnit: (unit: ByteUnit) => void
  toUnit: ByteUnit
  setToUnit: (unit: ByteUnit) => void
  result: number
}

export function Calculator(props: CalculatorProps) {
  const {
    unitSystem,
    inputValue,
    setInputValue,
    fromUnit,
    setFromUnit,
    toUnit,
    setToUnit,
    result,
  } = props

  function handleSwapUnits() {
    const temp = fromUnit
    setFromUnit(toUnit)
    setToUnit(temp)
    setInputValue(result)
  }

  const currentUnits = unitSystem === "binary" ? BINARY_UNITS : DECIMAL_UNITS

  return (
    <div className="flex flex-col items-start gap-6 md:flex-row md:items-end">
      {/* From */}
      <div className="w-full space-y-3">
        <Label htmlFor="from-value">From</Label>
        <FromInput
          currentUnits={currentUnits}
          inputValue={inputValue}
          fromUnit={fromUnit}
          setInputValue={setInputValue}
          setFromUnit={setFromUnit}
        />
      </div>

      <Button onClick={handleSwapUnits} size="icon" variant="outline">
        <ArrowUpDown className="block md:hidden" />
        <ArrowRightLeft className="hidden md:block" />
      </Button>

      {/* To */}
      <div className="w-full space-y-3">
        <Label htmlFor="to-value">To</Label>
        <ToInput
          currentUnits={currentUnits}
          result={result}
          toUnit={toUnit}
          setToUnit={setToUnit}
        />
      </div>
    </div>
  )
}
