// components/ui/CategoryDropdown.tsx
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

// You already have functions for fetching categories, e.g., getCategories.
import { getCategories, Category } from '@/lib/functions/category'

interface CategoryDropdownProps {
  currentCategoryId: string
}

export default function CategoryDropdown({
  currentCategoryId,
}: CategoryDropdownProps) {
  const [categories, setCategories] = useState<Category[]>([])
  const [selected, setSelected] = useState(currentCategoryId)
  const router = useRouter()

  useEffect(() => {
    async function fetchCats() {
      try {
        const cats = await getCategories()
        setCategories(cats)
      } catch (error) {
        console.error('Error fetching categories:', error)
      }
    }
    fetchCats()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCategoryId = e.target.value
    setSelected(newCategoryId)
    // Navigate to the new category page.
    router.push(`/categories/${newCategoryId}`)
  }

  return (
    <div className='mb-6'>
      <label htmlFor='category-dropdown' className='block font-medium mb-1'>
        Select Category:
      </label>
      <select
        id='category-dropdown'
        value={selected}
        onChange={handleChange}
        className='border rounded p-2 w-full md:w-1/3'
      >
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>
    </div>
  )
}
