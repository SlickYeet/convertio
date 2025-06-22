import { ScrollArea } from "@/components/ui/scroll-area"
import { renderMarkdown } from "@/lib/markdown"

export function Preview({ markdown }: { markdown: string }) {
  return (
    <ScrollArea className="rounded-lg border md:h-[calc(100vh-28rem)]">
      <div className="p-4">
        {markdown.trim() ? (
          <div
            className="prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{
              __html: renderMarkdown(markdown),
            }}
          />
        ) : (
          <p className="text-muted-foreground py-20 text-center">
            Your markdown preview will appear here
          </p>
        )}
      </div>
    </ScrollArea>
  )
}
