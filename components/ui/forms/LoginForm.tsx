'use client'

import { FormEvent, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { signIn } from 'next-auth/react'

export default function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/admin'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
      callbackUrl,
    })

    if (result?.error) {
      setError(result.error)
    } else {
      router.push(callbackUrl)
    }
  }

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-50'>
      <form
        onSubmit={handleSubmit}
        className='max-w-md w-full space-y-4 p-6 bg-white shadow-md rounded'
      >
        <h1 className='text-2xl font-bold'>Login</h1>
        {error && <p className='text-red-500'>{error}</p>}

        <div>
          <label className='block text-sm font-medium'>Email</label>
          <input
            type='email'
            className='mt-1 block w-full border border-gray-300 rounded p-2'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label className='block text-sm font-medium'>Password</label>
          <input
            type='password'
            className='mt-1 block w-full border border-gray-300 rounded p-2'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type='submit'
          className='bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700'
        >
          Sign In
        </button>
      </form>
    </div>
  )
}
