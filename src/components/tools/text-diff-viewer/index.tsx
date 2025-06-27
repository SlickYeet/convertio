"use client"

import { Diff, Trash2 } from "lucide-react"
import Prism from "prismjs"
import { useCallback, useEffect, useState } from "react"

import { Hint } from "@/components/hint"
import { DiffViewerHeader } from "@/components/tools/text-diff-viewer/card-header"
import { CopyButton } from "@/components/tools/text-diff-viewer/copy-button"
import { DiffViewerDialog } from "@/components/tools/text-diff-viewer/dialog"
import { DiffViewerDrawer } from "@/components/tools/text-diff-viewer/drawer"
import { DiffViewerToolbar } from "@/components/tools/text-diff-viewer/toolbar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { CONFIG } from "@/constants/conversion"
import { useIsMobile } from "@/hooks/use-mobile"
import { useIsMounted } from "@/hooks/use-mounted"
import type { CurrentType } from "@/types"

const LANGUAGES = [
  { value: "plain", label: "Plain Text" },
  { value: "markdown", label: "Markdown" },
  { value: "javascript", label: "JavaScript" },
  { value: "typescript", label: "TypeScript" },
  { value: "json", label: "JSON" },
  { value: "css", label: "CSS" },
  { value: "markup", label: "HTML/XML" },
  { value: "bash", label: "Bash/Shell" },
  { value: "python", label: "Python" },
  { value: "ruby", label: "Ruby" },
  { value: "go", label: "Go" },
  { value: "java", label: "Java" },
  { value: "sql", label: "SQL" },
  { value: "rust", label: "Rust" },
  { value: "kotlin", label: "Kotlin" },
  { value: "swift", label: "Swift" },
  { value: "scala", label: "Scala" },
  { value: "perl", label: "Perl" },
  { value: "lua", label: "Lua" },
  { value: "haskell", label: "Haskell" },
  { value: "elixir", label: "Elixir" },
  { value: "dart", label: "Dart" },
  { value: "matlab", label: "MATLAB" },
  { value: "yaml", label: "YAML" },
  { value: "toml", label: "TOML" },
  { value: "ini", label: "INI" },
  { value: "properties", label: "Properties" },
  { value: "textile", label: "Textile" },
  { value: "asciidoc", label: "AsciiDoc" },
  { value: "csv", label: "CSV" },
]

interface TextDiffViewerProps {
  currentType: CurrentType
  oldText?: string
  newText?: string
}

