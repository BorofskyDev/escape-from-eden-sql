import { useState, useEffect, FormEvent, ChangeEvent } from 'react'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'
import { sendMessage, ContactMessagePayload } from '@/lib/functions/sendMessage'

interface UseContactFormOptions {
  contentLimit?: number
  nameEmailLimit?: number
}

export function useContactForm({
  contentLimit = 500,
  nameEmailLimit = 100,
}: UseContactFormOptions = {}) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [contentCharCount, setContentCharCount] = useState(0)

  const { executeRecaptcha } = useGoogleReCaptcha()

  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        setSuccess(false)
        setError(null)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [success, error])

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) =>
    setName(e.target.value.slice(0, nameEmailLimit))

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value.slice(0, nameEmailLimit))

  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value.slice(0, contentLimit)
    setContent(value)
    setContentCharCount(value.length)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      if (!executeRecaptcha) throw new Error('Recaptcha not available')

      const token = await executeRecaptcha('contact')
      if (!token) throw new Error('Failed to get recaptcha token')

      const payload: ContactMessagePayload = {
        name,
        email,
        content,
        captchaToken: token,
      }

      await sendMessage(payload)

      setSuccess(true)
      setName('')
      setEmail('')
      setContent('')
      setContentCharCount(0)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unexpected error')
    } finally {
      setLoading(false)
    }
  }

  return {
    name,
    email,
    content,
    nameCharCount: name.length,
    emailCharCount: email.length,
    contentCharCount,
    loading,
    success,
    error,
    NAME_EMAIL_LIMIT: nameEmailLimit,
    CONTENT_LIMIT: contentLimit,
    handleNameChange,
    handleEmailChange,
    handleContentChange,
    handleSubmit,
  }
}
