// app/tags/[tagId]/page.tsx
import { notFound } from 'next/navigation'
import { getTag, getAllTags, getPublishedPostsForTag } from '@/lib/functions'
import { mapPostToCardData } from '@/lib/functions/posts'
import { Page } from '@/components/layouts'
import { Heading, LinkTag } from '@/components/ui/common'
import { SmallPostCard } from '@/components/ui/cards'
import styles from './TagsPageComponent.module.scss'


export const revalidate = 60 // ISR (optional)

export default async function TagPage({
  params,
}: {
  params: { tagId: string }
}) {
  const { tagId } = params

  /* --- fetch in parallel ------------------------------------------------ */
  const [tag, posts, allTags] = await Promise.all([
    getTag(tagId),
    getPublishedPostsForTag(tagId),
    getAllTags(),
  ])

  if (!tag) notFound()

  const postCards = posts.map(mapPostToCardData)

  /* --- UI layer --------------------------------------------------------- */
  return (
    <Page>
      {/* Permanent Page Title */}
      <Heading as='h1' size='page'>
        Tags
      </Heading>

      {/* Tag Buttons Row */}
      <div className={styles.tagsPageComponent}>
        {allTags.map((t) => (
          <LinkTag key={t.id} href={`/tags/${t.id}`} className='mr-2'>
            {t.name}
          </LinkTag>
        ))}
      </div>

      {/* Posts Grid */}
      {postCards.length ? (
        <div className={styles.tagsPageComponent__postContainer}>
          <Heading as='h2' size='section' className='mb-4'>
            Posts tagged with <span className='text-blue-600'>{tag.name}</span>
          </Heading>
          <div className={styles.tagsPageComponent__grid}>
            {postCards.map((post) => (
              <SmallPostCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      ) : (
        <p className='text-center text-gray-600'>
          No posts found for this tag.
        </p>
      )}
    </Page>
  )
}