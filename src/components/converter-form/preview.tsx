import { renderMarkdown } from "@/lib/markdown"

export function Preview({ markdown }: { markdown: string }) {
  return (
    <div className="min-h-[400px] overflow-auto rounded-lg border bg-white p-4">
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
  )
}
