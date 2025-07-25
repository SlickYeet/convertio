"use client"

import {
  CalculatorIcon,
  Clipboard,
  ClipboardCheck,
  RotateCcw,
} from "lucide-react"
import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Calculator } from "@/components/utilities/byte-calculator/calculator"
import { Details } from "@/components/utilities/byte-calculator/details"
import { UnitReference } from "@/components/utilities/byte-calculator/unit-reference"
import { UnitSystemToggle } from "@/components/utilities/byte-calculator/unit-system-toggle"
import {
  BINARY_UNITS,
  convertBytes,
  DECIMAL_UNITS,
  formatByteValue,
  type ByteUnit,
} from "@/lib/bytes"

export function ByteCalculator() {
  const [unitSystem, setUnitSystem] = useState<"binary" | "decimal">("binary")
  const [inputValue, setInputValue] = useState<number>(1)
  const [fromUnit, setFromUnit] = useState<ByteUnit>(BINARY_UNITS[3])
  const [toUnit, setToUnit] = useState<ByteUnit>(BINARY_UNITS[2])
  const [result, setResult] = useState<number>(0)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const value = inputValue || 0
    const converted = convertBytes(value, fromUnit, toUnit)
    setResult(converted)
  }, [inputValue, fromUnit, toUnit])

  function handleReset() {
    setInputValue(1)
    setFromUnit(BINARY_UNITS[3])
    setToUnit(BINARY_UNITS[2])
  }

  function handleCopyResult() {
    navigator.clipboard.writeText(formatByteValue(result))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  function handleUnitSystemChange(newSystem: "binary" | "decimal") {
    setUnitSystem(newSystem)
    const fromIdx = (
      unitSystem === "binary" ? BINARY_UNITS : DECIMAL_UNITS
    ).findIndex((u) => u.symbol === fromUnit.symbol)
    const toIdx = (
      unitSystem === "binary" ? BINARY_UNITS : DECIMAL_UNITS
    ).findIndex((u) => u.symbol === toUnit.symbol)

    setFromUnit(
      (newSystem === "binary" ? BINARY_UNITS : DECIMAL_UNITS)[
        fromIdx >= 0 ? fromIdx : 3
      ],
    )
    setToUnit(
      (newSystem === "binary" ? BINARY_UNITS : DECIMAL_UNITS)[
        toIdx >= 0 ? toIdx : 0
      ],
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex-1">
          <CardTitle className="flex items-center gap-2">
            <CalculatorIcon className="size-5" />
            Byte Calculator
          </CardTitle>
          <CardDescription>
            Convert between different byte units with precision. Supports both
            binary (1024) and decimal (1000) systems.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <UnitSystemToggle
            unitSystem={unitSystem}
            setUnitSystem={handleUnitSystemChange}
          />

          <Calculator
            unitSystem={unitSystem}
            inputValue={inputValue}
            setInputValue={setInputValue}
            fromUnit={fromUnit}
            setFromUnit={setFromUnit}
            toUnit={toUnit}
            setToUnit={setToUnit}
            result={result}
          />

          <div className="flex justify-center gap-2">
            <Button onClick={handleCopyResult}>
              {copied ? (
                <>
                  <ClipboardCheck />
                  <span>Result Copied!</span>
                </>
              ) : (
                <>
                  <Clipboard />
                  <span>Copy Result</span>
                </>
              )}
            </Button>
            <Button onClick={handleReset} variant="outline">
              <RotateCcw />
              Reset
            </Button>
          </div>

          <Details
            inputValue={inputValue}
            fromUnit={fromUnit}
            toUnit={toUnit}
            unitSystem={unitSystem}
            result={result}
          />
        </CardContent>
      </Card>

      <UnitReference />
    </div>
  )
}
