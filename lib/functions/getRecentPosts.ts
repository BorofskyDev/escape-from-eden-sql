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
  category: { id: string; name: string } | null
  tags: { id: string; name: string }[]
}

export async function getRecentPosts(): Promise<RecentPost[]> {
  try {
    const res = await fetch('/api/posts?limit=4')
    if (!res.ok) {
      throw new Error(`Failed to fetch recent posts: ${res.statusText}`)
    }
    const data = await res.json()
    return data.posts // Now each post has { category: {id, name}, ... }
  } catch (error) {
    console.error('Error fetching posts:', error)
    return []
  }
}
