// components/ui/cards/TipCard.tsx
'use client'
import { useState } from 'react'

export default function TipCard() {
  const [amount, setAmount] = useState('')

  // Placeholder handler - you'll replace this with an API call later
  const handleTip = () => {
    console.log(`User wants to tip: $${amount}`)
    // In the future, send 'amount' to an API route that creates a PaymentIntent or handles payment
  }

  return (
    <div className='my-8 p-4 bg-bg2 rounded-md flex flex-col items-center'>
      <h2 className='text-2xl font-header mb-4 text-text1'>
        Support This Article
      </h2>
      <label htmlFor='donation-amount' className='mb-2 text-sm text-text2'>
        Enter an amount (USD):
      </label>
      <input
        id='donation-amount'
        type='number'
        min='1'
        step='any'
        placeholder='0.00'
        className='border border-primary rounded p-2 mb-4 w-1/2 text-center focus:outline-none focus:border-primary'
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button
        onClick={handleTip}
        className='bg-primary text-bg1 py-2 px-6 rounded hover:bg-secondary transition-colors duration-200 hover:shadow-lg'
      >
        Tip
      </button>
    </div>
  )
}
