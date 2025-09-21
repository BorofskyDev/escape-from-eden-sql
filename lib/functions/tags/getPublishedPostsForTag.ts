import { prisma } from '@/lib/prisma'
import type { PostWithRelations } from '@/lib/types/tagTypes'

export async function getPublishedPostsForTag(
  tagId: string
): Promise<PostWithRelations[]> {
  return prisma.post.findMany({
    where: {
      published: true,
      tags: { some: { id: tagId } },
    },
    orderBy: [{ publishedAt: 'desc' }, { updatedAt: 'desc' }],
    select: {
      id: true,
      title: true,
      description: true,
      featuredImage: true,
      featuredImageAlt: true,
      publishedAt: true,
      slug: true,
      category: { select: { id: true, name: true } },
      tags: { select: { id: true, name: true } },
    },
  })
}
