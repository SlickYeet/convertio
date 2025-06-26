import { CONFIG } from "@/constants/conversion"
import { convert } from "@/lib/conversion"
import type { BatchFile, CurrentType } from "@/types"

interface BatchFileContext {
  file: BatchFile
  setBatchFiles: React.Dispatch<React.SetStateAction<BatchFile[]>>
  currentType: CurrentType
}

export async function convertBatchFile(
  props: BatchFileContext,
): Promise<BatchFile> {
  const { file, setBatchFiles, currentType } = props

  const config =
    CONFIG.converters[currentType as keyof typeof CONFIG.converters]
  const apiEndpoint = config.apiEndpoint
  const inputType = config.fileTypes[0].replace(/^\./, "")

  try {
    setBatchFiles((prev) =>
      prev.map((f) =>
        f.id === file.id ? { ...f, status: "converting", process: 50 } : f,
      ),
    )

    const pdfBlob = await convert({
      apiEndpoint,
      input: file.content,
      inputType,
    })

    return {
      ...file,
      status: "completed",
      progress: 100,
      pdfBlob,
    }
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Conversion failed"
    return {
      ...file,
      status: "error",
      progress: 0,
      error: errorMessage,
    }
  }
}
