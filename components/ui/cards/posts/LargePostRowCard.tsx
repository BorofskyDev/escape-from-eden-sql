// components/ui/cards/LargePostRowCard.tsx
'use client'

import {PostCard, PostData } from './post-card/PostCard'

interface LargePostRowCardProps {
  post: PostData
}

export function LargePostRowCard({ post }: LargePostRowCardProps) {
  return <PostCard variant='largeRow' post={post} />
}
