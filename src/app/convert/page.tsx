import { Loader2 } from "lucide-react"
import { Suspense } from "react"

import { ConverterForm } from "@/components/converter-form"
import { PageHeader } from "@/components/layout/page-header"
import { RedirectToDefaultConverter } from "@/components/redirect-to-default-converter"

export default function ConvertPage() {
  return (
    <Suspense fallback={<Loading />}>
      <PageHeader />
      <div className="grid gap-6 lg:grid-cols-2">
        <ConverterForm fileType="md-to-pdf" />
      </div>
      <RedirectToDefaultConverter />
    </Suspense>
  )
}

function Loading() {
  return (
    <div className="mt-12 flex h-full w-full items-center justify-center gap-1.5">
      <Loader2 className="text-muted-foreground animate-spin" />
      <p className="text-muted-foreground">Loading...</p>
    </div>
  )
}
