import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  RotateCw,
  ZoomIn,
  ZoomOut,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

interface ToolbarProps {
  currentPage: number
  totalPages: number
  scale: number
  isFullscreen: boolean
  handlePrevPage: () => void
  handleNextPage: () => void
  handleZoomIn: () => void
  handleZoomOut: () => void
  handleRotate: () => void
  handleFullscreen: () => void
}

export function Toolbar(props: ToolbarProps) {
  const {
    currentPage,
    totalPages,
    scale,
    isFullscreen,
    handlePrevPage,
    handleNextPage,
    handleZoomIn,
    handleZoomOut,
    handleRotate,
    handleFullscreen,
  } = props

  return (
    <div className="bg-muted rounded-lg p-2">
      <div className="grid w-full grid-cols-1 gap-y-2 @md:flex @md:flex-row @md:items-center @md:justify-between">
        {/* Page Navigation */}
        <div className="flex items-center justify-between">
          <Button
            disabled={currentPage <= 1}
            onClick={handlePrevPage}
            size="icon"
            variant="outline"
          >
            <ChevronLeft className="size-4" />
            <span className="sr-only">Previous Page</span>
          </Button>
          <span className="px-2 text-sm font-medium">
            {currentPage} / {totalPages}
          </span>
          <Button
            disabled={currentPage >= totalPages}
            onClick={handleNextPage}
            size="icon"
            variant="outline"
          >
            <ChevronRight className="size-4" />
            <span className="sr-only">Next Page</span>
          </Button>
        </div>

        <Separator orientation="vertical" className="h-6" />

        {/* Zoom Controls */}
        <div className="flex items-center justify-between">
          <Button
            disabled={scale <= 0.5}
            onClick={handleZoomOut}
            size="icon"
            variant="outline"
          >
            <ZoomOut className="size-4" />
            <span className="sr-only">Zoom Out</span>
          </Button>
          <span className="min-w-[60px] px-2 text-center text-sm font-medium">
            {Math.round(scale * 100)}%
          </span>
          <Button
            disabled={scale >= 3.0}
            onClick={handleZoomIn}
            size="icon"
            variant="outline"
          >
            <ZoomIn className="size-4" />
            <span className="sr-only">Zoom In</span>
          </Button>
        </div>

        <Separator orientation="vertical" className="h-6" />

        <div className="flex items-center justify-between gap-2">
          {/* Rotate */}
          <Button onClick={handleRotate} size="icon" variant="outline">
            <RotateCw className="size-4" />
            <span className="sr-only">Rotate</span>
          </Button>

          {/* Fullscreen */}
          <Button onClick={handleFullscreen} size="icon" variant="outline">
            {isFullscreen ? (
              <>
                <Minimize2 className="size-4" />
                <span className="sr-only">Exit Fullscreen</span>
              </>
            ) : (
              <>
                <Maximize2 className="size-4" />
                <span className="sr-only">Enter Fullscreen</span>
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
