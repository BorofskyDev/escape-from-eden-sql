// app/blog/[slug]/page.tsx

import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import sanitizeHtml from 'sanitize-html'
import Image from 'next/image'
import Link from 'next/link'
import GeneralSection from '@/components/layouts/sections/GeneralSection'
import SimilarPostsSection from '@/components/layouts/sections/SimilarPostsSection'
import ShareContainer from '@/components/layouts/containers/ShareContainer'
import ReadingProgressIndicator from '@/components/ui/ReadingProgressIndicator'
import TipCard from '@/components/ui/cards/TipCard'
import BlogPostReaderContent from '@/components/reader/BlogPostContent'
// import SubscribeContainer from '@/components/layouts/containers/SubscribeContainer'


// export const dynamic = 'force-dynamic'


// Metadata generation
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  let post
  try {
    post = await prisma.post.findUnique({
      where: { slug },
      select: { title: true, description: true, featuredImage: true },
    })
  } catch (error) {
    console.error('Error generating metadata for post:', error)
    // You might log this error and continue with fallback values
  }

  const defaultDescription =
    'Escape from Eden is a blog about looking at the world in a post-Christian life.'

  return {
    title: post?.title || 'Blog Post',
    description: post?.description || defaultDescription,
    openGraph: {
      title: post?.title || 'Blog Post',
      description: post?.description || defaultDescription,
      images: post?.featuredImage ? [{ url: post.featuredImage }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post?.title || 'Blog Post',
      description: post?.description || defaultDescription,
      images: post?.featuredImage ? [post.featuredImage] : [],
    },
  }
}


// Optional interface for tags
interface Tag {
  id: string
  name: string
}

// Main page component
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

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

  if (!post) {
    notFound()
  }

  const sanitizedContent = sanitizeHtml(post.content, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(['span']),
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      span: ['data-citation', 'class'],
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
    <>
      <ReadingProgressIndicator />
      <GeneralSection>
        <article className='articleContent my-40 max-w-7xl mx-auto px-6 md:px-8 lg:px-16'>
          <h1 className='text-3xl font-bold my-4 capitalize'>{post.title}</h1>

          {post.featuredImage && (
            <div className='relative w-full h-96 mb-4'>
              <Image
                src={post.featuredImage}
                alt={post.title}
                fill
                className='object-cover'
              />
            </div>
          )}

          <p className='text-sm text-text2 mb-4'>{formattedDate}</p>
          <div className='my-4 flex flex-wrap justify-between items-center gap-4'>
            {post.category && (
              <p className='mb-2'>
                Category:{' '}
                <Link
                  href={`/categories/${post.category.id}`}
                  className='text-primary hover:text-secondary underline'
                >
                  {post.category.name}
                </Link>
              </p>
            )}
            <ShareContainer
              url={`https://localhost:3000/blog/${slug}`}
              title={post.title}
              description={post.description}
            />
            {post.tags.length > 0 && (
              <div className='flex flex-wrap gap-2'>
                {post.tags.map((tag: Tag) => (
                  <Link
                    key={tag.id}
                    href={`/tags/${tag.id}`}
                    className='px-2 py-1 text-xs bg-primary text-bg2 rounded hover:bg-secondary transition-all duration-200'
                  >
                    {tag.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <div className='prose mb-4 bg-bg2 p-8 max-w-4xl mx-auto shadow-lg rounded-md leading-6 flex flex-col gap-4'>
            <BlogPostReaderContent html={sanitizedContent} />
          </div>
        </article>
        <TipCard />
        {/* <SubscribeContainer /> */}
        <SimilarPostsSection
          currentPostId={post.id}
          currentCategoryId={post.category ? post.category.id : null}
          currentTagIds={post.tags.map((tag: Tag) => tag.id)}
        />
      </GeneralSection>
    </>
  )
}
