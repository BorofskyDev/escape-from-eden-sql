'use client'
import { useState, useEffect } from 'react'

// A simple debouncing hook
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)
    return () => clearTimeout(timer)
  }, [value, delay])
  return debouncedValue
}

interface Category {
  id: string
  name: string
}

interface Tag {
  id: string
  name: string
}

interface Post {
  id: string
  title: string
  publishedAt: string
  category?: Category | null
  tags?: Tag[]
}

export default function SearchPosts() {
  // Search criteria
  const [title, setTitle] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [category, setCategory] = useState('')
  const [tag, setTag] = useState('')

  // Pagination & search result states
  const [posts, setPosts] = useState<Post[]>([])
  const [page, setPage] = useState(1)
  const limit = 10
  const [hasMore, setHasMore] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Debounce the search inputs to reduce the number of API calls during typing.
  const debouncedTitle = useDebounce(title, 500)
  const debouncedStartDate = useDebounce(startDate, 500)
  const debouncedEndDate = useDebounce(endDate, 500)
  const debouncedCategory = useDebounce(category, 500)
  const debouncedTag = useDebounce(tag, 500)

  // Whenever debounced search values change, reset the list and page, then perform a new search.
  useEffect(() => {
    setPage(1)
    setPosts([])
    performSearch(1, true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    debouncedTitle,
    debouncedStartDate,
    debouncedEndDate,
    debouncedCategory,
    debouncedTag,
  ])

  async function performSearch(pageNumber = page, reset = false) {
    setLoading(true)
    setError('')
    try {
      const params = new URLSearchParams({
        ...(debouncedTitle && { title: debouncedTitle }),
        ...(debouncedStartDate && { startDate: debouncedStartDate }),
        ...(debouncedEndDate && { endDate: debouncedEndDate }),
        ...(debouncedCategory && { category: debouncedCategory }),
        ...(debouncedTag && { tag: debouncedTag }),
        skip: ((pageNumber - 1) * limit).toString(),
        take: limit.toString(),
      })
      const res = await fetch(`/api/posts/search?${params.toString()}`)
      if (!res.ok) {
        throw new Error('Error fetching posts')
      }
      const data: Post[] = await res.json()
      if (reset) {
        setPosts(data)
      } else {
        setPosts((prev) => [...prev, ...data])
      }
      // If the number of returned posts equals the limit, assume there are more.
      setHasMore(data.length === limit)
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || 'Error fetching posts')
      } else {
        setError(String(err) || 'Error fetching posts')
      }
    } finally {
      setLoading(false)
    }
  }

  function handleLoadMore() {
    const nextPage = page + 1
    setPage(nextPage)
    performSearch(nextPage)
  }

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          setPage(1)
          performSearch(1, true)
        }}
        className='flex flex-col gap-2 mb-4'
      >
        <input
          type='text'
          placeholder='Title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className='p-2 border rounded'
        />
        <input
          type='date'
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className='p-2 border rounded'
        />
        <input
          type='date'
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className='p-2 border rounded'
        />
        <input
          type='text'
          placeholder='Category slug'
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className='p-2 border rounded'
        />
        <input
          type='text'
          placeholder='Tag slug'
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          className='p-2 border rounded'
        />
        <button type='submit' className='p-2 bg-blue-500 text-white rounded'>
          Search
        </button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p className='text-red-500'>{error}</p>}
      {!loading && posts.length === 0 && <p>No posts found.</p>}

      <div className='grid gap-4'>
        {posts.map((post) => (
          <div key={post.id} className='p-4 border rounded'>
            <h3 className='font-bold capitalize'>{post.title}</h3>
            <p>{new Date(post.publishedAt).toLocaleDateString()}</p>
            {post.category && <p>Category: {post.category.name}</p>}
            {post.tags &&
              post.tags.map((t) => (
                <span
                  key={t.id}
                  className='mr-2 inline-block bg-primary p-1 text-bg1 rounded'
                >
                  {t.name}
                </span>
              ))}
          </div>
        ))}
      </div>

      {hasMore && !loading && (
        <button
          onClick={handleLoadMore}
          className='mt-4 p-2 bg-green-500 text-white rounded'
        >
          Load More
        </button>
      )}
    </div>
  )
}
