// components/pages/BlogPageComponent.tsx

import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import sanitizeHtml from 'sanitize-html'
import Image from 'next/image'
import { GeneralSection, SubscribeContainer, Page } from '@/components/layouts'
import SimilarPostsSection from '@/components/layouts/sections/similar-posts-section/SimilarPostsSection'
import ShareContainer from '@/components/layouts/containers/ShareContainer'
import ReadingProgressIndicator from '@/components/ui/ReadingProgressIndicator'
import TipCard from '@/components/ui/cards/TipCard'
import BlogPostReaderContent from '@/components/ui/reader/BlogPostContent'
import { BodyText, Heading, LinkTag, TextLink } from '@/components/ui/common'
import styles from './PostPageComponent.module.scss'

interface BlogPageComponentProps {
  slug: string
}

export default async function PostPageComponent({
  slug,
}: BlogPageComponentProps) {
  const post = await prisma.post.findUnique({
    where: { slug },
    select: {
      id: true,
      title: true,
      description: true,
      content: true,
      publishedAt: true,
      featuredImage: true,
      category: { select: { id: true, name: true } },
      tags: { select: { id: true, name: true } },
    },
  })

  if (!post) notFound()

  const sanitizedContent = sanitizeHtml(post.content, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(['span']),
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      span: [
        'data-footnote',
        'data-footnote-title',
        'data-footnote-content',
        'class',
      ],
      a: ['href', 'title', 'target', 'rel'],
    },
  })

  const formattedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
      })
    : ''

  return (
    <Page>
      <ReadingProgressIndicator />

      <GeneralSection id='blog-post'>
        <article className={styles.blogPost}>
          <Heading as='h1' size='page'>
            {post.title}
          </Heading>

          {post.featuredImage && (
            <div className={styles.blogPost__image}>
              <Image
                src={post.featuredImage}
                alt={post.title}
                fill
                className={styles.blogPost__image__img}
              />
            </div>
          )}

          <BodyText variant='body-sm'>{formattedDate}</BodyText>

          <div className={styles.blogPost__meta}>
            {post.category && (
              <div className={styles.blogPost__category}>
                <Heading as='h3' size='sm'>
                  Category:{' '}
                </Heading>
                
                  <TextLink
                    href={`/categories/${post.category.id}`}
                    
                  >
                    {post.category.name}
                  </TextLink>
               
              </div>
            )}

            <ShareContainer
              url={`https://localhost:3000/blog/${slug}`}
              title={post.title}
              description={post.description}
            />

            {post.tags.length > 0 && (
              <div className='flex flex-wrap gap-2'>
                {post.tags.map((tag) => (
                  <LinkTag
                    key={tag.id}
                    href={`/tags/${tag.id}`}
                    className='px-2 py-1 text-xs bg-primary rounded hover:bg-secondary shadow-md hover:shadow-xl transition-all duration-200'
                  >
                    <span className='text-bg1 font-semibold'>{tag.name}</span>
                  </LinkTag>
                ))}
              </div>
            )}
          </div>

          <div className='prose mb-4 bg-bg2 p-8 max-w-4xl mx-auto shadow-lg rounded-md leading-6 flex flex-col gap-4'>
            <BlogPostReaderContent html={sanitizedContent} />
          </div>
        </article>

        <TipCard />
        <SubscribeContainer />

        <SimilarPostsSection
          currentPostId={post.id}
          currentCategoryId={post.category ? post.category.id : null}
          currentTagIds={post.tags.map((tag) => tag.id)}
        />
      </GeneralSection>
    </Page>
  )
}
