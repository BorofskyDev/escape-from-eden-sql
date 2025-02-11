// components/layout/sections/RecentPostsSection.tsx
'use client'

import { useState, useEffect } from 'react'
import { getRecentPosts, RecentPost } from '@/lib/functions/getRecentPosts'

import LargePostColumnCard from '@/components/ui/cards/posts/LargePostColumnCard'
import MediumPostCard from '@/components/ui/cards/posts/MediumPostCard'
import LargePostRowCard from '@/components/ui/cards/posts/LargePostRowCard'

export default function RecentPostsSection() {
  const [posts, setPosts] = useState<RecentPost[]>([])

  useEffect(() => {
    async function fetchData() {
      const recent = await getRecentPosts()
      setPosts(recent)
    }
    fetchData()
  }, [])

  // If we don't have 4 posts yet, either show placeholders or do nothing:
  // For now, let's just handle "less than 4" by short-circuiting.
  if (posts.length < 4) {
    return null
  }

  // We'll label them p1, p2, p3, p4 for clarity
  const [p1, p2, p3, p4] = posts

  // For your "LargePostColumnCard", "MediumPostCard", "LargePostRowCard"
  // we might need to shape the data. Right now your card components expect
  // something like PostData with `imageUrl`, `publishedAt`, etc.
  // So let's transform each post to that shape:
  // e.g. post.description, post.featuredImage, etc.

  const transformPost = (post: RecentPost) => {
    return {
      id: post.id,
      title: post.title,
      description: post.description,
      imageUrl: post.featuredImage ?? 'https://via.placeholder.com/800',
      publishedAt: post.publishedAt ?? 'No date',
      slug: post.slug,
      category: post.categoryId ?? 'Uncategorized',
      tags: post.tags.map((t) => t.name),
    }
  }

  const big1 = transformPost(p1)
  const med2 = transformPost(p2)
  const med3 = transformPost(p3)
  const row4 = transformPost(p4)

  return (
    <section className='my-8'>
      <h2 className='text-2xl font-bold mb-4'>Recent Posts</h2>

      {/* 
        - Mobile/Tablet: column
        - On laptops (lg:), the first post is left half, the second+third are in right half, then the fourth is full width below.
      */}

      {/* Container: flex-col by default, at lg: we do a two-column grid for the first 3, then row 2 for the 4th */}
      <div className='flex flex-col gap-6'>
        {/* 
          At lg: we'll place p1, p2, p3 in a 2-column layout:
            left: p1 (LargePostColumnCard)
            right: p2 + p3 stacked

          Then below that, p4 (LargePostRowCard) full width
        */}

        {/* Wrapper for the first 3 posts */}
        <div className='flex flex-col gap-6 lg:flex-row'>
          {/* Left side (p1) takes half at lg */}
          <div className='lg:w-1/2'>
            <LargePostColumnCard post={big1} />
          </div>

          {/* Right side for the two medium posts, stacked */}
          <div className='lg:w-1/2 flex flex-col gap-6'>
            <MediumPostCard post={med2} />
            <MediumPostCard post={med3} />
          </div>
        </div>

        {/* The 4th post row card, full width at lg, stacked below on mobile */}
        <div>
          <LargePostRowCard post={row4} />
        </div>
      </div>
    </section>
  )
}
