import { notFound } from 'next/navigation'
import { EditPostPage } from '@/components/layouts'
import { prisma } from '@/lib/prisma'
import type { PostFormData } from '@/lib/hooks/usePostForm'

export default async function EditPost({
  params,
}: {
  params: Promise<{ postId: string }>
}) {
  const { postId } = await params

  const post = await prisma.post.findUnique({
    where: { id: postId },
    include: {
      tags: { select: { id: true } },
    },
  })

  if (!post) return notFound()

  const initialData: PostFormData = {
    id: post.id,
    title: post.title,
    description: post.description,
    content: post.content,
    featuredImage: post.featuredImage ?? undefined,
    featuredImageAlt: post.featuredImageAlt ?? null,
    categoryId: post.categoryId ?? undefined,
    tagIds: post.tags?.map((t) => t.id) ?? [],
    published: post.published,
    publishedAt: post.publishedAt ? post.publishedAt.toISOString() : null,
  }

  return <EditPostPage initialData={initialData} />
}
