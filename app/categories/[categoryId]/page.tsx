import { notFound } from 'next/navigation'
import { Page } from '@/components/layouts'
import { Heading, BodyText } from '@/components/ui/common'
import CategoryDropdown from '@/components/ui/common/inputs/category-dropdown/CategoryDropdown'
import { SmallPostCard } from '@/components/ui/cards'
import {
  getCategory,
  getPublishedPostsForCategory,
  mapPostToCardData,
} from '@/lib/functions'
import type { PostData } from '@/components/ui/cards'
import type { WithParams } from '@/lib/types/nextHelpers' // ⬅️
import styles from './CategoryPage.module.scss'

export const revalidate = 60

export default async function CategoryPage({
  params,
}: WithParams<{ categoryId: string }>) {
  const { categoryId } = await params // ⬅️

  const [category, posts] = await Promise.all([
    getCategory(categoryId),
    getPublishedPostsForCategory(categoryId),
  ])

  if (!category) notFound()

  const postCards: PostData[] = posts.map(mapPostToCardData)

  return (
    <Page className={styles.categoryPage}>
      <header className={styles.categoryPage__header}>
        <Heading as='h1' size='page'>
          {category.name}
        </Heading>
        {category.description && <BodyText>{category.description}</BodyText>}
      </header>

      <div className={styles.categoryPage__dropdown}>
        <CategoryDropdown currentCategoryId={category.id} />
      </div>

      <section className={styles.categoryPage__grid}>
        {postCards.map((post) => (
          <SmallPostCard key={post.slug} post={post} />
        ))}
      </section>
    </Page>
  )
}
