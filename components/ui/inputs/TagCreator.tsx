// components/ui/inputs/TagCreator.tsx
'use client'

import { useState } from 'react'
import { createTag, Tag} from '@/lib/functions/tag'

interface TagCreatorProps {
  onTagCreated: (newTag: Tag) => void
  onCancel: () => void
}

export default function TagCreator({
  onTagCreated,
  onCancel,
}: TagCreatorProps) {
  const [newTagName, setNewTagName] = useState<string>('')

  const handleCreateTag = async () => {
    if (!newTagName.trim()) return
    try {
      // Optionally, you might generate a slug here or rely on the API.
      const tag = await createTag(newTagName)
      onTagCreated(tag)
      setNewTagName('')
    } catch (error) {
      console.error('Error creating tag:', error)
    }
  }

  return (
    <div className='flex gap-2 mt-2'>
      <input
        type='text'
        placeholder='New tag name'
        value={newTagName}
        onChange={(e) => setNewTagName(e.target.value)}
        className='block w-full border rounded p-2'
      />
      <button
        onClick={handleCreateTag}
        className='bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700'
        type='button'
      >
        Save
      </button>
      <button
        onClick={onCancel}
        className='mt-2 text-blue-600 hover:underline'
        type='button'
      >
        Cancel
      </button>
    </div>
  )
}
