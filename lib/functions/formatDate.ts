// lib/functions/formatDate.ts
export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString() // Customize with options if needed
}
