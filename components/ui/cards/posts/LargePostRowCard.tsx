// components/ui/cards/LargePostRowCard.tsx
'use client'

import PostCard, { PostData } from './PostCard'

interface LargePostRowCardProps {
  post: PostData
}

export default function LargePostRowCard({ post }: LargePostRowCardProps) {
  return <PostCard variant='largeRow' post={post} />
}
