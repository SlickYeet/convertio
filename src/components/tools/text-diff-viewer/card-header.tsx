import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface DiffViewerHeaderProps {
  title: React.ReactNode
  description: string
}

export function DiffViewerHeader(props: DiffViewerHeaderProps) {
  const { title, description } = props

  return (
    <CardHeader className="flex-1">
      <CardTitle>{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
  )
}
