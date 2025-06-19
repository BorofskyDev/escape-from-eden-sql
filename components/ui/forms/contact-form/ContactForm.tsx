// components/ui/forms/ContactForm.tsx
'use client'

import { BodyText, Heading } from '@/components/ui/common'
import {
  GeneralInput,
  TextAreaInput,
  ActionButton,
} from '@/components/ui/common'
import { useContactForm } from '@/lib/hooks'
import styles from './ContactForm.module.scss'

export function ContactForm() {
  const {
    name,
    email,
    content,
    nameCharCount,
    emailCharCount,
    contentCharCount,
    NAME_EMAIL_LIMIT,
    CONTENT_LIMIT,
    loading,
    success,
    error,
    handleNameChange,
    handleEmailChange,
    handleContentChange,
    handleSubmit,
  } = useContactForm()

  return (
    <form onSubmit={handleSubmit} className={styles.contactForm}>
      <Heading as='h2' size='section'>
        Contact Form
      </Heading>

      {success && <BodyText>Message sent successfully!</BodyText>}
      {error && <BodyText>{error}</BodyText>}

      <GeneralInput
        label='Name'
        name='name'
        value={name}
        maxLength={NAME_EMAIL_LIMIT}
        onChange={handleNameChange}
        required
      />
      <BodyText variant='body-sm' aria-live='polite'>
        {nameCharCount}/{NAME_EMAIL_LIMIT} characters
      </BodyText>

      <GeneralInput
        label='Email'
        type='email'
        name='email'
        value={email}
        maxLength={NAME_EMAIL_LIMIT}
        onChange={handleEmailChange}
        required
      />
      <BodyText variant='body-sm' aria-live='polite'>
        {emailCharCount}/{NAME_EMAIL_LIMIT} characters
      </BodyText>
      {/* email counter optional; you can mirror the one for name */}

      <TextAreaInput
        label='Message'
        name='content'
        value={content}
        onChange={handleContentChange}
        maxLength={CONTENT_LIMIT}
        rows={5}
        aria-describedby='msg-count'
        required
      />
      <BodyText id='msg-count' aria-live='polite'>
        {contentCharCount}/{CONTENT_LIMIT} characters
      </BodyText>

      <BodyText variant='body-sm'>
        Your submission is protected by reCAPTCHA.
      </BodyText>

      <ActionButton type='submit' disabled={loading}>
        {loading ? 'Sending…' : 'Send Message'}
      </ActionButton>
    </form>
  )
}
