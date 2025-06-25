"use client"

import { AlertCircle, CheckCircle, FileText } from "lucide-react"
import { useEffect, useState } from "react"

import { Editor } from "@/components/converter-form/editor"
import { FileUpload } from "@/components/converter-form/file-upload"
import { Output } from "@/components/converter-form/output"
import { Preview } from "@/components/converter-form/preview"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CONFIG } from "@/constants/conversion"
import { SAMPLE_CONTENT } from "@/constants/sample"
import type { CurrentType } from "@/types"

export function ConverterForm({ currentType }: { currentType: CurrentType }) {
  const sampleInput = SAMPLE_CONTENT[currentType]

  const [input, setInput] = useState<string>(sampleInput)
  const [isConverted, setIsConverted] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [pdfBlob, setPdfBlob] = useState<Blob | null>(null)
  const [activeTab, setActiveTab] = useState<string>("preview")

  const config = CONFIG.converters[currentType]
  const inputLabel = config.inputLabel
  const fileTypes = config.fileTypes.join(", or ")

  useEffect(() => {
    setInput(sampleInput)
    setIsConverted(false)
    setError(null)
    setPdfBlob(null)
    /**
     * It does not make sense to include `sampleInput` in the dependency array
     * because it is a static constant value.
     */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentType])

  return (
    <>
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
          />

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="size-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

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
    </>
  )
}