export function TextDiffViewer(props: TextDiffViewerProps) {
  const isMounted = useIsMounted()
  const isMobile = useIsMobile()

  const {
    currentType,
    oldText: oldTextFromProps,
    newText: newTextFromProps,
  } = props

  const config = CONFIG.tools[currentType as keyof typeof CONFIG.tools]

  const [oldText, setOldText] = useState<string>(oldTextFromProps || "")
  const [newText, setNewText] = useState<string>(newTextFromProps || "")
  const [splitView, setSplitView] = useState<boolean>(true)
  const [highlightLines, setHighlightLines] = useState<string[]>([])
  const [syntaxLanguage, setSyntaxLanguage] = useState<string>("javascript")
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false)

  const isPreviewOpen = isMobile ? isDrawerOpen : isDialogOpen
  const isDisabled = !oldText || !newText

  useEffect(() => {
    setSplitView(isMobile ? false : true)
  }, [isMobile])

  useEffect(() => {
    if (!oldText || !newText) return

    if (isMobile) {
      if (isDialogOpen) {
        setIsDialogOpen(false)
        setIsDrawerOpen(true)
      }
    } else {
      if (isDrawerOpen) {
        setIsDrawerOpen(false)
        setIsDialogOpen(true)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile])

  const onLineNumberClick = useCallback(
    (id: string, e: React.MouseEvent<HTMLTableCellElement>): void => {
      let newHighlightLines = [id]
      if (e.shiftKey && highlightLines.length === 1) {
        const [dir, oldIdStr] = highlightLines[0].split("-")
        const [newDir, newIdStr] = id.split("-")

        const oldId = Number(oldIdStr)
        const newId = Number(newIdStr)

        if (dir === newDir && !isNaN(oldId) && !isNaN(newId)) {
          newHighlightLines = []
          const lowEnd = Math.min(oldId, newId)
          const highEnd = Math.max(oldId, newId)
          for (let i = lowEnd; i <= highEnd; i++) {
            newHighlightLines.push(`${dir}-${i}`)
          }
        }
      }
      setHighlightLines(newHighlightLines)
    },
    [highlightLines],
  )

  const renderSyntaxHighlightedContent = useCallback(
    (str: string): React.JSX.Element => {
      if (!str) return <></>

      let languageDef =
        window.Prism?.languages[syntaxLanguage] ||
        Prism.languages[syntaxLanguage]
      if (!languageDef) {
        languageDef = Prism.languages.plain || Prism.languages.javascript
      }
      const highlightedHtml = Prism.highlight(str, languageDef, syntaxLanguage)
      return <span dangerouslySetInnerHTML={{ __html: highlightedHtml }} />
    },
    [syntaxLanguage],
  )

  function handlePreview() {
    if (!oldText || !newText) return

    if (isMobile) {
      setIsDrawerOpen((prev) => !prev)
      setIsDialogOpen(false)
    } else {
      setIsDialogOpen((prev) => !prev)
      setIsDrawerOpen(false)
    }
  }

  if (!isMounted) return null

  return (
    <>
      <Card className="rounded-b-none border-b-0">
        <div className="flex items-center justify-between pr-6">
          <DiffViewerHeader
            title={
              <span className="flex items-center gap-2 capitalize">
                <Diff className="size-5" />
                {config.label}
              </span>
            }
            description={config.description}
          />
          {(oldText || newText) && (
            <Hint label="Clear Text" side="left" asChild>
              <Button
                onClick={() => {
                  setOldText("")
                  setNewText("")
                  setHighlightLines([])
                }}
                size="icon"
                variant="ghost"
                className="text-muted-foreground hover:text-destructive"
                aria-label="Clear Text"
              >
                <Trash2 className="size-4" />
              </Button>
            </Hint>
          )}
        </div>
        <CardContent className="mt-2 flex flex-col gap-6 md:flex-row">
          <div className="group relative flex-1">
            <Badge
              variant="secondary"
              className="border-input absolute top-0 right-3 -translate-y-1/2"
            >
              Old Text
            </Badge>
            <Textarea
              value={oldText}
              onChange={(e) => setOldText(e.target.value)}
              placeholder="Enter old text here..."
              rows={15}
              className="resize-none font-mono"
            />
            <CopyButton text={oldText} label="Copy Old Text" />
          </div>
          <div className="group relative flex-1">
            <Badge
              variant="secondary"
              className="border-input absolute top-0 right-3 -translate-y-1/2"
            >
              New Text
            </Badge>
            <Textarea
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
              placeholder="Enter new text here..."
              rows={15}
              className="resize-none font-mono"
            />
            <CopyButton text={newText} label="Copy New Text" />
          </div>
        </CardContent>
      </Card>
      <Card className="@container rounded-t-none border-t-0">
        <div className="flex flex-col justify-between gap-y-4 pr-6 @sm:flex-row @sm:items-center">
          <DiffViewerHeader
            title="Difference"
            description={splitView ? "Side-by-Side View" : "Unified View"}
          />
          <DiffViewerToolbar
            isDisabled={isDisabled}
            splitView={splitView}
            setSplitView={setSplitView}
            syntaxLanguage={syntaxLanguage}
            setSyntaxLanguage={setSyntaxLanguage}
            isPreviewOpen={isPreviewOpen}
            handlePreview={handlePreview}
            languages={LANGUAGES}
          />
        </div>
        {isMobile ? (
          <DiffViewerDrawer
            open={isDrawerOpen}
            onOpenChange={handlePreview}
            splitView={splitView}
            setSplitView={setSplitView}
            syntaxLanguage={syntaxLanguage}
            setSyntaxLanguage={setSyntaxLanguage}
            isPreviewOpen={isPreviewOpen}
            oldText={oldText}
            newText={newText}
            highlightLines={highlightLines}
            onLineNumberClick={onLineNumberClick}
            renderSyntaxHighlightedContent={renderSyntaxHighlightedContent}
            languages={LANGUAGES}
          />
        ) : (
          <DiffViewerDialog
            open={isDialogOpen}
            onOpenChange={handlePreview}
            splitView={splitView}
            setSplitView={setSplitView}
            syntaxLanguage={syntaxLanguage}
            setSyntaxLanguage={setSyntaxLanguage}
            isPreviewOpen={isPreviewOpen}
            oldText={oldText}
            newText={newText}
            highlightLines={highlightLines}
            onLineNumberClick={onLineNumberClick}
            renderSyntaxHighlightedContent={renderSyntaxHighlightedContent}
            languages={LANGUAGES}
          />
        )}
      </Card>
    </>
  )
}
