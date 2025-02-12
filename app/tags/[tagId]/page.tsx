// app/tags/[tagId]/page.tsx
import { PrismaClient } from '@prisma/client'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import SmallPostCard from '@/components/ui/cards/posts/SmallPostCard'
import { PostData } from '@/components/ui/cards/posts/PostCard'
import GeneralSection from '@/components/layouts/sections/GeneralSection'
import PageTitle from '@/components/typography/PageTitle'

const prisma = new PrismaClient()

export default async function TagPage({
  params,
}: {
  params: { tagId: string }
}) {
  const { tagId } = params

  // Fetch the current tag information.
  const tag = await prisma.tag.findUnique({
    where: { id: tagId },
    select: {
      id: true,
      name: true,
      slug: true,
    },
  })

  if (!tag) {
    notFound()
  }

  // Fetch all published posts associated with this tag.
  const posts = await prisma.post.findMany({
    where: {
      published: true,
      tags: {
        some: { id: tagId },
      },
    },
    orderBy: [{ publishedAt: 'desc' }, { updatedAt: 'desc' }],
    select: {
      id: true,
      title: true,
      description: true,
      featuredImage: true,
      publishedAt: true,
      slug: true,
      category: { select: { id: true, name: true } },
      tags: { select: { id: true, name: true } },
    },
  })

  // Fetch all tags for the buttons list.
  const allTags = await prisma.tag.findMany({
    where: { deletedAt: null },
    orderBy: { name: 'asc' },
    select: { id: true, name: true, slug: true },
  })

  // Transform posts into the shape expected by SmallPostCard.
  const transformedPosts: PostData[] = posts.map((post) => ({
    title: post.title,
    description: post.description,
    publishedAt: post.publishedAt
      ? new Date(post.publishedAt).toLocaleDateString('en-US', {
          month: '2-digit',
          day: '2-digit',
          year: 'numeric',
        })
      : '',
    imageUrl: post.featuredImage || 'https://via.placeholder.com/800',
    categoryName: post.category?.name || 'Uncategorized',
    categoryId: post.category?.id,
    tags: post.tags.map((t) => ({ id: t.id, name: t.name })),
    slug: post.slug,
  }))

  return (
    <GeneralSection>
      {/* Permanent Page Title */}
      <PageTitle>Tags</PageTitle>

      {/* Tag Buttons Row */}
      <div className='flex flex-wrap gap-2 mb-8 justify-center'>
        {allTags.map((t) => (
          <Link key={t.id} href={`/tags/${t.id}`}>
            <button
              className={`px-4 py-2 border rounded hover:bg-gray-200 ${
                t.id === tagId
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-800'
              }`}
            >
              {t.name}
            </button>
          </Link>
        ))}
      </div>

     

      {/* Posts Grid */}
      {transformedPosts.length > 0 ? (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
          {transformedPosts.map((post) => (
            <SmallPostCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <p className='text-center text-gray-600'>
          No posts found for this tag.
        </p>
      )}
    </GeneralSection>
  )
}
