'use client'
import { useEffect, useMemo, useState } from 'react'

/** Public API shape to avoid Prisma Post collision */
// Add the extra fields your card needs (these exist on your Post model)
export type SearchPost = {
  id: string
  title: string
  description: string
  slug: string
  featuredImage?: string | null
  featuredImageAlt?: string | null
  publishedAt: string | null
  category: { id: string; name: string; slug: string } | null
  tags: { id: string; name: string; slug: string }[]
}


export type PostFilters = {
  title: string
  startDate: string // yyyy-mm-dd
  endDate: string // yyyy-mm-dd
  category: string // slug
  tag: string // slug
}

function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value)
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(t)
  }, [value, delay])
  return debounced
}

type Options = {
  limit?: number
  debounceMs?: number
}

/**
 * usePostSearch
 * - Owns filters, results, loading/error, and pagination
 * - Won’t fetch until at least one filter is present
 */
export function usePostSearch(opts: Options = {}) {
  const limit = opts.limit ?? 10
  const debounceMs = opts.debounceMs ?? 400

  // Filters
  const [filters, setFilters] = useState<PostFilters>({
    title: '',
    startDate: '',
    endDate: '',
    category: '',
    tag: '',
  })

  // Results / UI state
  const [posts, setPosts] = useState<SearchPost[]>([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Debounce filters so we don’t spam the API while typing
  const dFilters = useDebounce(filters, debounceMs)

  const hasQuery = useMemo(
    () =>
      !!(
        dFilters.title ||
        dFilters.startDate ||
        dFilters.endDate ||
        dFilters.category ||
        dFilters.tag
      ),
    [dFilters]
  )

  // Trigger search when debounced filters change (if any filter present)
  useEffect(() => {
    setPage(1)
    setPosts([])
    setHasMore(false)
    setError('')
    if (hasQuery) void performSearch(1, true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dFilters])

  async function performSearch(pageNum = page, reset = false) {
    setLoading(true)
    setError('')
    try {
      const params = new URLSearchParams({
        ...(dFilters.title && { title: dFilters.title }),
        ...(dFilters.startDate && { startDate: dFilters.startDate }),
        ...(dFilters.endDate && { endDate: dFilters.endDate }),
        ...(dFilters.category && { category: dFilters.category }),
        ...(dFilters.tag && { tag: dFilters.tag }),
        skip: String((pageNum - 1) * limit),
        take: String(limit),
      })

      const res = await fetch(`/api/posts/search?${params.toString()}`, {
        cache: 'no-store',
      })
      if (!res.ok) throw new Error('Error fetching posts')
      const data: SearchPost[] = await res.json()

      setPosts((prev) => (reset ? data : [...prev, ...data]))
      setHasMore(data.length === limit)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Error fetching posts')
    } finally {
      setLoading(false)
    }
  }

  function submit() {
    // Manual submit (e.g., form submit). Guard against empty queries.
    if (!hasQuery) {
      setError('Add at least one filter before searching.')
      setPosts([])
      setHasMore(false)
      return
    }
    setPage(1)
    void performSearch(1, true)
  }

  function loadMore() {
    const next = page + 1
    setPage(next)
    void performSearch(next)
  }

  // Convenient filter setters (keeps UI tidy)
  function setFilter<K extends keyof PostFilters>(
    key: K,
    value: PostFilters[K]
  ) {
    setFilters((f) => ({ ...f, [key]: value }))
  }

  return {
    // state
    filters,
    posts,
    loading,
    error,
    hasMore,
    hasQuery,

    // actions
    setFilter,
    setFilters,
    submit,
    loadMore,
  }
}
