// components/ui/cards/TipCard.tsx
'use client'
import { useState } from 'react'
import FormField from '../inputs/FormField'

export default function TipCard() {
  const [amount, setAmount] = useState('')

  // Placeholder handler - you'll replace this with an API call later
  const handleTip = () => {
    console.log(`User wants to tip: $${amount}`)
    // In the future, send 'amount' to an API route that creates a PaymentIntent or handles payment
  }

  return (
    <div className='max-w-4xl mx-auto my-8 p-4 bg-bg2 rounded-md flex flex-col items-center'>
      <h2 className='text-2xl font-header mb-4 text-text1 capitalize'>
        Help me stay independent
      </h2>
      <p className='mb-4 px-8 text-text2'>
        If you like the quality of content, please feel free to contribute
        something. Any little bit is appreciated. The more I earn from this, the
        more that will free me up to do more research and bring higher quality
        articles.
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
      >
        Tip
      </button>
    </div>
  )
}
