import { PageHeader } from "@/components/layout/page-header"
import { TextDiffViewer } from "@/components/tools/text-diff-viewer"
import { CONFIG } from "@/constants/conversion"
import type { CurrentType } from "@/types"

interface ToolsPageProps {
  searchParams: Promise<{
    type?: string
  }>
}

export default async function ToolsPage({ searchParams }: ToolsPageProps) {
  const { type } = await searchParams

  const currentType = type as CurrentType
  let wrongType = false
  if (!currentType || !(currentType in CONFIG.tools)) {
    wrongType = true
  }

  return (
    <>
      <PageHeader wrongType={wrongType} />
      {currentType === "text-diff" && (
        <TextDiffViewer currentType={currentType} />
      )}
    </>
  )
}
