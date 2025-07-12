'use client'

import { Modal } from '../modal/Modal'
import { Heading } from '@/components/ui/common'
import {PostForm} from '@/components/ui/forms/post-form/PostForm'

interface CreatePostModalProps {
  open: boolean
  onClose: () => void
  origin?: { x: number; y: number }
}

export function CreatePostModal({
  open,
  onClose,
  origin,
}: CreatePostModalProps) {
  return (
    <Modal open={open} onClose={onClose} origin={origin}>
      <Heading as='h2' size='section'>
        Create a New Post
      </Heading>
      <PostForm
        mode='create'
        // No initialData because it's a fresh post
        onClose={onClose}
      />
    </Modal>
  )
}
