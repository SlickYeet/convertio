import { PageHeader } from "@/components/layout/page-header"
import { ByteCalculator } from "@/components/utilities/byte-calculator"
import { CONFIG } from "@/constants/conversion"
import type { CurrentType } from "@/types"

interface UtilitiesPageProps {
  searchParams: Promise<{
    type?: string
  }>
}

export default async function UtilitiesPage({
  searchParams,
}: UtilitiesPageProps) {
  const { type } = await searchParams

  const currentType = type as CurrentType

  const wrongType = !currentType || !(currentType in CONFIG.utilities)

  return (
    <>
      <PageHeader wrongType={wrongType} />
      {currentType === "byte-calculator" && <ByteCalculator />}
    </>
  )
}
