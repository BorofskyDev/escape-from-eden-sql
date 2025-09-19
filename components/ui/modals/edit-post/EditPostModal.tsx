'use client'

import { Modal } from '@/components/ui/modals'
import { PostForm } from '@/components/ui/forms'
import { Heading } from '@/components/ui/common'
import { PostFormData } from '@/lib/hooks/usePostForm'

interface EditPostModalProps {
  open: boolean
  onClose: () => void
  post: {
    id: string
    title: string
    description?: string
    content?: string
    featuredImage?: string
    published?: boolean
    publishedAt?: string | null
    categoryId?: string
    tagIds?: string[]
  }
}

export function EditPostModal({
  open,
  onClose,
  post,
}: EditPostModalProps) {
  if (!open) return null

  // Transform `post` into the shape that PostForm expects:
  const initialData: PostFormData = {
    id: post.id,
    title: post.title || '',
    description: post.description || '',
    content: post.content || '',
    featuredImage: post.featuredImage || undefined,
    published: post.published ?? false,
    publishedAt: post.publishedAt || null,
    categoryId: post.categoryId,
    tagIds: post.tagIds,
  }

  return (
    <Modal open={open} onClose={onClose}>
      <Heading as='h2' size='section'>
        Edit Post: {post.title}
      </Heading>
      <PostForm key={post.id} mode='edit' initialData={initialData} />
    </Modal>
  )
}
