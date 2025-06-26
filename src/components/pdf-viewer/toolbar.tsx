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
            size="sm"
            variant="outline"
          >
            <ChevronLeft className="size-4" />
          </Button>
          <span className="px-2 text-sm font-medium">
            {currentPage} / {totalPages}
          </span>
          <Button
            disabled={currentPage >= totalPages}
            onClick={handleNextPage}
            size="sm"
            variant="outline"
          >
            <ChevronRight className="size-4" />
          </Button>
        </div>

        <Separator orientation="vertical" className="h-6" />

        {/* Zoom Controls */}
        <div className="flex items-center justify-between">
          <Button
            disabled={scale <= 0.5}
            onClick={handleZoomOut}
            size="sm"
            variant="outline"
          >
            <ZoomOut className="size-4" />
          </Button>
          <span className="min-w-[60px] px-2 text-center text-sm font-medium">
            {Math.round(scale * 100)}%
          </span>
          <Button
            disabled={scale >= 3.0}
            onClick={handleZoomIn}
            size="sm"
            variant="outline"
          >
            <ZoomIn className="size-4" />
          </Button>
        </div>

        <Separator orientation="vertical" className="h-6" />

        <div className="flex items-center justify-between gap-2">
          {/* Rotate */}
          <Button onClick={handleRotate} size="sm" variant="outline">
            <RotateCw className="size-4" />
          </Button>

          {/* Fullscreen */}
          <Button onClick={handleFullscreen} size="sm" variant="outline">
            {isFullscreen ? (
              <Minimize2 className="size-4" />
            ) : (
              <Maximize2 className="size-4" />
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
