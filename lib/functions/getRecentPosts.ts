// lib/functions/getRecentPosts.ts
export interface RecentPost {
  id: string
  title: string
  description: string
  featuredImage: string | null
  publishedAt: string | null
  updatedAt: string
  slug: string
  categoryId: string | null
  tags: { id: string; name: string }[]
  // etc...
}

export async function getRecentPosts(): Promise<RecentPost[]> {
  try {
    const res = await fetch('/api/posts?limit=4')
    if (!res.ok) {
      throw new Error(`Failed to fetch recent posts: ${res.statusText}`)
    }
    const data = await res.json()
    // data.posts is presumably an array
    return data.posts
  } catch (error) {
    console.error('Error in getRecentPosts:', error)
    return []
  }
}
