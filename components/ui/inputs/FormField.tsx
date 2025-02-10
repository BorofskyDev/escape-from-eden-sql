// components/ui/inputs/FormField.tsx
'use client'

import React from 'react'

interface FormFieldProps {
  label: string
  placeholder?: string
  variant?: 'input' | 'textarea'
  type?: string
  rows?: number
  value?: string
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void
}

export default function FormField({
  label,
  placeholder,
  variant = 'input',
  type = 'text',
  rows = 2,
  value,
  onChange,
}: FormFieldProps) {
  return (
    <div>
      <label className='block text-sm font-medium text-text2'>{label}</label>
      {variant === 'textarea' ? (
        <textarea
          className='mt-1 block w-full border rounded p-2'
          placeholder={placeholder}
          rows={rows}
          value={value}
          onChange={onChange}
        />
      ) : (
        <input
          type={type}
          className='mt-1 block w-full border rounded p-2'
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      )}
    </div>
  )
}
