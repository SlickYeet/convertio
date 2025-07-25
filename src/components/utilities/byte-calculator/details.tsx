import { formatByteValue, type ByteUnit } from "@/lib/bytes"

interface DetailsProps {
  inputValue: number
  fromUnit: ByteUnit
  toUnit: ByteUnit
  unitSystem: "binary" | "decimal"
  result: number
}

export function Details(props: DetailsProps) {
  const { inputValue, fromUnit, toUnit, unitSystem, result } = props

  return (
    <div className="bg-muted/50 rounded-lg p-4">
      <h4 className="mb-2 font-medium">Conversion Details</h4>
      <div className="text-muted-foreground space-y-1 text-sm">
        <p>
          <strong>Formula:</strong> {inputValue} {fromUnit.symbol} *{" "}
          {fromUnit.bytes / toUnit.bytes} = {formatByteValue(result)}{" "}
          {toUnit.symbol}
        </p>
        <p>
          <strong>System:</strong>{" "}
          {unitSystem === "binary"
            ? "Binary (1024-based)"
            : "Decimal (1000-based)"}
        </p>
        <p>
          <strong>Precision:</strong> Up to 6 significan digits
        </p>
      </div>
    </div>
  )
}
