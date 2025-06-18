// components/ui/cards/LargePostColumnCard.tsx
'use client'

import { PostCard, PostData } from './post-card/PostCard'

interface LargePostColumnCardProps {
  post: PostData
}

export function LargePostColumnCard({
  post,
}: LargePostColumnCardProps) {
  return <PostCard variant='largeColumn' post={post} />
}
