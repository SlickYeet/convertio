"use client"

import { Dot, Eye, EyeClosed } from "lucide-react"
import { useRef, useState } from "react"
import { Document, Page, pdfjs } from "react-pdf"

import "react-pdf/dist/esm/Page/AnnotationLayer.css"
import "react-pdf/dist/esm/Page/TextLayer.css"

import ErrorAlert from "@/components/error-alert"
import { Hint } from "@/components/hint"
import { Toolbar } from "@/components/pdf-viewer/toolbar"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn, formatFileSizes } from "@/lib/utils"

interface PDFViewerProps {
  pdfBlob: Blob
  filename?: string
  className?: string
}

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString()

export function PDFViewer(props: PDFViewerProps) {
  const { pdfBlob, filename, className } = props

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const [isHidden, setIsHidden] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState<number>(0)
  const [totalPages, setTotalPages] = useState<number>(0)
  const [scale, setScale] = useState<number>(0.75)
  const [rotation, setRotation] = useState<number>(0)
  const [isFullscreen, setIsFullscreen] = useState(false)

  function handleZoomIn() {
    setScale((prev) => Math.min(prev + 0.25, 3.0))
  }

  function handleZoomOut() {
    setScale((prev) => Math.max(prev - 0.25, 0.5))
  }

  function handleRotate() {
    setRotation((prev) => (prev + 90) % 360)
  }

  function handlePrevPage() {
    setCurrentPage((prev) => Math.max(prev - 1, 1))
  }

  function handleNextPage() {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
  }

  function handleFullscreen() {
    if (!isFullscreen) {
      if (containerRef.current?.requestFullscreen) {
        containerRef.current.requestFullscreen()
        setIsFullscreen(true)
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
        setIsFullscreen(false)
      }
    }
  }

  if (error) return <ErrorAlert error={error} />

  return (
    <Card ref={containerRef} className={cn("@container max-w-full", className)}>
      <div className="flex items-start justify-between pr-6">
        <CardHeader className="flex-1">
          <CardTitle className="flex items-center gap-2">
            <Eye className="size-5" />
            PDF Preview
          </CardTitle>
          <CardDescription className="flex flex-col @lg:flex-row">
            <span>
              {filename} <Dot className="hidden @lg:inline" />
            </span>
            <span>{formatFileSizes(pdfBlob.size)}</span>
            <span>
              {totalPages > 0 && (
                <>
                  <Dot className="hidden @lg:inline" />
                  {totalPages} page{totalPages > 1 ? "s" : ""}
                </>
              )}
            </span>
          </CardDescription>
        </CardHeader>

        <Hint
          label={isHidden ? "Show PDF Preview" : "Hide PDF preview"}
          side="left"
          asChild
        >
          <Button
            onClick={() => setIsHidden(!isHidden)}
            size="icon"
            variant="ghost"
            className={isFullscreen ? "hidden" : "flex"}
          >
            {isHidden ? (
              <Eye className="size-4" />
            ) : (
              <EyeClosed className="size-4" />
            )}
          </Button>
        </Hint>
      </div>
      <CardContent className={cn("h-full space-y-4", isHidden && "hidden")}>
        <Toolbar
          currentPage={currentPage}
          totalPages={totalPages}
          scale={scale}
          isFullscreen={isFullscreen}
          handlePrevPage={handlePrevPage}
          handleNextPage={handleNextPage}
          handleZoomIn={handleZoomIn}
          handleZoomOut={handleZoomOut}
          handleRotate={handleRotate}
          handleFullscreen={handleFullscreen}
        />

        <div className="relative h-full max-h-[calc(100dvh-15rem)] overflow-auto rounded-lg border bg-slate-100">
          <div className="flex justify-center p-4">
            <Document
              file={pdfBlob}
              onLoadSuccess={(doc) => {
                setTotalPages(doc.numPages)
                setCurrentPage(1)
              }}
              onLoadError={(error) => {
                console.error("Error loading PDF document:", error)
                setError("Failed to load PDF document.")
              }}
              loading={<span className="text-sm">Loading PDF...</span>}
              noData={<span className="text-sm">No PDF data available</span>}
            >
              <Page
                pageNumber={currentPage}
                scale={scale}
                rotate={rotation}
                canvasRef={canvasRef}
                loading={<span className="text-sm">Loading page...</span>}
                noData={<span className="text-sm">No page data available</span>}
              />
            </Document>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm @md:grid-cols-4">
          <div>
            <span className="text-muted-foreground">File Size:</span>
            <div className="font-medium">{formatFileSizes(pdfBlob.size)}</div>
          </div>
          <div>
            <span className="text-muted-foreground">Pages:</span>
            <div className="font-medium">{totalPages}</div>
          </div>
          <div>
            <span className="text-muted-foreground">Current Zoom:</span>
            <div className="font-medium">{Math.round(scale * 100)}%</div>
          </div>
          <div>
            <span className="text-muted-foreground">Rotation:</span>
            <div className="font-medium">{rotation}°</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
