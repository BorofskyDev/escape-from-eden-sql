'use client'

import { useEffect, useRef, useState } from 'react'
import { Modal } from '@/components/ui/modals'
import { ActionButton, FormField, Heading } from '@/components/ui/common'
import styles from './ImageDetailModal.module.scss'

export type ImageDetails = {
  alt: string
  caption?: string | null
}

export default function ImageDetailsModal({
  open,
  onClose,
  onSubmit,
  initialAlt = '',
  initialCaption = '',
  origin,
  title = 'Insert Image Details',
}: {
  open: boolean
  onClose: () => void
  onSubmit: (data: ImageDetails) => void
  initialAlt?: string
  initialCaption?: string
  origin?: { x: number; y: number }
  title?: string
}) {
  const [alt, setAlt] = useState(initialAlt)
  const [caption, setCaption] = useState(initialCaption)
  const altRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (open) {
      setAlt(initialAlt)
      setCaption(initialCaption)
      // focus alt on open
      setTimeout(() => altRef.current?.focus(), 0)
    }
  }, [open, initialAlt, initialCaption])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmedAlt = alt.trim()
    if (!trimmedAlt) return // alt is required
    const trimmedCaption = caption.trim()
    onSubmit({
      alt: trimmedAlt,
      caption: trimmedCaption ? trimmedCaption : null,
    })
  }

  return (
    <Modal open={open} onClose={onClose} origin={origin}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <Heading as='h3' size='container'>
          {title}
        </Heading>

        <FormField
          label='Alt Text'
          placeholder='Describe the image'
          value={alt}
          onChange={(e) => setAlt(e.target.value)}
        />

        <FormField
          label='Caption (optional, will be seen)'
          placeholder='Shown below the image'
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />

        <div className={styles.buttons}>
          <ActionButton variant='delete' onClick={onClose}>
            Cancel
          </ActionButton>

          <ActionButton variant='primary' type='submit' disabled={!alt.trim()}>
            Insert
          </ActionButton>
        </div>
      </form>
    </Modal>
  )
}
