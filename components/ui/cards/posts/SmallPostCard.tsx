// components/ui/cards/SmallPostCard.tsx
'use client'

import {PostCard } from './post-card/PostCard'
import { PostData } from './types'

interface SmallPostCardProps {
  post: PostData
}

export function SmallPostCard({ post }: SmallPostCardProps) {
  return <PostCard variant='small' post={post} />
}
