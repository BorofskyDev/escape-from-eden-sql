'use client'
import { useSearchParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import {
  GeneralInput,
  ActionButton,
  Heading,
  BodyText,
} from '@/components/ui/common'

export default function ResetPasswordPage() {
  const router = useRouter()
  const params = useSearchParams()
  const token = params.get('token') ?? ''
  const [password, setPassword] = useState('')
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const res = await fetch('/api/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify({ token, password }),
      headers: { 'Content-Type': 'application/json' },
    })
    if (res.ok) setDone(true)
    else setError('Link invalid or expired')
  }

  if (done) {
    return (
      <div className='p-8 space-y-4'>
        <Heading as='h1' size='page'>
          Password updated
        </Heading>
        <BodyText>You can now log in with your new password.</BodyText>
        <ActionButton onClick={() => router.push('/login')}>
          Go to login
        </ActionButton>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className='p-8 space-y-4 max-w-md mx-auto'>
      <Heading as='h1' size='page'>
        Set a new password
      </Heading>
      {error && <p className='text-red-500'>{error}</p>}
      <GeneralInput
        label='New password'
        type='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <ActionButton type='submit'>Update password</ActionButton>
    </form>
  )
}
