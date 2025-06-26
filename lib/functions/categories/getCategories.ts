import { Category } from "@prisma/client"

export async function getCategories(): Promise<Category[]> {
  const res = await fetch('/api/categories')
  if (!res.ok) {
    throw new Error('Failed to fetch categories')
  }
  return res.json()
}
