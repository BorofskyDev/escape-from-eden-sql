// components/ui/inputs/CategorySelector.tsx
'use client'

import { useState, useEffect, ChangeEvent } from 'react'
import { getCategories, Category } from '@/lib/functions/category'
import CategoryCreator from './CategoryCreator'

interface CategorySelectorProps {
  defaultCategoryId?: string
  onSelect?: (category: Category | null) => void
}

export default function CategorySelector({
  defaultCategoryId,
  onSelect,
}: CategorySelectorProps) {
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>(
    defaultCategoryId || ''
  )
  const [creating, setCreating] = useState<boolean>(false)

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

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value
    setSelectedCategoryId(id)
    const cat = categories.find((c) => c.id === id) || null
    if (onSelect) {
      onSelect(cat)
    }
  }

  const handleCategoryCreated = (newCat: Category) => {
    setCategories((prev) => [...prev, newCat])
    setSelectedCategoryId(newCat.id)
    if (onSelect) {
      onSelect(newCat)
    }
    setCreating(false)
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
          <CategoryCreator
            onCategoryCreated={handleCategoryCreated}
            onCancel={() => setCreating(false)}
          />
        ) : (
          <button
            onClick={() => setCreating(true)}
            className='mt-2 text-blue-600 hover:underline'
            type='button'
          >
            Create Category
          </button>
        )}
      </div>
    </div>
  )
}
