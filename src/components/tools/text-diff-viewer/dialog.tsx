import { DiffMethod } from "react-diff-viewer"

import { DiffViewer } from "@/components/tools/text-diff-viewer/diff-viewer"
import { DiffViewerToolbar } from "@/components/tools/text-diff-viewer/toolbar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface DiffViewerDialogProps {
  open: boolean
  splitView: boolean
  syntaxLanguage: string
  isPreviewOpen: boolean
  oldText: string
  newText: string
  highlightLines: string[]
  languages: { value: string; label: string }[]
  onOpenChange: () => void
  setSplitView: (v: boolean) => void
  setSyntaxLanguage: (v: string) => void
  onLineNumberClick: (
    id: string,
    e: React.MouseEvent<HTMLTableCellElement>,
  ) => void
  renderSyntaxHighlightedContent: (str: string) => React.JSX.Element
}

export function DiffViewerDialog(props: DiffViewerDialogProps) {
  const {
    open,
    splitView,
    syntaxLanguage,
    isPreviewOpen,
    oldText,
    newText,
    highlightLines,
    languages,
    onOpenChange,
    setSplitView,
    setSyntaxLanguage,
    onLineNumberClick,
    renderSyntaxHighlightedContent,
  } = props

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="supports-[backdrop-filter]:bg-background/60 bg-background/90 mb-4 h-[90%] backdrop-blur md:min-w-[90vw] lg:min-w-[80vw]">
        <div className="mb-2 flex items-start justify-between">
          <DialogHeader>
            <DialogTitle>Difference</DialogTitle>
            <DialogDescription>
              {splitView ? "Side-by-Side View" : "Unified View"}
            </DialogDescription>
          </DialogHeader>
          <DiffViewerToolbar
            splitView={splitView}
            setSplitView={setSplitView}
            syntaxLanguage={syntaxLanguage}
            setSyntaxLanguage={setSyntaxLanguage}
            isPreviewOpen={isPreviewOpen}
            handlePreview={onOpenChange}
            languages={languages}
          />
        </div>
        <div className="h-full overflow-y-auto rounded-lg break-all">
          <DiffViewer
            oldValue={oldText}
            newValue={newText}
            splitView={splitView}
            hideLineNumbers={false}
            showDiffOnly={false}
            compareMethod={DiffMethod.WORDS}
            highlightLines={highlightLines}
            onLineNumberClick={onLineNumberClick}
            renderContent={renderSyntaxHighlightedContent}
            useDarkTheme
            styles={{
              contentText: {
                fontFamily: "var(--font-mono)",
                paddingRight: "1.5rem",
              },
              lineNumber: {
                fontFamily: "var(--font-mono)",
              },
            }}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
