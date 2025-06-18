// components/layout/sections/RecentPostsSection.tsx
'use client'

import { useState, useEffect } from 'react'
import { getRecentPosts, RecentPost } from '@/lib/functions/getRecentPosts'
import formatDateUS from '@/lib/functions/formatDateUS'

import {
  ColContainer,
  GeneralSection,
} from '@/components/layouts'
import {
  LargePostColumnCard,
  MediumPostCard,
  LargePostRowCard,
} from '@/components/ui/cards/'
import { Heading } from '@/components/ui/common'
import styles from './RecentPostsSection.module.scss'
import { LargePostCard } from '@/components/ui/cards/posts/large-post-card/LargePostCard'

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
    <GeneralSection id='recent-posts' className={styles.recentPostsSection}>
      <Heading
        as='h2'
        size='section'
        className={styles.recentPostsSection__heading}
      >
        Recent Posts
      </Heading>

      <ColContainer className={styles.recentPostsSection__container} >
        <div className={styles.recentPostsSection__bigAndMedium}>
          <div className={styles.recentPostsSection__bigPost}>
            <LargePostCard post={big1} />
            <LargePostColumnCard post={big1} />
          </div>

          <div className={styles.recentPostsSection__mediumPosts}>
            <MediumPostCard post={med2} />
            <MediumPostCard post={med3} />
          </div>
        </div>

        <div>
          <LargePostRowCard post={row4} />
        </div>
      </ColContainer>
    </GeneralSection>
  )
}
