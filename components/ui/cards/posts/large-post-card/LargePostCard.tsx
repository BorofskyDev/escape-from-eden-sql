// components/ui/cards/LargePostCard.tsx
'use client'

import Image from 'next/image'
import { BodyText, Heading, LinkTag, TextLink } from '@/components/ui/common'
import styles from './LargePostCard.module.scss'

import { PostData } from '../types'

interface Props {
  post: PostData
}

export function LargePostCard({ post }: Props) {
  const {
    id,
    slug,
    title,
    description,
    categoryId,
    categoryName,
    publishedAt,
    imageUrl,
    tags,
  } = post

  return (
    <article id={id} className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          src={imageUrl}
          alt={title}
          fill
          sizes='(max-width: 1024px) 100vw, 50vw'
          className={styles.image}
          priority
        />
      </div>

      <div className={styles.largePostCard__header}>
        <BodyText variant='body-sm'>
          <TextLink href={`/categories/${categoryId ?? 'unknown'}`}>
            {categoryName}
          </TextLink>
        </BodyText>
        <TextLink href={`/blog/${slug}`}>
          <Heading as='h3' size='section-sub'>
            {title}
          </Heading>
        </TextLink>
        <BodyText variant='body-sm'>{publishedAt}</BodyText>
      </div>
      <div className={styles.largePostCard__content}>
        <BodyText>{description}</BodyText>

        <footer className={styles.largePostCard__tags}>
          {!!tags.length && (
            <ul className={styles.tags}>
              {tags.map((tag) => (
                <li key={tag.id}>
                  <LinkTag href={`/tags/${tag.id}`}>{tag.name}</LinkTag>
                </li>
              ))}
            </ul>
          )}
        </footer>
      </div>
    </article>
  )
}
