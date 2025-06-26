import { useState, useEffect } from 'react'
import { getCategories } from '@/lib/functions/'
import type { Category } from '@prisma/client'

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchCategories() {
      try {
        setLoading(true)
        setError(null)
        const cats = await getCategories()
        setCategories(cats)
      } catch (err) {
        console.error('Error fetching categories:', err)
        setError(
          err instanceof Error ? err.message : 'Failed to fetch categories'
        )
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  return { categories, loading, error }
}
