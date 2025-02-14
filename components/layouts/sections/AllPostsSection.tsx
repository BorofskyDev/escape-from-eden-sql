// components/layout/sections/AllPostsSection.tsx
'use client'

import { useState } from 'react'
import usePaginatedPosts from '@/lib/hooks/usePaginatedPosts'
import SmallPostCard from '@/components/ui/cards/posts/SmallPostCard'
import { PostData } from '@/components/ui/cards/posts/PostCard'
import { RecentPost } from '@/lib/functions/getRecentPosts'

const POSTS_PER_PAGE = 6

function getPaginationNumbers(current: number, total: number): number[] {
  if (total <= 10) {
    return Array.from({ length: total }, (_, i) => i + 1)
  }
  const pages: number[] = []
  pages.push(1)
  let start = Math.max(2, current - 2)
  let end = Math.min(total - 1, current + 2)
  if (current <= 4) {
    start = 2
    end = 5
  }
  if (current >= total - 3) {
    start = total - 4
    end = total - 1
  }
  if (start > 2) {
    pages.push(-1)
  }
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  if (end < total - 1) {
    pages.push(-1)
  }
  pages.push(total)
  return pages
}

// Helper to transform a Post from the API into the shape expected by SmallPostCard.
function transformPost(post: RecentPost): PostData {
  return {
    title: post.title,
    description: post.description,
    categoryName: post.category?.name ?? 'Uncategorized',
    categoryId: post.category ? post.category.id.toString() : undefined,
    publishedAt: post.publishedAt
      ? new Date(post.publishedAt).toLocaleDateString('en-US')
      : '',
    imageUrl: post.featuredImage ?? 'https://via.placeholder.com/800',
    tags: post.tags.map((t) => ({ id: t.id.toString(), name: t.name })),
    slug: post.slug,
  }
}

export default function AllPostsSection() {
  const [page, setPage] = useState(1)
  const { posts, total, loading, error } = usePaginatedPosts(
    page,
    POSTS_PER_PAGE
  )
  const totalPages = Math.ceil(total / POSTS_PER_PAGE)

  if (loading) return <p>Loading posts...</p>
  if (error) return <p>Error loading posts</p>
  if (posts.length === 0) return <p>No posts found</p>

  return (
    <section className='my-16'>
      <h2 className='text-center text-5xl font-header my-6'>All Posts</h2>

      {/* Responsive Grid: 1 column on mobile, 2 columns on tablets, 3 columns on laptops+ */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
        {posts.map((post: RecentPost) => (
          <SmallPostCard key={post.slug} post={transformPost(post)} />
        ))}
      </div>

      {/* Pagination Controls */}
      <div className='flex justify-center items-center mt-6 gap-2'>
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className='px-3 py-1 border rounded hover:bg-gray-200 disabled:opacity-50'
        >
          Prev
        </button>
        {getPaginationNumbers(page, totalPages).map((p, idx) =>
          p === -1 ? (
            <span key={idx} className='px-3 py-1'>
              ...
            </span>
          ) : (
            <button
              key={idx}
              onClick={() => setPage(p)}
              className={`px-3 py-1 border rounded hover:bg-secondary transition-all duration-200 ${
                p === page ? 'bg-primary text-bg1' : ''
              }`}
            >
              {p}
            </button>
          )
        )}
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          className='px-3 py-1 border rounded hover:bg-gray-200 disabled:opacity-50'
        >
          Next
        </button>
      </div>
    </section>
  )
}
