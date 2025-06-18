// components/ui/cards/MediumPostCard.tsx
'use client'

import { PostCard, PostData } from './post-card/PostCard'

interface MediumPostCardProps {
  post: PostData
}

export  function MediumPostCard({ post }: MediumPostCardProps) {
  return <PostCard variant='medium' post={post} />
}
