// components/ui/cards/LargePostColumnCard.tsx
'use client'

import { PostCard, PostData } from '../post-card/PostCard'

interface LargePostCardProps {
  post: PostData
}

export function LargePostCard({ post }: LargePostCardProps) {
  return <PostCard variant='large' post={post} />
}
