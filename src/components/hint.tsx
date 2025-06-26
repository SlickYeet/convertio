import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface HintProps {
  label: string
  children: React.ReactNode
  asChild?: boolean
  side?: "top" | "bottom" | "left" | "right"
  align?: "start" | "center" | "end"
}

export function Hint(props: HintProps) {
  const { label, children, asChild, side, align } = props

  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild={asChild}>{children}</TooltipTrigger>
        <TooltipContent side={side} align={align}>
          <p className="font-semibold">{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
