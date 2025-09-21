// components/ui/cards/LargePostColumnCard.tsx
'use client'

import { PostCard} from './post-card/PostCard'
import type { PostData } from './types'

interface LargePostCardProps {
  post: PostData
}

export function LargePostCard({ post }: LargePostCardProps) {
  return <PostCard variant='large' post={post} />
}
