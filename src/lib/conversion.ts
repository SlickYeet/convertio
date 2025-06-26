import type { InputType } from "@/types"

export async function convert({
  apiEndpoint,
  input,
  inputType,
}: {
  apiEndpoint: string
  input: string
  inputType: InputType
}): Promise<Blob> {
  const response = await fetch(apiEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ input, inputType }),
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.error || "Conversion failed")
  }

  return response.blob()
}
