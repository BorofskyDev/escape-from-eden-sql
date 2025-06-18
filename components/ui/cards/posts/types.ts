export interface TagLink {
  id: string
  name: string
}

export interface PostData {
  title: string
  description: string
  categoryName: string
  categoryId?: string
  publishedAt: string
  imageUrl: string
  tags: TagLink[]
  slug: string
  id: string
}
