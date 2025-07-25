"use client"

import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { getUnitBySymbol, type ByteUnit } from "@/lib/bytes"

interface FromInputProps {
  currentUnits: ByteUnit[]
  inputValue: number
  fromUnit: ByteUnit
  setInputValue: (value: number) => void
  setFromUnit: (unit: ByteUnit) => void
}

export function FromInput(props: FromInputProps) {
  const { inputValue, currentUnits, fromUnit, setInputValue, setFromUnit } =
    props

  return (
    <div className="flex items-center justify-center">
      <Select
        value={fromUnit.symbol}
        onValueChange={(v) => {
          const unit = getUnitBySymbol(v)
          if (unit) setFromUnit(unit)
        }}
      >
        <SelectTrigger showIcon={false} className="rounded-r-none">
          <SelectValue>
            <span>{fromUnit.symbol}</span>
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
        id="from-value"
        type="number"
        value={inputValue}
        onChange={(e) => setInputValue(Number(e.target.value))}
        placeholder="Enter value"
        className="rounded-l-none border-l-0 text-lg"
      />
    </div>
  )
}
