'use client'

import React from 'react'
import Modal from './Modal'

interface FootnoteData {
  title: string
  content: string
}

interface FootnoteReaderModalProps {
  open: boolean
  footnoteIndex: number
  footnoteData: FootnoteData
  onClose: () => void
}

export default function FootnoteReaderModal({
  open,
  footnoteData,
  onClose,
}: FootnoteReaderModalProps) {
  if (!open) return null

  return (
    <Modal open={true} onClose={onClose}>
      
      <div
        className='prose'
        dangerouslySetInnerHTML={{ __html: footnoteData.content }}
      />
    </Modal>
  )
}
