import { useState, useEffect } from 'react'
import Modal from '@/components/modals/Modal'
import { format } from 'date-fns'

interface Message {
  id: string
  name: string
  email: string
  content: string
  createdAt: string
  read: boolean
}

interface MessageItemProps {
  message: Message
}

export default function MessageItem({ message }: MessageItemProps) {
  const [open, setOpen] = useState(false)
  const [localMessage, setLocalMessage] = useState(message)

  useEffect(() => {
    // If the message is unread, update it to read when the modal opens
    if (open && !localMessage.read) {
      async function markAsRead() {
        try {
          const res = await fetch(`/api/messages/${localMessage.id}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ read: true }),
          })
          if (res.ok) {
            const updated = await res.json()
            setLocalMessage(updated)
          }
        } catch (error) {
          console.error('Failed to mark as read', error)
        }
      }
      markAsRead()
    }
  }, [open, localMessage.read, localMessage.id])

  async function handleDelete() {
    try {
      const res = await fetch(`/api/messages/${localMessage.id}`, {
        method: 'DELETE',
      })
      if (res.ok) {
        // Optionally, you can remove the message from a list
        alert('Message deleted successfully')
        setOpen(false)
      }
    } catch (error) {
      console.error('Failed to delete message', error)
    }
  }

  return (
    <>
      <div
        onClick={() => setOpen(true)}
        className=' p-4 border-b cursor-pointer hover:bg-bg2 flex justify-between items-center'
      >
        <div>
          <h4 className='text-lg font-bold'>{localMessage.name}</h4>
          <p className='text-sm text-text2'>
            {format(new Date(localMessage.createdAt), 'PPpp')}
          </p>
        </div>
        <div>
          {localMessage.read ? (
            <span className='text-primary text-sm'>Read</span>
          ) : (
            <span className='text-secondary text-sm'>Unread</span>
          )}
        </div>
      </div>

      <Modal open={open} onClose={() => setOpen(false)}>
        <div className='space-y-4'>
          <h3 className='text-xl font-semibold'>Message Details</h3>
          <p>
            <strong>From:</strong> {localMessage.name} ({localMessage.email})
          </p>
          <p>
            <strong>Sent:</strong>{' '}
            {format(new Date(localMessage.createdAt), 'PPpp')}
          </p>
          <p>
            <strong>Status:</strong> {localMessage.read ? 'Read' : 'Unread'}
          </p>
          <div>
            <strong>Content:</strong>
            <p className='mt-2'>{localMessage.content}</p>
          </div>
          <button
            onClick={handleDelete}
            className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600'
          >
            Delete Message
          </button>
        </div>
      </Modal>
    </>
  )
}
