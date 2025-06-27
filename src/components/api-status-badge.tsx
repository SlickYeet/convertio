"use client"

import { Loader2 } from "lucide-react"
import { useEffect, useState } from "react"

import { Badge } from "@/components/ui/badge"
import {
  apiEndpoints,
  checkAllEndpoints,
  type EndpointStatus,
} from "@/lib/api-endpoints"
import { cn } from "@/lib/utils"

export function APIStatusBadge() {
  const [endpoints, setEndpoints] = useState<EndpointStatus[]>([
    ...apiEndpoints,
  ])

  useEffect(() => {
    checkAllEndpoints({ setEndpoints })
  }, [])

  const allChecking = endpoints.some((e) => e.status === "checking")
  const allAvailable = endpoints.every((e) => e.status === "available")
  const someAvailable = endpoints.some((e) => e.status === "available")

  let badgeProps: {
    icon?: React.ReactNode
    text: string
    bgColor?: string
  }
  if (allChecking) {
    badgeProps = {
      icon: <Loader2 className="size-4 animate-spin" />,
      text: "Testing API...",
    }
  } else if (allAvailable) {
    badgeProps = {
      text: "API Online",
      bgColor: "bg-green-500",
    }
  } else if (someAvailable) {
    badgeProps = {
      text: "API Partially Online",
      bgColor: "bg-yellow-500",
    }
  } else if (true) {
    badgeProps = {
      text: "API Offline",
      bgColor: "bg-red-500",
    }
  }

  return (
    <Badge variant="outline" className="flex items-center gap-2">
      {allChecking ? (
        badgeProps.icon
      ) : (
        <div className={cn("size-2 rounded-full", badgeProps.bgColor)} />
      )}
      <span className="text-sm">{badgeProps.text}</span>
    </Badge>
  )
}
