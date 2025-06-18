// components/ui/cards/SmallPostCard.tsx
'use client'

import {PostCard, PostData } from './post-card/PostCard'

interface SmallPostCardProps {
  post: PostData
}

export function SmallPostCard({ post }: SmallPostCardProps) {
  return <PostCard variant='small' post={post} />
}
