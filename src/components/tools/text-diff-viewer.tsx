"use client"

import { Copy, Diff, Maximize2, Minimize2, Trash2 } from "lucide-react"
import Prism from "prismjs"
import { useCallback, useEffect, useRef, useState } from "react"
import DiffViewer, { DiffMethod } from "react-diff-viewer"

import "prismjs/components/prism-clike"
import "prismjs/components/prism-markup"
import "prismjs/components/prism-markdown"
import "prismjs/components/prism-javascript"
import "prismjs/components/prism-typescript"
import "prismjs/components/prism-json"
import "prismjs/components/prism-css"
import "prismjs/components/prism-bash"
import "prismjs/components/prism-python"
import "prismjs/components/prism-ruby"
import "prismjs/components/prism-go"
import "prismjs/components/prism-java"
import "prismjs/components/prism-sql"
import "prismjs/components/prism-rust"
import "prismjs/components/prism-kotlin"
import "prismjs/components/prism-swift"
import "prismjs/components/prism-scala"
import "prismjs/components/prism-perl"
import "prismjs/components/prism-lua"
import "prismjs/components/prism-haskell"
import "prismjs/components/prism-elixir"
import "prismjs/components/prism-dart"
import "prismjs/components/prism-matlab"
import "prismjs/components/prism-yaml"
import "prismjs/components/prism-toml"
import "prismjs/components/prism-ini"
import "prismjs/components/prism-properties"
import "prismjs/components/prism-textile"
import "prismjs/components/prism-asciidoc"
import "prismjs/components/prism-csv"

import { Hint } from "@/components/hint"
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
import { cn } from "@/lib/utils"
import type { CurrentType } from "@/types"

interface TextDiffViewerProps {
  currentType: CurrentType
  oldText?: string
  newText?: string
}

export function TextDiffViewer(props: TextDiffViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  const {
    currentType,
    oldText: oldTextFromProps,
    newText: newTextFromProps,
  } = props

  const config = CONFIG.tools[currentType as keyof typeof CONFIG.tools]

  const [mounted, setMounted] = useState<boolean>(false)
  const [oldText, setOldText] = useState<string>(oldTextFromProps || "")
  const [newText, setNewText] = useState<string>(newTextFromProps || "")
  const [splitView, setSplitView] = useState<boolean>(true)
  const [highlightLines, setHighlightLines] = useState<string[]>([])
  const [syntaxLanguage, setSyntaxLanguage] = useState<string>("javascript")
  const [isFullscreen, setIsFullscreen] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

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

  if (!mounted) {
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
        <CardContent className="flex gap-6">
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

      <Card ref={containerRef} className="rounded-t-none border-t-0">
        <div className="flex items-center justify-between pr-6">
          <CardHeader className="flex-1">
            <CardTitle>Difference</CardTitle>
            <CardDescription>
              {splitView ? "Side-by-Side View" : "Unified View"}
            </CardDescription>
          </CardHeader>
          <div className="space-y-3">
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
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Select Language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="plain">Plain Text</SelectItem>
                  <SelectItem value="markdown">Markdown</SelectItem>
                  <SelectItem value="javascript">JavaScript</SelectItem>
                  <SelectItem value="typescript">TypeScript</SelectItem>
                  <SelectItem value="json">JSON</SelectItem>
                  <SelectItem value="css">CSS</SelectItem>
                  <SelectItem value="markup">HTML/XML</SelectItem>
                  <SelectItem value="bash">Bash/Shell</SelectItem>
                  <SelectItem value="python">Python</SelectItem>
                  <SelectItem value="ruby">Ruby</SelectItem>
                  <SelectItem value="go">Go</SelectItem>
                  <SelectItem value="java">Java</SelectItem>
                  <SelectItem value="sql">SQL</SelectItem>
                  <SelectItem value="rust">Rust</SelectItem>
                  <SelectItem value="kotlin">Kotlin</SelectItem>
                  <SelectItem value="swift">Swift</SelectItem>
                  <SelectItem value="scala">Scala</SelectItem>
                  <SelectItem value="perl">Perl</SelectItem>
                  <SelectItem value="lua">Lua</SelectItem>
                  <SelectItem value="haskell">Haskell</SelectItem>
                  <SelectItem value="elixir">Elixir</SelectItem>
                  <SelectItem value="dart">Dart</SelectItem>
                  <SelectItem value="matlab">MATLAB</SelectItem>
                  <SelectItem value="yaml">YAML</SelectItem>
                  <SelectItem value="toml">TOML</SelectItem>
                  <SelectItem value="ini">INI</SelectItem>
                  <SelectItem value="properties">Properties</SelectItem>
                  <SelectItem value="textile">Textile</SelectItem>
                  <SelectItem value="asciidoc">AsciiDoc</SelectItem>
                  <SelectItem value="csv">CSV</SelectItem>
                </SelectContent>
              </Select>

              <Hint
                label={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                side="left"
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
            "overflow-y-auto",
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
