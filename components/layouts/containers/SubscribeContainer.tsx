'use client' // It's a client component because it handles form state & fetch

import { useState, FormEvent } from 'react'

export default function SubscribeContainer() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  async function handleSubscribe(e: FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    setMessage('')

    try {
      const res = await fetch('/api/subscriber', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      if (!res.ok) {
        // Attempt to parse error message
        const data = await res.json()
        throw new Error(data.error || 'Failed to subscribe')
      }

      setMessage('Subscribed successfully! Check your inbox soon.')
      setEmail('') // reset field
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='max-w-md mx-auto my-8 bg-bg2 shadow-md rounded p-6'>
      <h2 className='text-xl font-bold mb-4'>Subscribe </h2>
      <p className='text-text2 mb-4'>
        I&apos;ll only email you when a new post is created. I also do not sell your data.
      </p>

      <form onSubmit={handleSubscribe} className='flex flex-col space-y-4'>
        <input
          type='email'
          className='border border-primary rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400'
          placeholder='Enter your email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={loading}
        />

        <button
          type='submit'
          className={`bg-primary text-bg1 py-2 px-4 rounded hover:bg-secondary transition-colors ${
            loading ? 'opacity-75 cursor-not-allowed' : ''
          }`}
          disabled={loading}
        >
          {loading ? 'Subscribing...' : 'Subscribe'}
        </button>
      </form>

      {error && <p className='text-red-500 mt-4'>{error}</p>}
      {message && <p className='text-green-600 mt-4'>{message}</p>}
    </div>
  )
}
