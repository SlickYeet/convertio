import { Code, Diff, File, LucideIcon, Text } from "lucide-react"

export const CONFIG: ConfigList = {
  converters: {
    "md-to-pdf": {
      label: "Markdown to PDF Converter",
      href: "md-to-pdf",
      description: "Convert Markdown files to PDF documents.",
      inputLabel: "markdown file",
      fileTypes: [".md", ".txt"],
      mimeTypes: ["text/markdown", "text/plain"],
      apiEndpoint: "/api/convert/md-to-pdf",
      popular: true,
    },
    "html-to-pdf": {
      label: "Markdown to HTML Converter",
      href: "html-to-pdf",
      description: "Convert HTML files to PDF documents.",
      inputLabel: "HTML file",
      fileTypes: [".html", ".htm"],
      mimeTypes: ["text/html"],
      apiEndpoint: "/api/convert/html-to-pdf",
      icon: Code,
    },
    "text-to-pdf": {
      label: "Text to PDF Converter",
      href: "text-to-pdf",
      description: "Convert plain text files to PDF format.",
      inputLabel: "text file",
      fileTypes: [".txt"],
      mimeTypes: ["text/plain"],
      apiEndpoint: "/api/convert/text-to-pdf",
      icon: File,
      comingSoon: true,
    },
  },
  tools: {
    "text-diff": {
      label: "Text Diff Tool",
      href: "text-diff",
      description: "Compare two text files and highlight differences.",
      inputLabel: "Text Files",
      fileTypes: [".txt"],
      mimeTypes: ["text/plain"],
      apiEndpoint: "/api/tools/text-diff",
      icon: Diff,
      comingSoon: true,
    },
    "markdown-editor": {
      label: "Markdown Editor",
      href: "markdown-editor",
      description: "Preview Markdown files in real-time as you edit.",
      inputLabel: "Markdown File",
      fileTypes: [".md", ".txt"],
      mimeTypes: ["text/markdown", "text/plain"],
      apiEndpoint: "/api/tools/markdown-editor",
      icon: Text,
      comingSoon: true,
    },
  },
  utilities: {
    "byte-calculator": {
      label: "Byte Calculator",
      href: "byte-calculator",
      description: "Convert between different byte units (KB, MB, GB, etc.).",
      inputLabel: "Bytes",
      apiEndpoint: "/api/utils/byte-calculator",
      comingSoon: true,
    },
  },
}

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

type ConfigList = {
  converters: { [key: string]: ConverterConfig }
  tools: { [key: string]: ToolConfig }
  utilities: { [key: string]: UtilityConfig }
}

export type ConfigItem = {
  label: string
  href: string
  description: string
  inputLabel?: string
  icon?: LucideIcon
  popular?: boolean
  comingSoon?: boolean
}

type ConverterConfig = ConfigItem & {
  fileTypes: string[]
  mimeTypes: string[]
  apiEndpoint: string
}

type ToolConfig = ConfigItem & {
  fileTypes?: string[]
  mimeTypes?: string[]
  apiEndpoint: string
}

type UtilityConfig = ConfigItem & {
  apiEndpoint: string
}
