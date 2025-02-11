// components/ui/inputs/ImageInput.tsx
'use client'

import { useState } from 'react'
import Image from 'next/image'

interface ImageInputProps {
  label?: string
  width?: number
  height?: number
  onImageSelect?: (file: File) => void
}

export default function ImageInput({
  label = 'Featured Image',
  width = 300,
  height = 200,
  onImageSelect,
}: ImageInputProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const maxFileSize = 10 * 1024 * 1024 // 10 MB in bytes

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      const file = files[0]

      // Check if file exceeds max size
      if (file.size > maxFileSize) {
        alert('File is too large. Please select an image smaller than 10 MB.')
        // Optionally, you could also clear the input by e.target.value = ''
        return
      }

      const preview = URL.createObjectURL(file)
      setPreviewUrl(preview)
      if (onImageSelect) {
        onImageSelect(file)
      }
    }
  }

  return (
    <div>
      <label className='block text-sm font-medium text-gray-700'>{label}</label>
      <input
        type='file'
        accept='image/*'
        onChange={handleChange}
        className='mt-1 block w-full'
      />
      {previewUrl && (
        <div className='mt-2'>
          <Image
            src={previewUrl}
            alt='Image Preview'
            width={width}
            height={height}
            className='rounded'
          />
        </div>
      )}
    </div>
  )
}
