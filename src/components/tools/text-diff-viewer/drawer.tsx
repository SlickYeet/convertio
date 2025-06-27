import React from "react"
import { DiffMethod } from "react-diff-viewer"

import { DiffViewer } from "@/components/tools/text-diff-viewer/diff-viewer"
import { DiffViewerToolbar } from "@/components/tools/text-diff-viewer/toolbar"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"

interface DiffViewerDrawerProps {
  open: boolean
  splitView: boolean
  syntaxLanguage: string
  isFullscreen: boolean
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

export function DiffViewerDrawer(props: DiffViewerDrawerProps) {
  const {
    open,
    splitView,
    syntaxLanguage,
    isFullscreen,
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
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="mb-4 h-full">
        <div className="mb-2 flex items-center justify-between pr-6 pl-2">
          <DrawerHeader className="items-start">
            <DrawerTitle>Difference</DrawerTitle>
            <DrawerDescription>
              {splitView ? "Side-by-Side View" : "Unified View"}
            </DrawerDescription>
          </DrawerHeader>
          <DiffViewerToolbar
            splitView={splitView}
            setSplitView={setSplitView}
            syntaxLanguage={syntaxLanguage}
            setSyntaxLanguage={setSyntaxLanguage}
            isFullscreen={isFullscreen}
            handleFullscreen={onOpenChange}
            languages={languages}
          />
        </div>
        <div className="mx-6 overflow-y-auto rounded-lg px-0 break-all">
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
          />
        </div>
      </DrawerContent>
    </Drawer>
  )
}
