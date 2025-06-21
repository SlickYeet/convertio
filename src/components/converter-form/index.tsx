"use client"

import { AlertCircle, CheckCircle, FileText } from "lucide-react"
import { useEffect, useState } from "react"

import { FileUpload } from "@/components/converter-form/file-upload"
import { MarkdownEditor } from "@/components/converter-form/markdown-editor"
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
import { SAMPLE_MARKDOWN } from "@/const/sample-markdown"

export function ConverterForm() {
  const [markdown, setMarkdown] = useState<string>(SAMPLE_MARKDOWN)
  const [isConverted, setIsConverted] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [pdfBlob, setPdfBlob] = useState<Blob | null>(null)
  const [activeTab, setActiveTab] = useState<string>("preview")

  return (
    <>
      <Card className="h-full max-h-[calc(100vh-16rem)]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="size-5" />
            Input Markdown
          </CardTitle>
          <CardDescription>
            Paste your markdown content or upload a .md file
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <FileUpload
            setMarkdown={setMarkdown}
            setIsConverted={setIsConverted}
            setError={setError}
            setPdfBlob={setPdfBlob}
          />

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="size-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <MarkdownEditor
            markdown={markdown}
            setMarkdown={setMarkdown}
            setIsConverted={setIsConverted}
            setError={setError}
            setPdfBlob={setPdfBlob}
            setActiveTab={setActiveTab}
          />
        </CardContent>
      </Card>

      <Card className="h-full max-h-[calc(100vh-16rem)]">
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
              : "Live preview of your markdown content"}
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
              <Preview markdown={markdown} />
            </TabsContent>

            <TabsContent value="output" className="mt-4">
              <Output
                markdown={markdown}
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
