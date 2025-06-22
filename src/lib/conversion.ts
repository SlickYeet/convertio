export async function convert(
  input: string,
  inputType: string,
  outputType: string,
): Promise<Blob> {
  const response = await fetch("/api/convert", {
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
