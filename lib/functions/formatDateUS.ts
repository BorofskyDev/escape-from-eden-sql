export default function formatDateUS(isoString?: string | null): string {
  if (!isoString) return ''
  const date = new Date(isoString)
  const mm = String(date.getMonth() + 1).padStart(2, '0')
  const dd = String(date.getDate()).padStart(2, '0')
  const yyyy = date.getFullYear()
  return `${mm}-${dd}-${yyyy}`
}