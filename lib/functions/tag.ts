// lib/functions/tag.ts
export interface Tag {
  id: string
  name: string
  slug: string
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
 * Fetches tags from the API.
 */
export async function getTags(): Promise<Tag[]> {
  const res = await fetch('/api/tags')
  if (!res.ok) {
    throw new Error('Failed to fetch tags')
  }
  return res.json()
}

/**
 * Creates a new tag via the API.
 */
export async function createTag(name: string): Promise<Tag> {
  const slug = generateSlug(name)
  const res = await fetch('/api/tags', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, slug }),
  })
  if (!res.ok) {
    throw new Error('Failed to create tag')
  }
  return res.json()
}
