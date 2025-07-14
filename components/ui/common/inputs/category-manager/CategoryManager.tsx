'use client'

import { useState, useEffect } from 'react'
import { Category } from '@prisma/client'
import { updateCategory, deleteCategory } from '@/lib/functions/category'
import {
  ActionButton,
  BodyText,
  GeneralInput,
  Heading,
  TextAreaInput,
} from '@/components/ui/common'
import { getCategories } from '@/lib/functions'
import styles from './CategoryManager.module.scss'

export function CategoryManager() {
  const [categories, setCategories] = useState<Category[]>([])
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editName, setEditName] = useState<string>('')
  const [editDescription, setEditDescription] = useState<string>('')
  const [error, setError] = useState<string | null>(null)

  // Fetch categories on mount.
  useEffect(() => {
    async function fetchCats() {
      try {
        const cats = await getCategories()
        const mappedCats = cats.map((cat) => ({
          ...cat,
          description: cat.description ?? null,
        }))
        setCategories(mappedCats)
      } catch (err) {
        console.error('Error fetching categories:', err)
        setError('Failed to load categories.')
      }
    }
    fetchCats()
  }, [])

  const handleEditClick = (cat: Category) => {
    setEditingId(cat.id)
    setEditName(cat.name)
    setEditDescription(cat.description || '')
  }

  const handleSave = async (id: string) => {
    try {
      const updated = await updateCategory(id, {
        name: editName,
        description: editDescription,
      })
      setCategories((prev) =>
        prev.map((cat) =>
          cat.id === id
            ? {
                ...cat,
                name: updated.name,
                description: updated.description ?? null,
              }
            : cat
        )
      )
      setEditingId(null)
      setEditName('')
      setEditDescription('')
    } catch (err) {
      console.error('Error updating category:', err)
      setError('Failed to update category.')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this category?')) return
    try {
      await deleteCategory(id)
      setCategories((prev) => prev.filter((cat) => cat.id !== id))
    } catch (err) {
      console.error('Error deleting category:', err)
      setError('Failed to delete category.')
    }
  }

  return (
    <div className={styles.categoryManager}>
      <Heading as='h4' size='md'>
        Manage Categories
      </Heading>
      {error && <p className='text-red-500'>{error}</p>}
      <ul className={styles.categoryList}>
        {categories.map((cat) => (
          <li key={cat.id} className={styles.categoryItem}>
            {editingId === cat.id ? (
              <>
                <GeneralInput
                  label='Category Name'
                  type='text'
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className='border rounded p-1'
                  placeholder='Category name'
                />
                <TextAreaInput
                  label='Category Description'
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  className='border rounded p-1'
                  placeholder='Category description (optional)'
                />
                <ActionButton onClick={() => handleSave(cat.id)}>
                  Save
                </ActionButton>
                <ActionButton
                  onClick={() => setEditingId(null)}
                  variant='secondary'
                >
                  Cancel
                </ActionButton>
              </>
            ) : (
              <>
                <div className={styles.categoryDetails}>
                  <Heading as='h5' size='sm'>
                    {cat.name}
                  </Heading>
                  {cat.description && <BodyText>{cat.description}</BodyText>}
                </div>
                <div className={styles.actions}>
                  <ActionButton onClick={() => handleEditClick(cat)}>
                    Edit
                  </ActionButton>
                  <ActionButton
                    variant='delete'
                    onClick={() => handleDelete(cat.id)}
                  >
                    Delete
                  </ActionButton>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
