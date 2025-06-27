import { Maximize2, Minimize2 } from "lucide-react"
import React from "react"

import { Hint } from "@/components/hint"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

interface DiffViewerToolbarProps {
  isDisabled?: boolean
  splitView: boolean
  syntaxLanguage: string
  isPreviewOpen: boolean
  languages: { value: string; label: string }[]
  setSplitView: (v: boolean) => void
  setSyntaxLanguage: (v: string) => void
  handlePreview: () => void
}

export function DiffViewerToolbar(props: DiffViewerToolbarProps) {
  const {
    isDisabled,
    splitView,
    syntaxLanguage,
    isPreviewOpen,
    languages,
    setSplitView,
    setSyntaxLanguage,
    handlePreview,
  } = props

  return (
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
        <Select defaultValue={syntaxLanguage} onValueChange={setSyntaxLanguage}>
          <SelectTrigger className="min-w-[150px] flex-1 @sm:flex-none">
            <SelectValue placeholder="Select Language" />
          </SelectTrigger>
          <SelectContent>
            {languages.map((lang) => (
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
          label={isPreviewOpen ? "Exit Preview" : "Preview"}
          side="top"
          asChild
        >
          <Button
            disabled={isDisabled}
            onClick={handlePreview}
            size="icon"
            variant="outline"
          >
            {isPreviewOpen ? (
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
  )
}
