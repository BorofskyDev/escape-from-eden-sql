'use client'

import Image from 'next/image'
import styles from './PostCard.module.scss'
import { BodyText, Heading, TextLink } from '@/components/ui/common'
import type { PostData } from '@/components/ui/cards'


type Variant = 'small' | 'medium' | 'largeRow' | 'large'

interface Props {
  post: PostData
  variant: Variant
}

export function PostCard({ post, variant }: Props) {
  const {
    title,
    description,
    categoryName,
    categoryId,
    publishedAt,
    imageUrl,
    tags,
    slug,
    id,
  } = post

  const cardClasses = `${styles.postCard} ${styles[variant]}`

  return (
    <section id={id} className={cardClasses}>
      <div className={styles.postCard__image}>
        <Image
          src={imageUrl}
          alt={title}
          fill
          sizes='(max-width: 1024px) 100vw, 50vw'
          className={styles.postCard__image__img}
        />
      </div>

      <div className={styles.postCard__content}>
        <TextLink className={styles.postCard__content__category} href={`/categories/${categoryId ?? 'unknown'}`}>
          {categoryName}
        </TextLink>

        <Heading as='h3' size='section-sub'>
          <TextLink
            href={`/blog/${slug}`}
            noUnderline
            className={styles.postCard__title}
          >
            {title}
          </TextLink>
        </Heading>
      </div>
      <BodyText className={styles.postCard__desc}>{description}</BodyText>
      <div className={styles.postCard__category}>
        <BodyText variant='body-sm' className={styles.postCard__date}>
          {publishedAt}
        </BodyText>

        <div className={styles.postCard__tags}>
          {tags.map((tag) => (
            <TextLink
              key={tag.id}
              href={`/tags/${tag.id}`}
              className={styles.postCard__tag}
            >
              {tag.name}
            </TextLink>
          ))}
        </div>
      </div>
    </section>
  )
}
