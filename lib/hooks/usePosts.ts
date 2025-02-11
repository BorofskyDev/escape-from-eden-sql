// lib/hooks/usePosts.ts
import { useState, useEffect } from 'react'

export interface Post {
  id: string
  title: string
  featuredImage: string
  published: boolean
  publishedAt?: string | null
  createdAt: string
  updatedAt: string
}

export function usePosts(page: number = 1, limit: number = 10) {
  const [posts, setPosts] = useState<Post[]>([])
  const [hasNextPage, setHasNextPage] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function fetchPosts() {
      setLoading(true)
      try {
        const res = await fetch(`/api/posts?limit=${limit}&page=${page}`)
        if (!res.ok) {
          throw new Error(`Error fetching posts: ${res.statusText}`)
        }
        const data = await res.json()
        setPosts(data.posts)
        setHasNextPage(data.hasNextPage)
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err)
        } else {
          setError(new Error(String(err)))
        }
      } finally {
        setLoading(false)
      }
    }
    fetchPosts()
  }, [page, limit])

  return { posts, hasNextPage, loading, error }
}
