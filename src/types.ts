import { CONFIG } from "@/constants/conversion"

export type CurrentType =
  | (typeof CONFIG.converters)[keyof typeof CONFIG.converters]["href"]
  | (typeof CONFIG.tools)[keyof typeof CONFIG.tools]["href"]
  | (typeof CONFIG.utilities)[keyof typeof CONFIG.utilities]["href"]

/**
 * Represents the input type for a converter, or tool.
 *
 * @example
 * const inputType = config.fileTypes[0].replace(/^\./, "")
 */
export type InputType =
  | (typeof CONFIG.converters)[keyof typeof CONFIG.converters]["fileTypes"][0]
  | (typeof CONFIG.tools)[keyof typeof CONFIG.tools]["fileTypes"][0]

export type BatchFile = {
  id: string
  file: File
  content: string
  status: "pending" | "converting" | "completed" | "error"
  progress: number
  pdfBlob?: Blob
  error?: string
}
