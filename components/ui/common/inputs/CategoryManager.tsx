'use client'

import { useState, useEffect } from 'react'
import {
  getCategories,
 
  updateCategory,
  deleteCategory,
  Category,
} from '@/lib/functions/category'

export default function CategoryManager() {
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
        setCategories(cats)
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
        prev.map((cat) => (cat.id === id ? updated : cat))
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
    <div>
      <h3 className='text-lg font-bold mb-2'>Manage Categories</h3>
      {error && <p className='text-red-500'>{error}</p>}
      <ul className='space-y-2'>
        {categories.map((cat) => (
          <li key={cat.id} className='flex items-center gap-2'>
            {editingId === cat.id ? (
              <>
                <input
                  type='text'
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className='border rounded p-1'
                  placeholder='Category name'
                />
                <input
                  type='text'
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  className='border rounded p-1'
                  placeholder='Category description (optional)'
                />
                <button
                  onClick={() => handleSave(cat.id)}
                  className='bg-blue-500 text-white px-2 py-1 rounded'
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingId(null)}
                  className='text-gray-500'
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <div className='flex-1'>
                  <p className='font-semibold'>{cat.name}</p>
                  {cat.description && (
                    <p className='text-sm text-gray-600'>{cat.description}</p>
                  )}
                </div>
                <button
                  onClick={() => handleEditClick(cat)}
                  className='text-blue-500 hover:underline'
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(cat.id)}
                  className='text-red-500 hover:underline'
                >
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
