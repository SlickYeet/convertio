import { Code, Diff, File, LucideIcon, Text } from "lucide-react"

export const NAVIGATION: NavigationListProps[] = [
  {
    label: "converters",
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
  {
    label: "tools",
    items: [
      {
        label: "Text Diff",
        href: "/tools/text-diff",
        description: "Compare two text files and highlight differences.",
        icon: Diff,
        comingSoon: true,
      },
      {
        label: "Markdown Editor",
        href: "/tools/markdown-editor",
        description: "Preview Markdown files in real-time as you edit.",
        comingSoon: true,
      },
    ],
  },
  {
    label: "utilities",
    items: [
      {
        label: "Byte Calculator",
        href: "/utils/byte-calculator",
        description: "Convert between different byte units (KB, MB, GB, etc.).",
        comingSoon: true,
      },
    ],
  },
]

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
