// components/ui/cards/LargePostColumnCard.tsx
'use client'

import PostCard, { PostData } from './PostCard'

interface LargePostColumnCardProps {
  post: PostData
}

export default function LargePostColumnCard({
  post,
}: LargePostColumnCardProps) {
  return <PostCard variant='largeColumn' post={post} />
}
