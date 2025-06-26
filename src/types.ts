import { CONFIG } from "@/constants/conversion"
import { SAMPLE_CONTENT } from "@/constants/sample"

export type CurrentType = keyof typeof SAMPLE_CONTENT

/**
 * !This type is ironically not creating typesafety, so do not assign a value manually.
 *
 * !Always use `CONFIG.converters` to ensure the type is correct.
 *
 * @example
 * const inputType = config.fileTypes[0].replace(/^\./, "")
 */
export type InputType = (typeof CONFIG.converters)[CurrentType]["fileTypes"][0]

export type OutputType = "pdf"

export type BatchFile = {
  id: string
  file: File
  content: string
  status: "pending" | "converting" | "completed" | "error"
  progress: number
  pdfBlob?: Blob
  error?: string
}
