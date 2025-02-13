// lib/hooks/functions/category.ts
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

// lib/functions/category.ts
export async function updateCategory(
  id: string,
  payload: { name: string; description?: string }
): Promise<Category> {
  const slug = generateSlug(payload.name)
  const res = await fetch('/api/categories', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, name: payload.name, slug, description: payload.description }),
  })
  if (!res.ok) {
    throw new Error('Failed to update category')
  }
  return res.json()
}

export async function deleteCategory(id: string): Promise<Category> {
  const res = await fetch('/api/categories', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id }),
  })
  if (!res.ok) {
    throw new Error('Failed to delete category')
  }
  return res.json()
}
