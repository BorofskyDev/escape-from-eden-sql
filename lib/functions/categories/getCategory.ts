import { prisma } from '@/lib/prisma'
import type { CategoryMeta } from '@/lib/types/categoryTypes'

export async function getCategory(
  categoryId: string
): Promise<CategoryMeta | null> {
  return prisma.category.findUnique({
    where: { id: categoryId },
    select: { id: true, name: true, description: true },
  })
}
