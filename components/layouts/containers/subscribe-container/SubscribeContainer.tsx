'use client' // It's a client component because it handles form state & fetch

import { useState, FormEvent } from 'react'
import styles from './SubscribeContainer.module.scss'
import { BodyText, Heading } from '@/components/ui/common'

export function SubscribeContainer() {
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
    <div className={styles.subscribeContainer}>
      <Heading as='h3' size='container'>Subscribe</Heading>
      <BodyText>
        I&apos;ll only email you when a new post is created. I also do not sell your data.
      </BodyText>

      <form onSubmit={handleSubscribe} className={styles.subscribeContainer__form}>
        <input
          type='email'
          className={styles.generalInput}
          placeholder='Enter your email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={loading}
        />

        <button
          type='submit'
          className={`${styles.actionButton} ${
            loading ? styles.actionButton__disabled : ''
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
