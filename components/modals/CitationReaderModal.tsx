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

  // Example render logic for each field
  const renderField = (field: CitationField) => {
    let content = field.value
    // apply format
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
    // You could also append punctuation in the same span or a separate element
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
