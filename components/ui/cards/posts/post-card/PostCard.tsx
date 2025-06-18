'use client'

import Image from 'next/image'
import styles from './PostCard.module.scss'
import { BodyText, Heading, LinkTag, TextLink } from '@/components/ui/common'

interface TagLink {
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

type Variant = 'small' | 'medium' | 'largeRow' | 'largeColumn'

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
        <BodyText variant='body-sm' className={styles.postCard__date}>
          {publishedAt}
        </BodyText>

        <Heading as='h3' size='section-sub'>
          <TextLink href={`/blog/${slug}`} className={styles.postCard__title}>
            {title}
          </TextLink>
        </Heading>

        <BodyText className={styles.postCard__desc}>{description}</BodyText>

        <div className={styles.postCard__category}>
          <Heading as='h3' size='container'>
            Category:{' '}
          </Heading>
          <BodyText>
            <TextLink href={`/categories/${categoryId ?? 'unknown'}`}>
              {categoryName}
            </TextLink>
          </BodyText>
        </div>

        <div className={styles.postCard__tags}>
          {tags.map((tag) => (
            <LinkTag
              key={tag.id}
              href={`/tags/${tag.id}`}
              className={styles.postCard__tag}
            >
              {tag.name}
            </LinkTag>
          ))}
        </div>
      </div>
    </section>
  )
}
