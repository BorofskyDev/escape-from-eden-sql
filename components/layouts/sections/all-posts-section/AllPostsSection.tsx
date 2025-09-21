// components/layout/sections/AllPostsSection.tsx
'use client'

import { useState } from 'react'
import usePaginatedPosts from '@/lib/hooks/usePaginatedPosts'
import { SmallPostCard } from '@/components/ui/cards/'
import { PostData } from '@/components/ui/cards/'
import { RecentPost } from '@/lib/functions/getRecentPosts'
import { GeneralSection } from '@/components/layouts/'
import { Heading } from '@/components/ui/common'
import { icons } from '@/lib/icons/icons'
import styles from './AllPostsSection.module.scss'

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
    id: post.id.toString(),
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
    <GeneralSection id='all-posts' className={styles.allPostsSection}>
      <Heading as='h2' size='section'>
        All Posts
      </Heading>

      {/* Responsive Grid: 1 column on mobile, 2 columns on tablets, 3 columns on laptops+ */}
      <div className={styles.allPostsSection__grid}>
        {posts.map((post: RecentPost) => (
          <SmallPostCard key={post.slug} post={transformPost(post)} />
        ))}
      </div>

      <div className={styles.pagination}>
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className={styles.pagination__button}
        >
          <svg aria-hidden='true' focusable='false' viewBox='0 0 50 50'>
            <path d={icons.previous} />
          </svg>
          <span>Prev</span>
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
              className={`${styles.pagination__button} ${
                p === page ? styles.pagination__button__active : ''
              }`}
            >
              {p}
            </button>
          )
        )}
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          className={`${styles.pagination__button} ${styles.pagination__button__next}`}
        >
          Next
          <svg aria-hidden='true' focusable='false' viewBox='0 0 50 50'>
            <path d={icons.next} />
          </svg>
        </button>
      </div>
    </GeneralSection>
  )
}
