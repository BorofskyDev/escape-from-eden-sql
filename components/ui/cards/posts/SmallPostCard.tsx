// components/ui/cards/SmallPostCard.tsx
'use client'

import PostCard, { PostData } from './PostCard'

interface SmallPostCardProps {
  post: PostData
}

export default function SmallPostCard({ post }: SmallPostCardProps) {
  return <PostCard variant='small' post={post} />
}
