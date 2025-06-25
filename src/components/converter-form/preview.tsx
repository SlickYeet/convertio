import { ScrollArea } from "@/components/ui/scroll-area"
import { sanitizeHtml } from "@/lib/full-html"
import { renderMarkdown } from "@/lib/markdown"
import type { CurrentType } from "@/types"

export function Preview({
  input,
  currentType,
}: {
  input: string
  currentType: CurrentType
}) {
  const sanitizedHtml = sanitizeHtml(input)

  return (
    <ScrollArea className="rounded-lg border md:h-[calc(100vh-28rem)]">
      <div className="p-4">
        {input.trim() ? (
          <div
            className="prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{
              __html:
                currentType === "md-to-pdf"
                  ? renderMarkdown(sanitizedHtml)
                  : sanitizedHtml,
            }}
          />
        ) : (
          <p className="text-muted-foreground py-20 text-center">
            Your preview will appear here
          </p>
        )}
      </div>
    </ScrollArea>
  )
}
