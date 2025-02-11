// components/ui/inputs/CategorySelector.tsx
'use client'

import React, { useState, useEffect } from 'react'
import {
  getCategories,
  createCategory,
  Category,
} from '@/lib/functions/category'

interface CategorySelectorProps {
  // Optional: callback to lift the selected category upward
  onSelect?: (category: Category) => void
}

export default function CategorySelector({ onSelect }: CategorySelectorProps) {
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('')
  const [creating, setCreating] = useState(false)
  const [newCategoryName, setNewCategoryName] = useState('')

  // Fetch categories on mount.
  useEffect(() => {
    async function fetchCategories() {
      try {
        const cats = await getCategories()
        setCategories(cats)
      } catch (error) {
        console.error('Error fetching categories:', error)
      }
    }
    fetchCategories()
  }, [])

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value
    setSelectedCategoryId(id)
    const cat = categories.find((c) => c.id === id)
    if (cat && onSelect) {
      onSelect(cat)
    }
  }

  const handleCreateCategory = async () => {
    if (!newCategoryName.trim()) return
    try {
      const newCat = await createCategory(newCategoryName)
      setCategories((prev) => [...prev, newCat])
      setSelectedCategoryId(newCat.id)
      if (onSelect) onSelect(newCat)
      setNewCategoryName('')
      setCreating(false)
    } catch (error) {
      console.error('Error creating category:', error)
    }
  }

  return (
    <div>
      <label className='block text-sm font-medium text-gray-700'>
        Category
      </label>
      {categories.length === 0 ? (
        <div className='mt-1 text-sm text-gray-500'>
          No categories have been created.
        </div>
      ) : (
        <select
          value={selectedCategoryId}
          onChange={handleSelectChange}
          className='mt-1 block w-full border rounded p-2'
        >
          <option value=''>Select a Category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      )}
      <div className='mt-2'>
        {creating ? (
          <div className='flex gap-2'>
            <input
              type='text'
              placeholder='New category name'
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              className='block w-full border rounded p-2'
            />
            <button
              onClick={handleCreateCategory}
              className='bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700'
            >
              Save
            </button>
          </div>
        ) : (
          <button
            onClick={() => setCreating(true)}
            className='mt-2 text-blue-600 hover:underline'
          >
            Create Category
          </button>
        )}
      </div>
    </div>
  )
}
