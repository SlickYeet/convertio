import { Suspense } from "react"

import { ConverterForm } from "@/components/converter-form"
import { PageHeader } from "@/components/layout/page-header"
import { RedirectToDefaultConverter } from "@/components/redirect-to-default-converter"

export default function ConvertPage() {
  return (
    <Suspense fallback={null}>
      <PageHeader />
      <div className="grid gap-6 lg:grid-cols-2">
        <ConverterForm fileType="md-to-pdf" />
      </div>
      <RedirectToDefaultConverter />
    </Suspense>
  )
}
