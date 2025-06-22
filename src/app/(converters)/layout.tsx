import type { ReactNode } from "react"

import { PageHeader } from "@/components/layout/page-header"

export default function ConverterLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <PageHeader />
      <div className="grid gap-6 lg:grid-cols-2">{children}</div>
    </>
  )
}
