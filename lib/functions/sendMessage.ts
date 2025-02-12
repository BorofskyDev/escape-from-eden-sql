// lib/functions/sendMessage.ts
export interface ContactMessagePayload {
  name: string
  email: string
  content: string
captchaToken: string
}

export async function sendMessage(payload: ContactMessagePayload) {
  const res = await fetch('/api/messages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  if (!res.ok) {
    const errorData = await res.json()
    throw new Error(errorData.error || 'Failed to send message')
  }

  return res.json()
}
