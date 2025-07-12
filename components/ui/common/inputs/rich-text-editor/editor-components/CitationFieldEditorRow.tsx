// CitationFieldEditorRow.tsx

'use client'

import React from 'react'
import { CitationField } from '@/lib/types/citationFieldTypes'

interface Props {
  field: CitationField
  index: number
  totalCount: number
  onChange: (updated: CitationField) => void
  onRemove: () => void
  onMoveUp: () => void
  onMoveDown: () => void
}

/**
 * Renders a single row in the CitationAuthorModal for editing
 * the field name, type, punctuation, format, etc.
 */
export default function CitationFieldEditorRow({
  field,
  index,
  totalCount,
  onChange,
  onRemove,
  onMoveUp,
  onMoveDown,
}: Props) {
  const isLink = field.type === 'link'
  let linkObj = { title: '', href: '' }
  if (isLink) {
    try {
      linkObj = JSON.parse(field.value)
    } catch {}
  }

  // When changing type from 'text' to 'link'
  const handleTypeChange = (newType: 'text' | 'link') => {
    if (newType === 'link') {
      onChange({
        ...field,
        type: 'link',
        value: JSON.stringify({ title: '', href: '' }),
      })
    } else {
      onChange({
        ...field,
        type: 'text',
        value: '',
      })
    }
  }

  // When the user changes the link title / href
  const handleLinkTitleChange = (newTitle: string) => {
    const parsed = { ...linkObj, title: newTitle }
    onChange({
      ...field,
      value: JSON.stringify(parsed),
    })
  }
  const handleLinkHrefChange = (newHref: string) => {
    const parsed = { ...linkObj, href: newHref }
    onChange({
      ...field,
      value: JSON.stringify(parsed),
    })
  }

  // For text fields, direct assignment
  const handleFieldValueChange = (newValue: string) => {
    onChange({
      ...field,
      value: newValue,
    })
  }

  // For punctuation, e.g. '.', ',', '(', etc.
  const handlePunctuationChange = (newPunc: string) => {
    onChange({
      ...field,
      punctuationAfter: newPunc,
    })
  }

  // For format: 'none', 'bold', 'italic', 'underline'
  const handleFormatChange = (
    newFormat: 'none' | 'italic' | 'bold' | 'underline'
  ) => {
    onChange({
      ...field,
      format: newFormat,
    })
  }

  return (
    <div className='border p-2 mb-2 rounded'>
      <div className='flex gap-2 items-center mb-2'>
        {/* Field Name */}
        <input
          type='text'
          placeholder='Field Name'
          value={field.name}
          onChange={(e) => onChange({ ...field, name: e.target.value })}
          className='w-1/4 p-2 border border-gray-300 rounded'
        />

        {/* Field Type */}
        <select
          value={field.type}
          onChange={(e) => handleTypeChange(e.target.value as 'text' | 'link')}
          className='p-2 border border-gray-300 rounded'
        >
          <option value='text'>Text</option>
          <option value='link'>Link</option>
        </select>

        {/* Format */}
        <select
          value={field.format || 'none'}
          onChange={(e) =>
            handleFormatChange(
              e.target.value as 'none' | 'italic' | 'bold' | 'underline'
            )
          }
          className='p-2 border border-gray-300 rounded'
        >
          <option value='none'>No Format</option>
          <option value='bold'>Bold</option>
          <option value='italic'>Italic</option>
          <option value='underline'>Underline</option>
        </select>

        {/* Punctuation After */}
        <input
          type='text'
          placeholder="Punc. after (e.g. '.')"
          value={field.punctuationAfter || ''}
          onChange={(e) => handlePunctuationChange(e.target.value)}
          className='w-12 p-2 border border-gray-300 rounded'
        />

        {/* Reordering Buttons */}
        <button
          type='button'
          disabled={index === 0}
          onClick={onMoveUp}
          className='bg-gray-200 text-gray-800 py-1 px-2 rounded'
        >
          ↑
        </button>
        <button
          type='button'
          disabled={index === totalCount - 1}
          onClick={onMoveDown}
          className='bg-gray-200 text-gray-800 py-1 px-2 rounded'
        >
          ↓
        </button>

        {/* Remove Field */}
        <button
          type='button'
          onClick={onRemove}
          className='bg-red-200 text-red-800 py-1 px-2 rounded'
        >
          Remove
        </button>
      </div>

      {/* If link */}
      {isLink ? (
        <div className='flex flex-col gap-2'>
          <div>
            <label className='block text-sm font-medium'>Link Title</label>
            <input
              type='text'
              value={linkObj.title}
              onChange={(e) => handleLinkTitleChange(e.target.value)}
              className='w-full p-2 border border-gray-300 rounded'
            />
          </div>
          <div>
            <label className='block text-sm font-medium'>Link Href</label>
            <input
              type='text'
              value={linkObj.href}
              onChange={(e) => handleLinkHrefChange(e.target.value)}
              className='w-full p-2 border border-gray-300 rounded'
            />
          </div>
        </div>
      ) : (
        // If text
        <div>
          <label className='block text-sm font-medium'>Field Value</label>
          <input
            type='text'
            value={field.value}
            onChange={(e) => handleFieldValueChange(e.target.value)}
            className='w-full p-2 border border-gray-300 rounded'
          />
        </div>
      )}
    </div>
  )
}
