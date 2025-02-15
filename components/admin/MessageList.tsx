'use client'

import { useEffect, useState } from 'react'
import MessageItem from './MessageItem'

interface Message {
  id: string
  name: string
  email: string
  content: string
  createdAt: string
  read: boolean
}

export default function MessagesList() {
  const [messages, setMessages] = useState<Message[]>([])

  useEffect(() => {
    async function fetchMessages() {
      try {
        // Replace with your actual API endpoint for fetching messages
        const res = await fetch('/api/messages')
        const data = await res.json()
        setMessages(data)
      } catch (error) {
        console.error('Error fetching messages:', error)
      }
    }
    fetchMessages()
  }, [])

  return (
    <div className='rounded border shadow'>
      {messages.map((message) => (
        <MessageItem key={message.id} message={message} />
      ))}
    </div>
  )
}
