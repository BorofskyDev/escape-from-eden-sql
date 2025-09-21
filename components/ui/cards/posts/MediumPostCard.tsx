// components/ui/cards/MediumPostCard.tsx
'use client'

import { PostCard} from './post-card/PostCard'
import type { PostData } from './types'

interface MediumPostCardProps {
  post: PostData
}

export  function MediumPostCard({ post }: MediumPostCardProps) {
  return <PostCard variant='medium' post={post} />
}
