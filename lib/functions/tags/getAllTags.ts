import { prisma } from '@/lib/prisma'
import type { TagData } from '@/lib/types/tagTypes'

export async function getAllTags(): Promise<TagData[]> {
  return prisma.tag.findMany({
    where: { deletedAt: null },
    orderBy: { name: 'asc' },
    select: { id: true, name: true, slug: true },
  })
}
