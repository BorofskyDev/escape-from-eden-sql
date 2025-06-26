'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/react'
import { useCategories } from '@/lib/hooks'
import styles from './CategoryDropdown.module.scss'
import { GeneralSection } from '@/components/layouts'
import type { Category } from '@prisma/client'

interface CategoryDropdownProps {
  currentCategoryId: string
}

export default function CategoryDropdown({
  currentCategoryId,
}: CategoryDropdownProps) {
  const { categories, loading, error } = useCategories()
  const router = useRouter()

  // Find the current category object
  const currentCategory = categories.find((cat) => cat.id === currentCategoryId)
  const [selected, setSelected] = useState<Category | null>(
    currentCategory || null
  )

  const handleChange = (category: Category) => {
    setSelected(category)
    router.push(`/categories/${category.id}`)
  }

  if (loading) {
    return (
      <GeneralSection
        id='category-dropdown'
        className={styles.categoryDropdown}
      >
        <label className={styles.categoryDropdown__label}>
          Select Category:
        </label>
        <div className={styles.categoryDropdown__loading}>
          Loading categories...
        </div>
      </GeneralSection>
    )
  }

  if (error) {
    return (
      <GeneralSection
        id='category-dropdown'
        className={styles.categoryDropdown}
      >
        <label className={styles.categoryDropdown__label}>
          Select Category:
        </label>
        <div className={styles.categoryDropdown__error}>Error: {error}</div>
      </GeneralSection>
    )
  }

  return (
    <GeneralSection id='category-dropdown' className={styles.categoryDropdown}>
      <Listbox value={selected} onChange={handleChange}>
        <Label className={styles.categoryDropdown__label}>
          Select Category:
        </Label>
        <ListboxButton className={styles.categoryDropdown__select}>
          {selected?.name || 'Choose a category'}
        </ListboxButton>
        <ListboxOptions className={styles.categoryDropdown__options}>
          {categories.map((category) => (
            <ListboxOption
              key={category.id}
              value={category}
              className={styles.categoryDropdown__option}
            >
              {category.name}
            </ListboxOption>
          ))}
        </ListboxOptions>
      </Listbox>
    </GeneralSection>
  )
}
