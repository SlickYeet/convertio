"use client"

import { Button } from "@/components/ui/button"

interface UnitSystemToggleProps {
  unitSystem: "decimal" | "binary"
  setUnitSystem: (unitSystem: "decimal" | "binary") => void
}

export function UnitSystemToggle({
  unitSystem,
  setUnitSystem,
}: UnitSystemToggleProps) {
  return (
    <div className="flex justify-center">
      <div className="bg-muted rounded-lg p-1">
        <Button
          onClick={() => setUnitSystem("binary")}
          size="sm"
          variant={unitSystem === "binary" ? "default" : "ghost"}
        >
          Binary (1024)
        </Button>
        <Button
          onClick={() => setUnitSystem("decimal")}
          size="sm"
          variant={unitSystem === "decimal" ? "default" : "ghost"}
        >
          Decimal (1000)
        </Button>
      </div>
    </div>
  )
}
