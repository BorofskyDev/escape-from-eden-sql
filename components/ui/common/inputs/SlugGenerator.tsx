// components/ui/inputs/SlugGenerator.tsx
'use client'

import React from 'react'

interface SlugGeneratorProps {
  title: string
}

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/ /g, '-') // Convert spaces to hyphens
    .replace(/'/g, '-') // Convert apostrophes to hyphens
    .replace(/[^a-z0-9-]/g, '') // Remove all other characters
}

export default function SlugGenerator({ title }: SlugGeneratorProps) {
  const slug = generateSlug(title)
  return (
    <div>
      <label className='block text-sm font-medium text-text2'>Slug</label>
      <input
        type='text'
        value={slug}
        readOnly
        className='mt-1 block w-full border rounded p-2 bg-bg1 cursor-not-allowed'
      />
    </div>
  )
}
