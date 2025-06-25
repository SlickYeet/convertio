import type { InputType, OutputType } from "@/types"

export async function convert({
  input,
  inputType,
  outputType,
  apiEndpoint,
}: {
  input: string
  inputType: InputType
  outputType: OutputType
  apiEndpoint: string
}): Promise<Blob> {
  const response = await fetch(apiEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      input,
      inputType,
      outputType,
    }),
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.error || "Conversion failed")
  }

  return response.blob()
}
