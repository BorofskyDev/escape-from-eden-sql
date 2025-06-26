'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  GeneralInput,
  ActionButton,
  Heading,
  BodyText,
} from '@/components/ui/common'
import { Page } from '@/components/layouts'
import styles from './ForgotPassword.module.scss'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    await fetch('/api/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
      headers: { 'Content-Type': 'application/json' },
    })
    setSent(true)
  }

  if (sent) {
    return (
      <Page className={styles.forgotPasswordSent}>
        <Heading as='h1' size='page'>
          Check your inbox
        </Heading>
        <BodyText>
          If that address exists we just emailed a link that&apos;s valid for
          one hour.
        </BodyText>
        <ActionButton onClick={() => router.push('/login')}>
          Back to login
        </ActionButton>
      </Page>
    )
  }

  return (
    <Page>
      <form onSubmit={handleSubmit} className={styles.forgotPasswordForm}>
        <Heading as='h1' size='page'>
          Forgot your password?
        </Heading>
        <GeneralInput
          label='Email'
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <ActionButton type='submit'>Send reset link</ActionButton>
      </form>
    </Page>
  )
}
