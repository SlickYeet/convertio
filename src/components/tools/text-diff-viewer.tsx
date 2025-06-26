"use client"

import { Copy, Diff } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import DiffViewer, { DiffMethod } from "react-diff-viewer"

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
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

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
  const [darkMode, setDarkMode] = useState<boolean>(isDark)

  useEffect(() => {
    setDarkMode(isDark)
  }, [isDark])

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <>
      <Card className="rounded-b-none border-b-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 capitalize">
            <Diff className="size-5" />
            {config.label}
          </CardTitle>
          <CardDescription>{config.description}</CardDescription>
        </CardHeader>
        <CardContent className="flex gap-6">
          <div className="flex-1">
            <Label className="mb-2">Old Text</Label>
            <div className="group relative">
              <Textarea
                value={oldText}
                onChange={(e) => setOldText(e.target.value)}
                placeholder="Enter old text here..."
                rows={15}
                className="resize-none"
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
                className="resize-none"
              />
              <CopyButton text={newText} label="Copy New Text" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-t-none border-t-0">
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
                onCheckedChange={() => setSplitView(!splitView)}
              />
              <Label htmlFor="side-by-side">Side-by-Side View</Label>
            </div>
            <div className="flex items-center gap-2">
              <Switch
                id="dark-mode"
                checked={darkMode}
                onCheckedChange={() => setDarkMode(!darkMode)}
              />
              <Label htmlFor="dark-mode">Dark Mode</Label>
            </div>
          </div>
        </div>
        <CardContent
          className={cn(
            "overflow-y-auto",
            oldText.length > 0 || newText.length > 0
              ? "max-h-[calc(100vh-20rem)]"
              : "hidden",
          )}
        >
          <DiffViewer
            oldValue={oldText}
            newValue={newText}
            splitView={splitView}
            hideLineNumbers={false}
            showDiffOnly={false}
            compareMethod={DiffMethod.WORDS}
            useDarkTheme={darkMode}
            // highlightLines={this.state.highlightLine}
            // renderContent={this.syntaxHighlight}
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
