// components/ui/inputs/CategoryCreator.tsx
'use client'

import { useState } from 'react'
import { createCategory, Category } from '@/lib/functions/createCategory'

interface CategoryCreatorProps {
  onCategoryCreated: (newCategory: Category) => void
  onCancel: () => void
}

export default function CategoryCreator({
  onCategoryCreated,
  onCancel,
}: CategoryCreatorProps) {
  const [name, setName] = useState<string>('')
  const [description, setDescription] = useState<string>('')

  const handleSave = async () => {
    if (!name.trim()) return
    try {
      const newCategory = await createCategory(name, description)
      onCategoryCreated(newCategory)
      setName('')
      setDescription('')
    } catch (error) {
      console.error('Error creating category:', error)
    }
  }

  return (
    <div className='flex flex-col gap-2 mt-2'>
      <input
        type='text'
        placeholder='New category name'
        value={name}
        onChange={(e) => setName(e.target.value)}
        className='block w-full border rounded p-2'
      />
      <input
        type='text'
        placeholder='Category description (optional)'
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className='block w-full border rounded p-2'
      />
      <div className='flex gap-2'>
        <button
          onClick={handleSave}
          className='bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700'
          type='button'
        >
          Save
        </button>
        <button
          onClick={onCancel}
          className='text-blue-600 hover:underline'
          type='button'
        >
          Cancel
        </button>
      </div>
    </div>
  )
}
