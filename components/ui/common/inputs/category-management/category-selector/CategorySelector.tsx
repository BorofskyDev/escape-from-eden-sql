'use client'

import { useState, useEffect, ChangeEvent } from 'react'
import { Category } from '@prisma/client'
import { getCategories } from '@/lib/functions/categories'
import { ActionButton, BodyText } from '@/components/ui/common'
import { CategoryCreator } from '@/components/ui/common'
import styles from './CategorySelector.module.scss'

interface CategorySelectorProps {
  defaultCategoryId?: string
  onSelect?: (category: Category | null) => void
}

export function CategorySelector({
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
    onSelect?.(cat)
  }

  const handleCategoryCreated = (newCat: Category) => {
    const category = newCat
    setCategories((prev) => [...prev, category])
    setSelectedCategoryId(category.id)
    onSelect?.(category)
    setCreating(false)
  }

  return (
    <div className={styles.categorySelector}>
      <label className={styles.label}>Category</label>

      {categories.length === 0 ? (
        <BodyText>No categories have been created.</BodyText>
      ) : (
        <select
          value={selectedCategoryId}
          onChange={handleSelectChange}
          className={styles.selector}
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
          <ActionButton
            onClick={() => setCreating(true)}
            type='button'
            variant='secondary'
          >
            Create Category
          </ActionButton>
        )}
      </div>
    </div>
  )
}
