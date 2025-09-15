import type { Prisma, Tag } from '@prisma/client'


export type TagData = Pick<Tag, 'id' | 'name' | 'slug'>

export type PostWithRelations = Prisma.PostGetPayload<{
  select: {
    id: true
    title: true
    description: true
    featuredImage: true
    featuredImageAlt: true
    publishedAt: true
    slug: true
    category: { select: { id: true; name: true } }
    tags: { select: { id: true; name: true } }
  }
}>