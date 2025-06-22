import { Code, File, LucideIcon } from "lucide-react"

export type NavigationItem = {
  label: string
  href: string
  description: string
  icon?: LucideIcon
  popular?: boolean
  comingSoon?: boolean
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
        popular: true,
      },
      {
        label: "HTML to PDF",
        href: "/html-to-pdf",
        description: "Convert HTML files to PDF documents.",
        icon: Code,
        comingSoon: true,
      },
      {
        label: "Text to PDF",
        href: "/text-to-pdf",
        description: "Convert plain text files to PDF documents.",
        icon: File,
        comingSoon: true,
      },
    ],
  },
]
