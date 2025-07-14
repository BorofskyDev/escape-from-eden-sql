// components/ui/inputs/TagCreator.tsx
'use client'

import { useState } from 'react'
import { createTag, Tag } from '@/lib/functions/tag'
import { GeneralInput, ActionButton } from '@/components/ui/common'
import styles from './TagCreator.module.scss'

interface TagCreatorProps {
  onTagCreated: (newTag: Tag) => void
  onCancel: () => void
}

export function TagCreator({ onTagCreated, onCancel }: TagCreatorProps) {
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
    <div className={styles.tagCreator}>
      <GeneralInput
        label='Tag Name'
        type='text'
        placeholder='New tag name'
        value={newTagName}
        onChange={(e) => setNewTagName(e.target.value)}
        className='block w-full border rounded p-2'
      />
      <ActionButton
        onClick={handleCreateTag}
      >
        Save
      </ActionButton>
      <ActionButton
        onClick={onCancel}
        variant='secondary'
      >
        Cancel
      </ActionButton>
    </div>
  )
}
