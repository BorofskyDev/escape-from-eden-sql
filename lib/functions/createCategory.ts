// lib/functions/category.ts
export interface Category {
  id: string
  name: string
  slug: string
  description?: string
}

/**
 * Helper to generate a slug from a name.
 */
export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/'/g, '-')
    .replace(/[^a-z0-9-]/g, '')
}

/**
 * Fetch categories from the API.
 */
export async function getCategories(): Promise<Category[]> {
  const res = await fetch('/api/categories')
  if (!res.ok) {
    throw new Error('Failed to fetch categories')
  }
  return res.json()
}

/**
 * Creates a new category via the API.
 */
export async function createCategory(
  name: string,
  description?: string
): Promise<Category> {
  const slug = generateSlug(name)
  const res = await fetch('/api/categories', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, slug, description }),
  })
  if (!res.ok) {
    throw new Error('Failed to create category')
  }
  return res.json()
}
