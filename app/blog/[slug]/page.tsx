// app/blog/[slug]/page.tsx
import { PrismaClient } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import sanitizeHtml from 'sanitize-html'

const prisma = new PrismaClient()

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}) {
  const post = await prisma.post.findUnique({
    where: { slug: params.slug },
    select: { title: true },
  })
  return {
    title: post ? post.title : 'Blog Post',
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

  // Sanitize on the server using sanitize-html.
  const sanitizedContent = sanitizeHtml(post.content)

  const formattedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
      })
    : ''

  return (
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
      <div className='my-4 flex justify-between align-middle gap-4'>
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
        className='prose mb-4 bg-bg2 py-4 px-6 max-w-4xl mx-auto'
        dangerouslySetInnerHTML={{ __html: sanitizedContent }}
      />
    </article>
  )
}
