export interface ByteUnit {
  label: string
  symbol: string
  bytes: number
  system: "binary" | "decimal"
}

export const BINARY_UNITS: ByteUnit[] = [
  { label: "Byte", symbol: "B", bytes: 1, system: "binary" },
  { label: "Kilobyte", symbol: "KiB", bytes: 1024, system: "binary" },
  { label: "Megabyte", symbol: "MiB", bytes: 1024 ** 2, system: "binary" },
  { label: "Gigabyte", symbol: "GiB", bytes: 1024 ** 3, system: "binary" },
  { label: "Terabyte", symbol: "TiB", bytes: 1024 ** 4, system: "binary" },
  { label: "Petabyte", symbol: "PiB", bytes: 1024 ** 5, system: "binary" },
  { label: "Exabyte", symbol: "EiB", bytes: 1024 ** 6, system: "binary" },
  { label: "Zettabyte", symbol: "ZiB", bytes: 1024 ** 7, system: "binary" },
  { label: "Yottabyte", symbol: "YiB", bytes: 1024 ** 8, system: "binary" },
]

export const DECIMAL_UNITS: ByteUnit[] = [
  { label: "Byte", symbol: "B", bytes: 1, system: "decimal" },
  { label: "Kilobyte", symbol: "KB", bytes: 1000, system: "decimal" },
  { label: "Megabyte", symbol: "MB", bytes: 1000 ** 2, system: "decimal" },
  { label: "Gigabyte", symbol: "GB", bytes: 1000 ** 3, system: "decimal" },
  { label: "Terabyte", symbol: "TB", bytes: 1000 ** 4, system: "decimal" },
  { label: "Petabyte", symbol: "PB", bytes: 1000 ** 5, system: "decimal" },
  { label: "Exabyte", symbol: "EB", bytes: 1000 ** 6, system: "decimal" },
  { label: "Zettabyte", symbol: "ZB", bytes: 1000 ** 7, system: "decimal" },
  { label: "Yottabyte", symbol: "YB", bytes: 1000 ** 8, system: "decimal" },
]

export const ALL_UNITS = [...BINARY_UNITS, ...DECIMAL_UNITS]

export function convertBytes(
  value: number,
  fromUnit: ByteUnit,
  toUnit: ByteUnit,
): number {
  if (value === 0) return 0

  const bytes = value * fromUnit.bytes
  return bytes / toUnit.bytes
}

export function formatByteValue(value: number, precision = 6): string {
  if (value === 0) return "0"
  if (value >= 1e15) return value.toExponential(precision)
  if (value < 1e-6 && value > 0) return value.toExponential(precision)

  const formatted = value.toPrecision(precision)
  return Number.parseFloat(formatted).toString()
}

export function getUnitBySymbol(symbol: string): ByteUnit | undefined {
  return ALL_UNITS.find((unit) => unit.symbol === symbol)
}
