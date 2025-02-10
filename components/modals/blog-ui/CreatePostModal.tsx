// components/CreatePostModal.tsx
'use client'

import { useState } from 'react'
import Modal from '../Modal'
import FormField from '@/components/ui/inputs/FormField'
import SlugGenerator from '@/components/ui/inputs/SlugGenerator'

interface CreatePostModalProps {
  open: boolean
  onClose: () => void
  origin?: { x: number; y: number }
}

export default function CreatePostModal({
  open,
  onClose,
  origin,
}: CreatePostModalProps) {
  // Create state for the title so we can update the slug live.
  const [title, setTitle] = useState('')

  return (
    <Modal open={open} onClose={onClose} origin={origin}>
      <div className='flex flex-col gap-4'>
        <h2 className='text-xl font-semibold'>Create a New Post</h2>

        {/* Title Field */}
        <FormField
          label='Title'
          placeholder='Enter post title'
          variant='input'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* Slug Generator (read-only) */}
        <SlugGenerator title={title} />

        {/* Description */}
        <FormField
          label='Description'
          placeholder='Enter a short post description'
          variant='textarea'
          rows={2}
        />

        {/* Content */}
        <FormField
          label='Content'
          placeholder='Write your blog post content here...'
          variant='textarea'
          rows={4}
        />

        {/* Category (Single) */}
        <div>
          <label className='block text-sm font-medium text-gray-700'>
            Category
          </label>
          <select className='mt-1 block w-full border rounded p-2'>
            <option value=''>Select a Category</option>
            {/* Future: Map categories from DB */}
          </select>
        </div>

        {/* Tags (Multiple) */}
        <FormField
          label='Tags'
          placeholder='Comma-separated tags'
          variant='input'
        />

        {/* Submit and Cancel Buttons */}
        <div className='flex justify-end gap-2 mt-4'>
          <button
            className='bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400'
            onClick={onClose}
          >
            Cancel
          </button>
          <button className='bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700'>
            Create
          </button>
        </div>
      </div>
    </Modal>
  )
}
