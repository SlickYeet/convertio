import { ConverterForm } from "@/components/converter-form"
import { PageHeader } from "@/components/layout/page-header"
import { CONFIG } from "@/constants/conversion"
import type { CurrentType } from "@/types"

interface ConvertPageProps {
  searchParams: Promise<{
    type?: string
  }>
}

export default async function ConvertPage({ searchParams }: ConvertPageProps) {
  const { type } = (await searchParams) || "md-to-pdf"

  let wrongType = false
  if (!type || !(type in CONFIG.converters)) {
    wrongType = true
  }

  return (
    <>
      <PageHeader wrongType={wrongType} />
      {!wrongType && (
        <div className="grid gap-6 lg:grid-cols-2">
          <ConverterForm currentType={type as CurrentType} />
        </div>
      )}
    </>
  )
}
