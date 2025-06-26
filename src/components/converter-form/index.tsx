"use client"

import { useEffect, useState } from "react"

import { ConvertBatchFiles } from "@/components/converter-form/batch-convert"
import { ConversionModeToggle } from "@/components/converter-form/mode-toggle"
import ConvertSingleFile from "@/components/converter-form/single-file"
import { SAMPLE_CONTENT } from "@/constants/sample"
import type { BatchFile, CurrentType } from "@/types"

export function ConverterForm({ currentType }: { currentType: CurrentType }) {
  const sampleInput = SAMPLE_CONTENT[currentType]

  const [conversionMode, setConversionMode] = useState<"single" | "batch">(
    "batch",
  )
  const [activeTab, setActiveTab] = useState<string>("preview")
  // Single file conversion stat
  const [input, setInput] = useState<string>(sampleInput)
  const [isConverted, setIsConverted] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [pdfBlob, setPdfBlob] = useState<Blob | null>(null)
  // Batch conversion state
  const [batchFiles, setBatchFiles] = useState<BatchFile[]>([])
  const [isBatchConverting, setIsBatchConverting] = useState<boolean>(false)
  const [batchProgress, setBatchProgress] = useState<number>(0)

  useEffect(() => {
    setInput(sampleInput)
    setIsConverted(false)
    setError(null)
    setPdfBlob(null)
    setBatchFiles([])
    setBatchProgress(0)
    setIsBatchConverting(false)
    /**
     * It does not make sense to include `sampleInput` in the dependency array
     * because it is a static constant value.
     */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentType])

  return (
    <div className="flex flex-col">
      <ConversionModeToggle
        conversionMode={conversionMode}
        setConversionMode={setConversionMode}
      />

      {conversionMode === "single" && (
        <ConvertSingleFile
          currentType={currentType}
          conversionMode="single"
          input={input}
          error={error}
          isConverted={isConverted}
          activeTab={activeTab}
          pdfBlob={pdfBlob}
          setInput={setInput}
          setIsConverted={setIsConverted}
          setError={setError}
          setPdfBlob={setPdfBlob}
          setActiveTab={setActiveTab}
        />
      )}

      {conversionMode === "batch" && (
        <ConvertBatchFiles
          currentType={currentType}
          conversionMode="batch"
          error={error}
          isConverted={isConverted}
          batchFiles={batchFiles}
          isBatchConverting={isBatchConverting}
          batchProgress={batchProgress}
          setError={setError}
          setIsConverted={setIsConverted}
          setBatchFiles={setBatchFiles}
          setIsBatchConverting={setIsBatchConverting}
          setBatchProgress={setBatchProgress}
        />
      )}
    </div>
  )
}
