import type { TagData, PostWithRelations } from "@/lib/types/tagTypes";
import type { PostData } from "@/components/ui/cards";

export function mapPostToCardData(post: PostWithRelations): PostData {
  return {
    id: post.id,
    title: post.title,
    description: post.description,
    publishedAt: post.publishedAt
      ? new Date(post.publishedAt).toLocaleDateString('en-US', {
          month: '2-digit',
          day: '2-digit',
          year: 'numeric',
        })
      : '',
    imageUrl: post.featuredImage || 'https://via.placeholder.com/800',
    categoryName: post.category?.name || 'Uncategorized',
    categoryId: post.category?.id ?? undefined,
    tags: post.tags.map<TagData>((t) => ({ id: t.id, name: t.name, slug: '' })), // slug unused in card
    slug: post.slug,
  }
}