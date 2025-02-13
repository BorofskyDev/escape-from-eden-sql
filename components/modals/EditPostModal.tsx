'use client'

import Modal from './Modal'
import PostForm, { PostFormData } from '@/components/ui/forms/PostForm'

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

export default function EditPostModal({
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
      <h2 className='text-xl font-bold mb-4'>Edit Post: {post.title}</h2>
      <PostForm key={post.id} mode='edit' initialData={initialData} onClose={onClose} />
    </Modal>
  )
}
