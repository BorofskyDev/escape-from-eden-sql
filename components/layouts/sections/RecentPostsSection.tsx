// components/layout/sections/RecentPostsSection.tsx
'use client'

import { useState, useEffect } from 'react'
import { getRecentPosts, RecentPost } from '@/lib/functions/getRecentPosts'
import formatDateUS from '@/lib/functions/formatDateUS'
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

  if (posts.length < 4) {
    return null
  }

  const [p1, p2, p3, p4] = posts

  const transformPost = (post: RecentPost) => {
    return {
      id: post.id,
      title: post.title,
      description: post.description,
      imageUrl: post.featuredImage ?? 'https://via.placeholder.com/800',
      publishedAt: formatDateUS(post.publishedAt),
      slug: post.slug,
      categoryName: post.category?.name ?? 'Uncategorized',
      categoryId: post.category?.id,
      tags: post.tags.map((t) => ({ id: t.id, name: t.name })),
    }
  }

  const big1 = transformPost(p1)
  const med2 = transformPost(p2)
  const med3 = transformPost(p3)
  const row4 = transformPost(p4)

  return (
    <section className='my-8'>
      <h2 className='text-2xl font-bold mb-4'>Recent Posts</h2>

      <div className='flex flex-col gap-6'>
        <div className='flex flex-col gap-6 lg:flex-row'>
          <div className='lg:w-1/2'>
            <LargePostColumnCard post={big1} />
          </div>

          <div className='lg:w-1/2 flex flex-col gap-6'>
            <MediumPostCard post={med2} />
            <MediumPostCard post={med3} />
          </div>
        </div>

        <div>
          <LargePostRowCard post={row4} />
        </div>
      </div>
    </section>
  )
}
