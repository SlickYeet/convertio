"use client"

import { Copy, Diff, Maximize2, Minimize2, Trash2 } from "lucide-react"
import Prism from "prismjs"
import { useCallback, useEffect, useRef, useState } from "react"
import { DiffMethod } from "react-diff-viewer"

import { Hint } from "@/components/hint"
import { DiffViewer } from "@/components/tools/text-diff-viewer/diff-viewer"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { CONFIG } from "@/constants/conversion"
import { useIsMobile } from "@/hooks/use-mobile"
import { useIsMounted } from "@/hooks/use-mounted"
import { cn } from "@/lib/utils"
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
  const containerRef = useRef<HTMLDivElement>(null)

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
  const [isFullscreen, setIsFullscreen] = useState(false)

  useEffect(() => {
    setSplitView(isMobile ? false : true)
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

      let languageDef = Prism.languages[syntaxLanguage]
      if (!languageDef) {
        languageDef = Prism.languages.plain || Prism.languages.javascript
      }

      const highlightedHtml = Prism.highlight(str, languageDef, syntaxLanguage)
      return <span dangerouslySetInnerHTML={{ __html: highlightedHtml }} />
    },
    [syntaxLanguage],
  )

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

  if (!isMounted) {
    return null
  }

  return (
    <>
      <Card className="rounded-b-none border-b-0">
        <div className="flex items-center justify-between pr-6">
          <CardHeader className="flex-1">
            <CardTitle className="flex items-center gap-2 capitalize">
              <Diff className="size-5" />
              {config.label}
            </CardTitle>
            <CardDescription>{config.description}</CardDescription>
          </CardHeader>

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
                className="hover:text-destructive text-muted-foreground"
              >
                <Trash2 />
                <span className="sr-only">Clear Text</span>
              </Button>
            </Hint>
          )}
        </div>
        <CardContent className="flex flex-col gap-6 md:flex-row">
          <div className="flex-1">
            <Label className="mb-2">Old Text</Label>
            <div className="group relative">
              <Textarea
                value={oldText}
                onChange={(e) => setOldText(e.target.value)}
                placeholder="Enter old text here..."
                rows={15}
                className="resize-none font-mono"
              />
              <CopyButton text={oldText} label="Copy Old Text" />
            </div>
          </div>

          <div className="flex-1">
            <Label className="mb-2">New Text</Label>
            <div className="group relative">
              <Textarea
                value={newText}
                onChange={(e) => setNewText(e.target.value)}
                placeholder="Enter new text here..."
                rows={15}
                className="resize-none font-mono"
              />
              <CopyButton text={newText} label="Copy New Text" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card ref={containerRef} className="@container rounded-t-none border-t-0">
        <div className="flex flex-col justify-between gap-y-4 pr-6 @sm:flex-row @sm:items-center">
          <CardHeader className="flex-1">
            <CardTitle>Difference</CardTitle>
            <CardDescription>
              {splitView ? "Side-by-Side View" : "Unified View"}
            </CardDescription>
          </CardHeader>
          <div className="space-y-3 pl-6 @sm:px-0">
            <div className="flex items-center gap-2">
              <Switch
                id="side-by-side"
                checked={splitView}
                onCheckedChange={setSplitView}
              />
              <Label htmlFor="side-by-side">Side-by-Side View</Label>
            </div>

            <div className="flex items-center gap-2">
              <Select
                defaultValue={syntaxLanguage}
                onValueChange={setSyntaxLanguage}
              >
                <SelectTrigger className="min-w-[150px] flex-1 @sm:flex-none">
                  <SelectValue placeholder="Select Language" />
                </SelectTrigger>
                <SelectContent>
                  {LANGUAGES.map((lang) => (
                    <SelectItem
                      key={lang.value}
                      value={lang.value}
                      className="capitalize"
                    >
                      {lang.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Hint
                label={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                side="top"
                asChild
              >
                <Button
                  onClick={handleFullscreen}
                  size="icon"
                  variant="outline"
                >
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
              </Hint>
            </div>
          </div>
        </div>
        <CardContent
          className={cn(
            "overflow-y-auto break-all",
            oldText || newText ? "h-full max-h-[calc(100dvh-10rem)]" : "hidden",
          )}
        >
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
        </CardContent>
      </Card>
    </>
  )
}

function CopyButton({ text, label }: { text: string; label: string }) {
  return (
    <Hint label={label} side="left" asChild>
      <Button
        onClick={() => navigator.clipboard.writeText(text)}
        size="icon"
        variant="ghost"
        className="text-muted-foreground hover:text-primary absolute top-2 right-2 opacity-0 transition-opacity group-hover:opacity-100 focus:text-emerald-500"
      >
        <Copy />
        <span className="sr-only">{label}</span>
      </Button>
    </Hint>
  )
}
