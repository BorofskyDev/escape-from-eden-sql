// components/ui/forms/ContactForm.tsx
'use client'

import { useState, useEffect } from 'react'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'
import { sendMessage, ContactMessagePayload } from '@/lib/functions/sendMessage'

export default function ContactForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [contentCharCount, setContentCharCount] = useState(0)
  // Removed captchaToken state as it is not used elsewhere
  const CONTENT_LIMIT = 500
  const NAME_EMAIL_LIMIT = 100

  const { executeRecaptcha } = useGoogleReCaptcha()

  // Clear success or error messages after 5 seconds.
  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        setSuccess(false)
        setError(null)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [success, error])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      if (!executeRecaptcha) {
        throw new Error('Recaptcha not available')
      }
      // Execute reCAPTCHA v3 with an action, e.g. "contact"
      const token = await executeRecaptcha('contact')
      if (!token) {
        throw new Error('Failed to get recaptcha token')
      }
      const payload: ContactMessagePayload = {
        name,
        email,
        content,
        captchaToken: token,
      }
      await sendMessage(payload)
      setSuccess(true)
      // Clear fields after successful submission
      setName('')
      setEmail('')
      setContent('')
      setContentCharCount(0)
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('An unexpected error occurred')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value.slice(0, CONTENT_LIMIT)
    setContent(value)
    setContentCharCount(value.length)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='max-w-lg mx-auto p-4 bg-bg1 rounded shadow'
    >
      <h1 className='text-2xl font-bold mb-4'>Contact Me</h1>
      {success && (
        <p className='text-green-600 mb-4'>Message sent successfully!</p>
      )}
      {error && <p className='text-red-600 mb-4'>{error}</p>}

      <div className='mb-4'>
        <label htmlFor='name' className='block mb-1 font-medium'>
          Name
        </label>
        <input
          id='name'
          type='text'
          value={name}
          maxLength={NAME_EMAIL_LIMIT}
          onChange={(e) => setName(e.target.value.slice(0, NAME_EMAIL_LIMIT))}
          className='w-full border rounded p-2'
          required
        />
        <p className='text-xs text-gray-500'>
          {name.length}/{NAME_EMAIL_LIMIT} characters
        </p>
      </div>

      <div className='mb-4'>
        <label htmlFor='email' className='block mb-1 font-medium'>
          Email
        </label>
        <input
          id='email'
          type='email'
          value={email}
          maxLength={NAME_EMAIL_LIMIT}
          onChange={(e) => setEmail(e.target.value.slice(0, NAME_EMAIL_LIMIT))}
          className='w-full border rounded p-2'
          required
        />
        <p className='text-xs text-gray-500'>
          {email.length}/{NAME_EMAIL_LIMIT} characters
        </p>
      </div>

      <div className='mb-4'>
        <label htmlFor='content' className='block mb-1 font-medium'>
          Message
        </label>
        <textarea
          id='content'
          value={content}
          onChange={handleContentChange}
          maxLength={CONTENT_LIMIT}
          className='w-full border rounded p-2'
          rows={5}
          required
        />
        <p className='text-xs text-gray-500'>
          {contentCharCount}/{CONTENT_LIMIT} characters
        </p>
      </div>

      {/* For reCAPTCHA v3 there is no visible widget.
          Optionally, you can add an accessible instruction. */}
      <p className='mb-4 text-xs text-gray-500'>
        Your submission is protected by reCAPTCHA.
      </p>

      <button
        type='submit'
        disabled={loading}
        className='bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50'
      >
        {loading ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  )
}
