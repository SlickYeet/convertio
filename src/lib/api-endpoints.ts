export interface EndpointStatus {
  endpoint: string
  status: "checking" | "available" | "error"
  error?: string
}

export const apiEndpoints: EndpointStatus[] = [
  { endpoint: "/convert/md-to-pdf", status: "checking" },
  { endpoint: "/convert/html-to-pdf", status: "checking" },
]

export async function checkEndpoint(endpoint: string) {
  try {
    const response = await fetch(`/api${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ input: "# Test", inputType: "md" }),
    })
    if (response.status === 200) {
      return { status: "available" as const }
    } else {
      return { status: "error" as const, error: `HTTP ${response.status}` }
    }
  } catch (error) {
    return {
      status: "error" as const,
      error: error instanceof Error ? error.message : "Unknown error",
    }
  }
}

interface CheckAllEndpointsProps {
  setEndpoints: React.Dispatch<React.SetStateAction<EndpointStatus[]>>
}

export async function checkAllEndpoints(props: CheckAllEndpointsProps) {
  const { setEndpoints } = props

  setEndpoints((prev) => prev.map((ep) => ({ ...ep, status: "checking" })))

  for (const endpoint of apiEndpoints) {
    const result = await checkEndpoint(endpoint.endpoint)
    setEndpoints((prev) =>
      prev.map((ep) =>
        ep.endpoint === endpoint.endpoint
          ? { ...ep, status: result.status, error: result.error }
          : ep,
      ),
    )
  }
}
