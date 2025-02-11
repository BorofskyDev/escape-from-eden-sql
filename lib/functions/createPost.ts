// lib/functions/createPost.ts
import axios from 'axios'

export interface CreatePostPayload {
  title: string
  description: string
  content: string
  featuredImage?: string
  slug: string
  published?: boolean // Will always be false on create
  categoryId?: string
  tagIds?: string[]
}

/**
 * Calls our API endpoint to create a post.
 * This function is reusable for creating and, later, editing posts.
 */
export async function createPost(payload: CreatePostPayload) {
  try {
    const response = await axios.post('/api/posts', payload)
    return response.data
  } catch (error) {
    throw error
  }
}
