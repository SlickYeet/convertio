import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BINARY_UNITS, DECIMAL_UNITS } from "@/lib/bytes"

export function UnitReference() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Unit Reference</CardTitle>
        <CardDescription>
          Complete reference of all supported byte units
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="binary" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="binary">Binary (IEC)</TabsTrigger>
            <TabsTrigger value="decimal">Decimal (SI)</TabsTrigger>
          </TabsList>

          <TabsContent value="binary" className="mt-4">
            <div className="grid gap-2 overflow-clip rounded border">
              <table className="w-full">
                <thead className="bg-secondary/50">
                  <tr className="flex items-center justify-between rounded p-3">
                    <th className="text-left font-medium">Unit</th>
                    <th className="text-right font-medium">Equivalent</th>
                  </tr>
                </thead>
                <tbody>
                  {BINARY_UNITS.map((unit, index) => (
                    <tr
                      key={unit.symbol}
                      className="odd:bg-secondary even:bg-secondary/50 flex items-center justify-between p-3"
                    >
                      <td>
                        <span className="font-medium">{unit.symbol}</span>
                        <span className="text-muted-foreground ml-2">
                          ({unit.label})
                        </span>
                      </td>
                      <td className="text-muted-foreground text-sm">
                        {index === 0
                          ? "1 byte"
                          : `1,024${index > 1 ? `^${index}` : ""} bytes`}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>

          <TabsContent value="decimal" className="mt-4">
            <div className="grid gap-2 overflow-clip rounded border">
              <table className="w-full">
                <thead className="bg-secondary/50">
                  <tr className="flex items-center justify-between rounded p-3">
                    <th className="text-left font-medium">Unit</th>
                    <th className="text-right font-medium">Equivalent</th>
                  </tr>
                </thead>
                <tbody>
                  {DECIMAL_UNITS.map((unit, index) => (
                    <tr
                      key={unit.symbol}
                      className="odd:bg-secondary even:bg-secondary/50 flex items-center justify-between p-3"
                    >
                      <td>
                        <span className="font-medium">{unit.symbol}</span>
                        <span className="text-muted-foreground ml-2">
                          ({unit.label})
                        </span>
                      </td>
                      <td className="text-muted-foreground text-sm">
                        {index === 0
                          ? "1 byte"
                          : `1,000${index > 1 ? `^${index}` : ""} bytes`}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
