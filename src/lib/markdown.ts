export function renderMarkdown(text: string): string {
  return text
    .replace(
      /^# (.*$)/gim,
      '<h1 class="text-3xl font-bold mb-4 pb-2 border-b">$1</h1>',
    )
    .replace(
      /^## (.*$)/gim,
      '<h2 class="text-2xl font-semibold mb-3 pb-1 border-b">$1</h2>',
    )
    .replace(/^### (.*$)/gim, '<h3 class="text-xl font-medium mb-2">$1</h3>')
    .replace(/\*\*(.*?)\*\*/gim, '<strong class="font-semibold">$1</strong>')
    .replace(/\*(.*?)\*/gim, '<em class="italic">$1</em>')
    .replace(
      /`([^`]+)`/gim,
      '<code class="bg-muted px-1 py-0.5 rounded text-sm font-mono">$1</code>',
    )
    .replace(/^- (.*$)/gim, '<li class="ml-4 mb-1">• $1</li>')
    .replace(
      /^> (.*$)/gim,
      '<blockquote class="border-l-4 border-blue-400 pl-4 italic my-4 text-slate-600">$1</blockquote>',
    )
    .replace(/^---$/gim, '<hr class="my-6 border-t-2 border-slate-200">')
    .replace(/\n/gim, "<br>")
}
