// app/blog/[slug]/page.tsx
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import sanitizeHtml from 'sanitize-html'
import GeneralSection from '@/components/layouts/sections/GeneralSection'
import SimilarPostsSection from '@/components/layouts/sections/SimilarPostsSection'
import { prisma } from '@/lib/prisma'
import ShareContainer from '@/components/layouts/containers/ShareContainer'
import ReadingProgressIndicator from '@/components/ui/ReadingProgressIndicator'

// Generate metadata for each blog post, including social sharing properties.
export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}) {
  const post = await prisma.post.findUnique({
    where: { slug: params.slug },
    select: { title: true, description: true, featuredImage: true },
  })

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

export default async function PostPage({
  params,
}: {
  params: { slug: string }
}) {
  const { slug } = params

  const post = await prisma.post.findUnique({
    where: { slug },
    select: {
      id: true,
      title: true,
      description: true, // Added this line to fix the error
      content: true,
      publishedAt: true,
      featuredImage: true,
      category: {
        select: { id: true, name: true },
      },
      tags: {
        select: { id: true, name: true },
      },
    },
  })

  if (!post) {
    notFound()
  }

  const sanitizedContent = sanitizeHtml(post.content)

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
        <article className='my-40 max-w-7xl mx-auto px-6 md:px-8 lg:px-16'>
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
                  className='text-primary transition-all duration-200 hover:text-secondary hover:underline'
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
                {post.tags.map((tag) => (
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
          <div
            className='prose mb-4 bg-bg2 p-8 max-w-4xl mx-auto shadow-lg rounded-md leading-6 flex flex-col gap-4'
            dangerouslySetInnerHTML={{ __html: sanitizedContent }}
          />
        </article>
        <SimilarPostsSection
          currentPostId={post.id}
          currentCategoryId={post.category ? post.category.id : null}
          currentTagIds={post.tags.map((tag) => tag.id)}
        />
      </GeneralSection>
    </>
  )
}
