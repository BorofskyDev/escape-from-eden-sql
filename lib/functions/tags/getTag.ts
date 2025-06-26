import { prisma } from '@/lib/prisma'
import type { TagData } from '@/lib/types/tagTypes'

export async function getTag(tagId: string): Promise<TagData | null> {
  return prisma.tag.findUnique({
    where: { id: tagId },
    select: { id: true, name: true, slug: true },
  })
}
