import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatFileType(fileType: string): string {
  switch (fileType) {
    case "pdf":
      return "PDF"
    case "md":
      return "Markdown"
    case "html":
      return "HTML"
    default:
      return fileType.charAt(0).toUpperCase() + fileType.slice(1).toLowerCase()
  }
}
