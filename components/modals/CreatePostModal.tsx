'use client'

import Modal from './Modal'
import PostForm from '@/components/ui/forms/PostForm'

interface CreatePostModalProps {
  open: boolean
  onClose: () => void
  origin?: { x: number; y: number }
}

export default function CreatePostModal({
  open,
  onClose,
  origin,
}: CreatePostModalProps) {
  return (
    <Modal open={open} onClose={onClose} origin={origin}>
      <h2 className='text-xl font-semibold mt-6 mb-4'>Create a New Post</h2>
      <PostForm
        mode='create'
        // No initialData because it's a fresh post
        onClose={onClose}
      />
    </Modal>
  )
}
