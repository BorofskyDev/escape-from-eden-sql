// lib/hooks/usePaginatedPosts.ts
import { useState, useEffect } from 'react'
import { RecentPost } from '@/lib/functions/getRecentPosts'

interface PaginatedPosts {
  posts: RecentPost[]
  total: number
}

export default function usePaginatedPosts(
  page: number,
  limit: number
): {
  posts: RecentPost[]
  total: number
  loading: boolean
  error: Error | null
} {
  const [data, setData] = useState<PaginatedPosts>({ posts: [], total: 0 })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function fetchPosts() {
      setLoading(true)
      try {
        const res = await fetch(`/api/posts?limit=${limit}&page=${page}`)
        if (!res.ok) throw new Error('Failed to fetch posts')
        const json = await res.json()
        setData({ posts: json.posts, total: json.total })
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

  return { posts: data.posts, total: data.total, loading, error }
}
