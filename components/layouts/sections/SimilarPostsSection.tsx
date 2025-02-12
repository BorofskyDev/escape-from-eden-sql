

import { PrismaClient } from '@prisma/client'
import SmallPostCard from '@/components/ui/cards/posts/SmallPostCard'
import { PostData } from '@/components/ui/cards/posts/PostCard'

const prisma = new PrismaClient()

interface SimilarPostsProps {
  currentPostId: string
  currentCategoryId?: string | null
  currentTagIds: string[]
}

/**
 * Computes a similarity score for a candidate post.
 * Shared category: +5 points
 * Each shared tag: +1 point
 */
function computeSimilarityScore(
  candidate: {
    categoryId: string | null
    tagIds: string[]
    publishedAt: Date | null
  },
  current: SimilarPostsProps
): number {
  let score = 0
  if (
    current.currentCategoryId &&
    candidate.categoryId === current.currentCategoryId
  ) {
    score += 5
  }
  // Count how many candidate tags appear in the current post's tag list.
  const sharedTags = candidate.tagIds.filter((tagId) =>
    current.currentTagIds.includes(tagId)
  )
  score += sharedTags.length
  return score
}

/**
 * SimilarPosts is a server component that queries for published posts that share either the
 * same category or at least one tag with the current post. It calculates a similarity score,
 * sorts candidates, and displays the top three similar posts.
 */
export default async function SimilarPostsSection({
  currentPostId,
  currentCategoryId,
  currentTagIds,
}: SimilarPostsProps) {
  // Fetch candidate posts:
  const candidates = await prisma.post.findMany({
    where: {
      published: true,
      id: { not: currentPostId },
      OR: [
        { categoryId: currentCategoryId || undefined },
        { tags: { some: { id: { in: currentTagIds } } } },
      ],
    },
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

  // Transform candidate posts slightly for scoring:
  const scoredCandidates = candidates.map((post) => {
    // Determine candidate's category id and candidate's tag ids.
    const candidateCategoryId = post.category?.id || null
    const candidateTagIds = post.tags.map((tag) => tag.id)
    const publishedDate = post.publishedAt ? new Date(post.publishedAt) : null
    const score = computeSimilarityScore(
      {
        categoryId: candidateCategoryId,
        tagIds: candidateTagIds,
        publishedAt: publishedDate,
      },
      { currentPostId, currentCategoryId, currentTagIds }
    )
    return { score, post }
  })

  // Sort by score (desc) then by publishedAt (desc)
  scoredCandidates.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score
    const aTime = a.post.publishedAt
      ? new Date(a.post.publishedAt).getTime()
      : 0
    const bTime = b.post.publishedAt
      ? new Date(b.post.publishedAt).getTime()
      : 0
    return bTime - aTime
  })

  const topCandidates = scoredCandidates.slice(0, 3).map((sc) => sc.post)

  // Transform candidates into PostData shape for the card.
  const transformPost = (post: (typeof candidates)[number]): PostData => ({
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
    tags: post.tags.map((tag) => ({ id: tag.id, name: tag.name })),
    slug: post.slug,
  })

  return (
    <section className='mt-12'>
      <h2 className='text-2xl font-bold mb-4'>Similar Posts</h2>
      {topCandidates.length > 0 ? (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
          {topCandidates.map((post) => (
            <SmallPostCard key={post.slug} post={transformPost(post)} />
          ))}
        </div>
      ) : (
        <p className='text-gray-600'>No similar posts found.</p>
      )}
    </section>
  )
}
