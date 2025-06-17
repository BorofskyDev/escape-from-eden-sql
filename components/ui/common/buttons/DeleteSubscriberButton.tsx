// app/admin/subscribers/DeleteSubscriberButton.tsx
'use client'
import { useState } from 'react'

type DeleteSubscriberButtonProps = {
  email: string
}

export default function DeleteSubscriberButton({
  email,
}: DeleteSubscriberButtonProps) {
  const [loading, setLoading] = useState(false)

  async function handleDelete() {
    if (!confirm(`Are you sure you want to unsubscribe ${email}?`)) return

    setLoading(true)
    try {
      const response = await fetch(
        `/api/subscriber?email=${encodeURIComponent(email)}`,
        {
          method: 'DELETE',
        }
      )

      if (!response.ok) {
        // Optionally, handle error responses here
        alert('Failed to unsubscribe')
        return
      }

      // Refresh the page or update local state if needed
      location.reload()
    } catch (error) {
      console.error('Error deleting subscriber:', error)
      alert('An error occurred.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <button onClick={handleDelete} disabled={loading}>
      {loading ? 'Processing...' : 'Unsubscribe'}
    </button>
  )
}
