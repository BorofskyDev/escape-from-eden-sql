// components/ui/inputs/CategoryCreator.tsx
'use client'

import { useState } from 'react'
import { Category } from '@prisma/client'
import { createCategory } from '@/lib/functions/createCategory'
import { ActionButton, GeneralInput } from '@/components/ui/common'
import styles from './CategoryCreator.module.scss'

interface CategoryCreatorProps {
  onCategoryCreated: (newCategory: Category) => void
  onCancel: () => void
}

export function CategoryCreator({
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
    <div className={styles.categoryCreator}>
      <GeneralInput
        type='text'
        label='Category Name'
        placeholder='New category name'
        value={name}
        onChange={(e) => setName(e.target.value)}
        className='block w-full border rounded p-2'
      />
      <GeneralInput
        label='Description (optional)'
        type='text'
        placeholder='Category description'
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className='block w-full border rounded p-2'
      />
      <div className={styles.actions}>
        <ActionButton
          onClick={handleSave}
         
          type='button'
        >
          Save
        </ActionButton>
        <ActionButton
          onClick={onCancel}
          variant='secondary'
          type='button'
        >
          Cancel
        </ActionButton>
      </div>
    </div>
  )
}
