// components/modals/FootnoteModal.tsx
'use client'

import React, { useState, useEffect } from 'react'
import Modal from './Modal'
import CustomRTE from '@/components/ui/inputs/CustomRTE'

interface FootnoteModalProps {
  open: boolean
  onClose: () => void
  onSubmitFootnote: (title: string, content: string) => void
  initialTitle?: string
  initialContent?: string
}

export default function FootnoteModal({
  open,
  onClose,
  onSubmitFootnote,
  initialTitle = '',
  initialContent = '',
}: FootnoteModalProps) {
  const [title, setTitle] = useState(initialTitle)
  const [content, setContent] = useState(initialContent)

  useEffect(() => {
    if (open) {
      setTitle(initialTitle)
      setContent(initialContent)
    }
  }, [open, initialTitle, initialContent])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmitFootnote(title, content)
    onClose()
  }

  return (
    <Modal open={open} onClose={onClose}>
      <h2 className='text-lg font-bold mb-4'>Edit Footnote</h2>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <div>
          <label className='block mb-1 text-sm font-medium'>Title</label>
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='w-full p-2 border border-gray-300 rounded'
            placeholder='Enter footnote title'
          />
        </div>
        <div>
          <label className='block mb-1 text-sm font-medium'>Content</label>
          <CustomRTE initialContent={content} onChange={setContent} />
        </div>
        <div className='flex justify-end pt-4 space-x-2'>
          <button
            type='button'
            onClick={onClose}
            className='bg-gray-300 text-gray-800 py-2 px-4 rounded'
          >
            Cancel
          </button>
          <button
            type='submit'
            className='bg-primary text-white py-2 px-4 rounded'
          >
            Save
          </button>
        </div>
      </form>
    </Modal>
  )
}
