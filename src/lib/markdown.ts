import MarkdownIt from "markdown-it"

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
})

md.renderer.rules.heading_open = (tokens, idx) => {
  const token = tokens[idx]
  const level = parseInt(token.tag.slice(1), 10)
  const sizeMap = ["4xl", "3xl", "2xl", "xl", "lg", "base"]
  const size = sizeMap[level - 1] || "base"
  const className = `text-${size} font-semibold mb-${level === 1 ? 4 : 3} pb-${level === 1 ? 2 : 1}`
  return `<h${level} class="${className}">`
}
md.renderer.rules.link_open = (tokens, idx) => {
  const token = tokens[idx]
  const href = token.attrGet("href") || "#"
  const title = token.attrGet("title")
    ? ` title="${token.attrGet("title")}"`
    : ""
  return `<a href="${href}"${title} class="text-sky-600 dark:text-sky-400 underline hover:text-sky-600/80 dark:hover:text-sky-400/80 transition-colors" target="_blank" rel="noopener noreferrer">`
}
md.renderer.rules.image = (tokens, idx) => {
  const token = tokens[idx]
  const src = token.attrGet("src") || ""
  const alt = token.content || ""
  return `<img src="${src}" alt="${alt}" class="my-2 max-w-full h-auto rounded" />`
}
md.renderer.rules.fence = (tokens, idx) => {
  const token = tokens[idx]
  const lang = token.info ? token.info.trim() : ""
  const code = token.content.trim()
  return `<div class="@container"><pre class="bg-muted p-4 rounded text-sm font-mono overflow-x-auto"><code class="language-${lang}">${code}</code></pre></div>`
}
md.renderer.rules.code_inline = (tokens, idx) => {
  const token = tokens[idx]
  return `<code class="bg-muted px-1 py-0.5 rounded text-sm font-mono">${token.content}</code>`
}
md.renderer.rules.bullet_list_open = () => '<ul class="list-disc pl-6 my-2">'
md.renderer.rules.ordered_list_open = () =>
  '<ol class="list-decimal pl-6 my-2">'
md.renderer.rules.list_item_open = () => '<li class="mb-1">'
md.renderer.rules.table_open = () =>
  '<table class="table-auto border-collapse my-4">'
md.renderer.rules.th_open = () => '<th class="border px-4 py-2">'
md.renderer.rules.td_open = () => '<td class="border px-4 py-2">'
md.renderer.rules.blockquote_open = () =>
  '<blockquote class="border-l-4 rounded-l border-sky-600 dark:border-sky-400 pl-4 italic my-4 text-muted-foreground">'

export function renderMarkdown(text: string): string {
  return md.render(text)
}
