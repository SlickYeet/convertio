import {
  Calculator,
  Code,
  Diff,
  File,
  FileText,
  LucideIcon,
  Text,
} from "lucide-react"

export const CONFIG = {
  converters: {
    "md-to-pdf": {
      label: "Markdown to PDF Converter",
      href: "md-to-pdf" as const,
      description: "Convert Markdown files to PDF documents.",
      inputLabel: "markdown file",
      fileTypes: [".md", ".txt"],
      mimeTypes: ["text/markdown", "text/plain"],
      apiEndpoint: "/api/convert/md-to-pdf",
      icon: FileText,
      popular: false,
      comingSoon: false,
      isNew: false,
    },
    "html-to-pdf": {
      label: "HTML to PDF Converter",
      href: "html-to-pdf" as const,
      description: "Convert HTML files to PDF documents.",
      inputLabel: "HTML file",
      fileTypes: [".html", ".htm"],
      mimeTypes: ["text/html"],
      apiEndpoint: "/api/convert/html-to-pdf",
      icon: Code,
      popular: false,
      comingSoon: false,
      isNew: false,
    },
    "text-to-pdf": {
      label: "Text to PDF Converter",
      href: "text-to-pdf" as const,
      description: "Convert plain text files to PDF format.",
      inputLabel: "text file",
      fileTypes: [".txt"],
      mimeTypes: ["text/plain"],
      apiEndpoint: "/api/convert/text-to-pdf",
      icon: File,
      popular: false,
      comingSoon: true,
      isNew: false,
    },
  },
  tools: {
    "text-diff": {
      label: "Text Diff Tool",
      href: "text-diff" as const,
      description: "Compare two text files and highlight differences.",
      inputLabel: "Text Files",
      fileTypes: [".txt"],
      mimeTypes: ["text/plain"],
      apiEndpoint: "",
      icon: Diff,
      popular: false,
      comingSoon: false,
      isNew: false,
    },
    "markdown-editor": {
      label: "Markdown Editor",
      href: "markdown-editor" as const,
      description: "Preview Markdown files in real-time as you edit.",
      inputLabel: "Markdown File",
      fileTypes: [".md", ".txt"],
      mimeTypes: ["text/markdown", "text/plain"],
      apiEndpoint: "/api/tools/markdown-editor",
      icon: Text,
      popular: false,
      comingSoon: true,
      isNew: false,
    },
  },
  utilities: {
    "byte-calculator": {
      label: "Byte Calculator",
      href: "byte-calculator" as const,
      description: "Convert between different byte units (KB, MB, GB, etc.).",
      inputLabel: "Bytes",
      apiEndpoint: "/api/utils/byte-calculator",
      icon: Calculator,
      popular: true,
      comingSoon: false,
      isNew: false,
    },
  },
} satisfies ConfigList

export const CONFIG_LIST = [
  {
    label: "Converters",
    items: Object.values(CONFIG.converters),
  },
  {
    label: "Tools",
    items: Object.values(CONFIG.tools),
  },
  {
    label: "Utilities",
    items: Object.values(CONFIG.utilities),
  },
]

export type ConfigList = {
  converters: { [key: string]: ConverterConfig }
  tools: { [key: string]: ToolConfig }
  utilities: { [key: string]: UtilityConfig }
}

export type ConfigItem = {
  label: string
  href: string
  description: string
  inputLabel: string
  icon?: LucideIcon
  popular?: boolean
  comingSoon?: boolean
  isNew?: boolean
}

type ConverterConfig = ConfigItem & {
  fileTypes: string[]
  mimeTypes: string[]
  apiEndpoint: string
}

type ToolConfig = ConfigItem & {
  fileTypes?: string[]
  mimeTypes?: string[]
  apiEndpoint?: string
}

type UtilityConfig = ConfigItem & {
  apiEndpoint: string
}
