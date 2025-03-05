// components/ui/cards/TipCard.tsx
'use client'
import { useState } from 'react'
import FormField from '../inputs/FormField'

export default function TipCard() {
  const [amount, setAmount] = useState('')
  const [loading, setLoading] = useState(false)

  const handleTip = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/tip', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount }),
      })
      const data = await res.json()
      if (!res.ok) {
        alert(data.error || 'Something went wrong')
        return
      }
      // Redirect to the Stripe Checkout page
      window.location.href = data.url
    } catch (error) {
      console.error('Error:', error)
      alert('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='max-w-4xl mx-auto my-8 p-4 bg-bg2 rounded-md flex flex-col items-center'>
      <h2 className='text-2xl font-header mb-4 text-text1 capitalize'>
        Help me stay independent
      </h2>
      <p className='mb-4 px-8 text-sm italic text-text2'>
        You&apos;ll notice there are no ads, no sign up, just the site. I own
        the database and site code, so this is 100% independent. But doing that
        costs money. If you like what you&apos;ve read here and want to help,
        feel free to contribute whatever you can. Any amount will be
        appreciated. Thank you.
      </p>
      <label htmlFor='donation-amount' className='mb-2 text-sm text-text2'>
        Enter an amount (USD):
      </label>
      <FormField
        type='number'
        placeholder='0.00'
        label='Amount'
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button
        onClick={handleTip}
        className='bg-primary text-bg1 my-4 py-2 px-6 rounded hover:bg-secondary transition-colors duration-200 hover:shadow-lg'
        disabled={loading}
      >
        {loading ? 'Processing...' : 'Tip'}
      </button>
    </div>
  )
}
