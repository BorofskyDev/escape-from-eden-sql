import type { SearchPost } from '@/lib/hooks/usePostSearch'
import type { PostData } from '@/components/ui/cards'

export function toPostData(p: SearchPost): PostData {
  return {
    id: p.id,
    title: p.title,
    description: p.description ?? '',
    categoryName: p.category?.name ?? 'Uncategorized',
    categoryId: p.category?.id,
    publishedAt: p.publishedAt ?? '',
    imageUrl: p.featuredImage ?? '',
    imageAlt: p.featuredImageAlt ?? p.title,
    tags: p.tags.map((t) => ({ id: t.id, name: t.name, slug: t.slug })), // matches TagLink
    slug: p.slug,
  }
}
