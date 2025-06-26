import { env } from "process"

export function DevIndicator() {
  if (env.NODE_ENV !== "development") return null

  return (
    <div className="bg-primary/10 text-primary border-primary/50 pointer-events-none fixed right-0 bottom-0 z-50 border-t border-l px-2.5 py-1 font-mono text-xs font-semibold shadow-sm select-none">
      DEV
    </div>
  )
}
