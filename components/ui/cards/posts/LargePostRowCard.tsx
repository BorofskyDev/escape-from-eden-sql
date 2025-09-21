// components/ui/cards/LargePostRowCard.tsx
'use client'

import {PostCard} from './post-card/PostCard'
import type { PostData } from './types'

interface LargePostRowCardProps {
  post: PostData
}

export function LargePostRowCard({ post }: LargePostRowCardProps) {
  return <PostCard variant='largeRow' post={post} />
}
