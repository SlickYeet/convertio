import { ConverterForm } from "@/components/converter-form"
import { PageHeader } from "@/components/layout/page-header"
import { CONFIG } from "@/constants/conversion"
import type { CurrentType } from "@/types"

interface ConvertersPageProps {
  searchParams: Promise<{
    type?: string
  }>
}

export default async function ConvertersPage({
  searchParams,
}: ConvertersPageProps) {
  const { type } = (await searchParams) || "md-to-pdf"

  let wrongType = false
  if (!type || !(type in CONFIG.converters)) {
    wrongType = true
  }

  return (
    <>
      <PageHeader wrongType={wrongType} />
      {!wrongType && <ConverterForm currentType={type as CurrentType} />}
    </>
  )
}
