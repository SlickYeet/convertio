import { LucideIcon } from "lucide-react"

export type NavigationItem = {
  label: string
  href: string
  description: string
  icon?: LucideIcon
}

type NavigationListProps = {
  label: string
  items: NavigationItem[]
}

export const NAVIGATION: NavigationListProps[] = [
  {
    label: "Converters",
    items: [
      {
        label: "Markdown to PDF",
        href: "/md-to-pdf",
        description: "Convert Markdown files to PDF documents.",
      },
      {
        label: "HTML to PDF",
        href: "/html-to-pdf",
        description: "Convert HTML files to PDF documents.",
      },
    ],
  },
]
