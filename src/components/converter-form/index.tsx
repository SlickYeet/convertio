"use client"

import { AlertCircle, CheckCircle, FileText } from "lucide-react"
import { useState } from "react"

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
import { sampleContent } from "@/constants/sample"
import { formatFileType } from "@/lib/utils"

export function ConverterForm({ fileType }: { fileType: string }) {
  const sampleInput = sampleContent(fileType)

  const [input, setInput] = useState<string>(sampleInput)
  const [isConverted, setIsConverted] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [pdfBlob, setPdfBlob] = useState<Blob | null>(null)
  const [activeTab, setActiveTab] = useState<string>("preview")

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="size-5" />
            Input {formatFileType(fileType)}
          </CardTitle>
          <CardDescription>
            Paste your {fileType} content or upload a .{fileType} file
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <FileUpload
            setInput={setInput}
            setIsConverted={setIsConverted}
            setError={setError}
            setPdfBlob={setPdfBlob}
            fileType={fileType}
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
              : `Live preview of your ${fileType} content`}
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
              <Preview input={input} fileType={fileType} />
            </TabsContent>

            <TabsContent value="output" className="mt-4">
              <Output
                input={input}
                isConverted={isConverted}
                pdfBlob={pdfBlob}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </>
  )
}
