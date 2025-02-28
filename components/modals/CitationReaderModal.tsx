// components/modals/CitationReaderModal.tsx
'use client'

import React from 'react'
import Modal from './Modal'

interface CitationField {
  name: string
  value: string
  punctuationAfter?: string
  format?: 'none' | 'italic' | 'bold' | 'underline'
}

export interface CitationData {
  styleName?: string
  fields: CitationField[]
}

interface CitationReaderModalProps {
  open: boolean
  citationIndex: number
  citationData: CitationData
  onClose: () => void
}

export default function CitationReaderModal({
  open,
  citationIndex,
  citationData,
  onClose,
}: CitationReaderModalProps) {
  if (!open) return null

  // Updated render logic for each field:
  const renderField = (field: CitationField) => {
    // Try to parse the field value as JSON
    let parsedLink: { title?: string; href?: string } | null = null
    try {
      parsedLink = JSON.parse(field.value)
    } catch {
      parsedLink = null
    }

    if (parsedLink && parsedLink.href && parsedLink.title) {
      // If it's a valid link object, render an anchor element
      return (
        <a
          key={field.name}
          href={parsedLink.href}
          target='_blank'
          rel='noopener noreferrer'
          className='text-primary underline'
        >
          {parsedLink.title}
        </a>
      )
    } else {
      // Otherwise, render the field value with formatting if needed
      let content = field.value
      if (field.format === 'bold') {
        content = `<strong>${content}</strong>`
      } else if (field.format === 'italic') {
        content = `<em>${content}</em>`
      } else if (field.format === 'underline') {
        content = `<u>${content}</u>`
      }

      return (
        <span key={field.name} dangerouslySetInnerHTML={{ __html: content }} />
      )
    }
  }

  return (
    <Modal open={true} onClose={onClose}>
      <h2 className='text-lg font-bold mb-2'>Citation #{citationIndex + 1}</h2>
      <div className='space-x-1'>
        {citationData.fields.map((field, i) => (
          <React.Fragment key={i}>
            {renderField(field)}
            {field.punctuationAfter && (
              <span
                dangerouslySetInnerHTML={{ __html: field.punctuationAfter }}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </Modal>
  )
}
