'use client'

import { useState, ChangeEvent } from 'react'
import Image from 'next/image'
import styles from './ImageInput.module.scss'

interface ImageInputProps {
  label?: string
  width?: number
  height?: number
  existingImage?: string
  onImageSelect?: (file: File) => void
}

export function ImageInput({
  label = 'Featured Image',
  width = 300,
  height = 200,
  existingImage,
  onImageSelect,
}: ImageInputProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    existingImage || null
  )
  const maxFileSize = 10 * 1024 * 1024 // 10 MB

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    const file = files[0]
    // Check if file exceeds max size
    if (file.size > maxFileSize) {
      alert('File is too large. Please select an image smaller than 10 MB.')
      return
    }

    const preview = URL.createObjectURL(file)
    setPreviewUrl(preview)
    if (onImageSelect) {
      onImageSelect(file)
    }
  }

  return (
    <div className={styles.imageInput}>
      <label className={styles.label}>{label}</label>
      <input
        type='file'
        accept='image/*'
        onChange={handleChange}
        className={styles.fileInput}
      />
      {previewUrl && (
        <div className='mt-2'>
          <Image
            src={previewUrl}
            alt='Image Preview'
            width={width}
            height={height}
            layout='responsive'
            objectFit='cover'
            className={styles.image}
          />
        </div>
      )}
    </div>
  )
}
