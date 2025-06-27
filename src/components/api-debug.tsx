"use client"

import { CheckCircle, Eye, EyeClosed, Loader2, XCircle } from "lucide-react"
import { useEffect, useState } from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { siteConfig } from "@/config"
import {
  apiEndpoints,
  checkAllEndpoints,
  type EndpointStatus,
} from "@/lib/api-endpoints"
import { cn } from "@/lib/utils"

export function ApiDebug() {
  const [isHidden, setIsHidden] = useState<boolean>(true)
  const [endpoints, setEndpoints] = useState<EndpointStatus[]>([
    ...apiEndpoints,
  ])

  useEffect(() => {
    if (!isHidden) {
      checkAllEndpoints({ setEndpoints })
    }
  }, [isHidden])

  if (siteConfig.isDev) {
    return (
      <Card className="mb-6">
        <div className="flex items-start justify-between pr-6">
          <CardHeader className="flex-1">
            <CardTitle>API Endpoint Status</CardTitle>
            <CardDescription>
              Check if the conversion API endpoints are available
            </CardDescription>
          </CardHeader>

          <Button
            onClick={() => setIsHidden(!isHidden)}
            size="icon"
            variant="ghost"
          >
            {isHidden ? (
              <Eye className="size-4" />
            ) : (
              <EyeClosed className="size-4" />
            )}
          </Button>
        </div>
        <CardContent className={cn("space-y-4", isHidden && "hidden")}>
          <Button onClick={() => checkAllEndpoints({ setEndpoints })} size="sm">
            Check Endpoints
          </Button>

          <div className="space-y-2">
            {endpoints.map((ep) => (
              <div
                key={ep.endpoint}
                className="flex min-h-10 items-center justify-between rounded border p-2"
              >
                <span className="font-mono text-sm">{ep.endpoint}</span>
                <div className="flex items-center gap-2">
                  {ep.status === "checking" && (
                    <Loader2 className="text-primary size-4 animate-spin" />
                  )}
                  {ep.status === "available" && (
                    <Badge className="bg-emerald-500">
                      <CheckCircle className="size-3" />
                      Available
                    </Badge>
                  )}
                  {ep.status === "error" && (
                    <Badge variant="destructive">
                      <XCircle className="size-3" />
                      Error: {ep.error}
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return null
}
