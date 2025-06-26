"use client"

import { CheckCircle, FileText } from "lucide-react"

import { Editor } from "@/components/converter-form/editor"
import { FileUpload } from "@/components/converter-form/file-upload"
import { Output } from "@/components/converter-form/output"
import { Preview } from "@/components/converter-form/preview"
import ErrorAlert from "@/components/error-alert"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CONFIG } from "@/constants/conversion"
import type { CurrentType } from "@/types"

interface ConvertSingleFileProps {
  currentType: CurrentType
  conversionMode?: "single" | "batch"
  input: string
  error: string | null
  isConverted: boolean
  activeTab: string
  pdfBlob: Blob | null
  setInput: React.Dispatch<React.SetStateAction<string>>
  setIsConverted: React.Dispatch<React.SetStateAction<boolean>>
  setError: React.Dispatch<React.SetStateAction<string | null>>
  setPdfBlob: React.Dispatch<React.SetStateAction<Blob | null>>
  setActiveTab: React.Dispatch<React.SetStateAction<string>>
}

export default function ConvertSingleFile(props: ConvertSingleFileProps) {
  const {
    currentType,
    conversionMode = "single",
    input,
    error,
    isConverted,
    activeTab,
    pdfBlob,
    setInput,
    setIsConverted,
    setError,
    setPdfBlob,
    setActiveTab,
  } = props

  const config =
    CONFIG.converters[currentType as keyof typeof CONFIG.converters]
  const inputLabel = config.inputLabel
  const fileTypes = config.fileTypes.join(" or ")

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 capitalize">
            <FileText className="size-5" />
            Input {inputLabel}
          </CardTitle>
          <CardDescription>
            Paste your {inputLabel} content or upload a {fileTypes} file
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <FileUpload
            setInput={setInput}
            setIsConverted={setIsConverted}
            setError={setError}
            setPdfBlob={setPdfBlob}
            currentType={currentType}
            conversionMode={conversionMode}
          />

          {error && <ErrorAlert error={error} />}

          <Editor
            input={input}
            setInput={setInput}
            setIsConverted={setIsConverted}
            setError={setError}
            setPdfBlob={setPdfBlob}
            setActiveTab={setActiveTab}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {isConverted ? (
              <>
                <CheckCircle className="size-4 text-emerald-600" />
                Conversion Complete
              </>
            ) : (
              <>
                <FileText className="size-4" />
                Preview & Output
              </>
            )}
          </CardTitle>
          <CardDescription>
            {isConverted
              ? "Your PDF is ready for download"
              : `Live preview of your ${inputLabel} content`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs
            value={activeTab}
            onValueChange={(t) => setActiveTab(t)}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger disabled={!isConverted} value="output">
                Output
              </TabsTrigger>
            </TabsList>

            <TabsContent value="preview" className="mt-4">
              <Preview input={input} currentType={currentType} />
            </TabsContent>

            <TabsContent value="output" className="mt-4">
              <Output
                input={input}
                isConverted={isConverted}
                pdfBlob={pdfBlob}
                currentType={currentType}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
