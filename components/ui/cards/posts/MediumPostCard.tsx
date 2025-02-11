// components/ui/cards/MediumPostCard.tsx
'use client'

import PostCard, { PostData } from './PostCard'

interface MediumPostCardProps {
  post: PostData
}

export default function MediumPostCard({ post }: MediumPostCardProps) {
  return <PostCard variant='medium' post={post} />
}
