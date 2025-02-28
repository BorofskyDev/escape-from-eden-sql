'use client'

import React, { useState, useEffect } from 'react'
import Modal from './Modal'
import { v4 as uuidv4 } from 'uuid'

// Import your new types + row
import { CitationField, CitationData, SavedStyles } from '@/lib/types/citationFieldTypes'
import CitationFieldEditorRow from '../ui/inputs/editor-components/CitationFieldEditorRow'

interface CitationAuthorModalProps {
  open: boolean
  onClose: () => void
  onSubmitCitation: (data: CitationData) => void
  initialData?: CitationData

  savedStyles: SavedStyles
  onUpdateStyles: (updatedStyles: SavedStyles) => void
}

export default function CitationAuthorModal({
  open,
  onClose,
  onSubmitCitation,
  initialData,
  savedStyles,
  onUpdateStyles,
}: CitationAuthorModalProps) {
  const [styleName, setStyleName] = useState(initialData?.styleName || '')
  const [fields, setFields] = useState<CitationField[]>(
    initialData?.fields || []
  )
  const [styleToLoad, setStyleToLoad] = useState('')

  useEffect(() => {
    if (open) {
      if (initialData) {
        setStyleName(initialData.styleName || '')
        setFields(initialData.fields || [])
      } else {
        setStyleName('')
        setFields([])
      }
      setStyleToLoad('')
    }
  }, [open, initialData])

  // Add a new field
  const handleAddField = () => {
    setFields((prev) => [
      ...prev,
      { id: uuidv4(), name: '', type: 'text', value: '' },
    ])
  }

  // Reorder Up
  const moveFieldUp = (index: number) => {
    if (index <= 0) return
    setFields((prev) => {
      const newArr = [...prev]
      ;[newArr[index], newArr[index - 1]] = [newArr[index - 1], newArr[index]]
      return newArr
    })
  }

  // Reorder Down
  const moveFieldDown = (index: number) => {
    if (index >= fields.length - 1) return
    setFields((prev) => {
      const newArr = [...prev]
      ;[newArr[index], newArr[index + 1]] = [newArr[index + 1], newArr[index]]
      return newArr
    })
  }

  // Remove
  const handleRemoveField = (index: number) => {
    setFields((prev) => prev.filter((_, i) => i !== index))
  }

  // Called by the row's onChange
  const handleFieldChange = (index: number, updated: CitationField) => {
    setFields((prev) => prev.map((f, i) => (i === index ? updated : f)))
  }

  // Save the current fields as a style template (ignoring .value)
  const handleSaveAsStyle = () => {
    const styleLabel = window.prompt('Enter a name for this style template:')
    if (!styleLabel) return

    // Build the template ignoring "value"
    const template = fields.map((f) => ({
      id: f.id,
      name: f.name,
      type: f.type,
      // no value
      // punctuationAfter? format?
      // If you want to store punctuation/format in the style as well,
      // you can also store them here:
      punctuationAfter: f.punctuationAfter,
      format: f.format,
    }))

    const updated = {
      ...savedStyles,
      [styleLabel]: template,
    }
    onUpdateStyles(updated)
    alert(`Style "${styleLabel}" saved for this post!`)
  }

  // Load a style
  const handleLoadStyle = (styleKey: string) => {
    const template = savedStyles[styleKey]
    if (!template) return
    const newFields = template.map((tmpl) => ({
      id: uuidv4(),
      name: tmpl.name,
      type: tmpl.type,
      value:
        tmpl.type === 'link' ? JSON.stringify({ title: '', href: '' }) : '',
      punctuationAfter: tmpl.punctuationAfter,
      format: tmpl.format,
    }))
    setFields(newFields)
  }

  // On Submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const citationData: CitationData = {
      styleName,
      fields,
    }
    onSubmitCitation(citationData)
    setStyleName('')
    setFields([])
    setStyleToLoad('')
    onClose()
  }

  if (!open) return null

  const savedStyleOptions = Object.keys(savedStyles)

  return (
    <Modal open={open} onClose={onClose}>
      <h2 className='text-lg font-bold mb-4'>Add / Edit Citation</h2>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <div>
          <label className='block mb-1 text-sm font-medium'>
            Citation Label (optional)
          </label>
          <input
            type='text'
            value={styleName}
            onChange={(e) => setStyleName(e.target.value)}
            className='w-full p-2 border border-gray-300 rounded'
          />
        </div>

        {/* Load an existing style */}
        {savedStyleOptions.length > 0 && (
          <div className='flex items-center gap-2'>
            <label className='text-sm font-medium'>Load Style:</label>
            <select
              value={styleToLoad}
              onChange={(e) => setStyleToLoad(e.target.value)}
              className='p-2 border border-gray-300 rounded'
            >
              <option value=''>-- Select a Style --</option>
              {savedStyleOptions.map((styleKey) => (
                <option key={styleKey} value={styleKey}>
                  {styleKey}
                </option>
              ))}
            </select>
            <button
              type='button'
              onClick={() => {
                if (styleToLoad) handleLoadStyle(styleToLoad)
              }}
              className='bg-gray-200 text-gray-800 py-1 px-3 rounded'
            >
              Load
            </button>
          </div>
        )}

        {/* Fields */}
        <div>
          <div className='flex justify-between items-center mb-2'>
            <span className='text-sm font-medium'>Citation Fields</span>
            <button
              type='button'
              onClick={handleAddField}
              className='bg-gray-200 text-gray-800 py-1 px-3 rounded'
            >
              + Add Field
            </button>
          </div>

          {fields.map((field, index) => (
            <CitationFieldEditorRow
              key={field.id}
              field={field}
              index={index}
              totalCount={fields.length}
              onChange={(updatedField) =>
                handleFieldChange(index, updatedField)
              }
              onRemove={() => handleRemoveField(index)}
              onMoveUp={() => moveFieldUp(index)}
              onMoveDown={() => moveFieldDown(index)}
            />
          ))}
        </div>

        {/* Save style button */}
        <button
          type='button'
          onClick={handleSaveAsStyle}
          className='bg-blue-100 text-blue-800 py-1 px-2 rounded'
        >
          Save Current Fields as a Style (Just for this Post)
        </button>

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
            Submit
          </button>
        </div>
      </form>
    </Modal>
  )
}
