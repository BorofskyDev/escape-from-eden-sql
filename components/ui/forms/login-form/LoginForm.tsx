'use client'

import { FormEvent, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { Page } from '@/components/layouts'
import {
  ActionButton,
  BodyText,
  GeneralInput,
  Heading,
  TextLink,
} from '@/components/ui/common'
import styles from './LoginForm.module.scss'

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
    <Page>
      <form onSubmit={handleSubmit} className={styles.loginForm}>
        <Heading as='h1' size='page'>
          Login
        </Heading>
        <BodyText>Unless you&apos;re me, you shouldn&apos;t be here.</BodyText>
        {error && <p className='text-red-500'>{error}</p>}

        <div>
          <GeneralInput
            label='Email'
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <GeneralInput
            label='Password'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <ActionButton type='submit' className={styles.submitButton}>
          Login
        </ActionButton>
        <div className={styles.loginForm__forgotPassword}>
          <TextLink href='/forgot-password'>Forgot Password?</TextLink>
        </div>
      </form>
    </Page>
  )
}
