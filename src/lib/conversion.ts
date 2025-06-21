export async function convertMarkdownToPDF(markdown: string): Promise<Blob> {
  const response = await fetch("/api/convert/pdf", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ markdown }),
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.error || "Conversion failed")
  }

  return response.blob()
}
