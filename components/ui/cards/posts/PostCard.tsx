// components/ui/cards/PostCard.tsx
'use client'

import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'

interface TagLink {
  id: string
  name: string
}

// The 'PostData' now has categoryName, categoryId, or just categoryName.
// We'll store categoryId if we want to link by ID, or just name if we want to link by name.
export interface PostData {
  title: string
  description: string
  categoryName: string
  categoryId?: string
  publishedAt: string
  imageUrl: string
  tags: TagLink[] // we need each tag's id + name
  slug: string
}

type PostCardVariant = 'small' | 'medium' | 'largeRow' | 'largeColumn'

interface PostCardProps {
  post: PostData
  variant: PostCardVariant
}

export default function PostCard({ post, variant }: PostCardProps) {
  const {
    title,
    description,
    categoryName,
    categoryId,
    publishedAt,
    imageUrl,
    tags,
    slug,
  } = post

  // Build container classes
  const containerClass = clsx(
    'border rounded shadow overflow-hidden bg-white flex flex-col',
    variant === 'small' && 'w-full',
    variant === 'medium' && 'md:flex-row md:max-w-2xl',
    variant === 'largeRow' && 'lg:flex-row',
    variant === 'largeColumn' && 'lg:max-w-4xl'
  )

  // Image container classes
  const imageContainerClass = clsx(
    'relative w-full h-52',
    variant === 'medium' && 'md:w-2/5 md:h-auto',
    variant === 'largeRow' && 'lg:w-1/2 lg:h-64',
    variant === 'largeColumn' && 'lg:h-64'
  )

  // Content container
  const contentContainerClass = clsx(
    'p-4 flex flex-col justify-start',
    variant === 'medium' && 'md:w-3/5',
    variant === 'largeRow' && 'lg:w-1/2'
  )

  return (
    <div className={containerClass}>
      <div className={imageContainerClass}>
        <Image src={imageUrl} alt={title} fill className='object-cover' />
      </div>

      <div className={contentContainerClass}>
        <p className='text-sm text-gray-500 mb-1'>{publishedAt}</p>

        <Link
          href={`/blog/${slug}`}
          className='text-lg font-semibold text-blue-600 hover:underline'
        >
          {title}
        </Link>

        <p className='text-gray-700 my-2'>{description}</p>

        {/* Category Link */}
        <p className='text-sm font-medium text-gray-600 mb-2'>
          Category:{' '}
          <Link
            href={`/categories/${categoryId ?? 'unknown'}`}
            // If you only have the name, do /categories/[categoryName]
            className='text-blue-500 hover:underline'
          >
            {categoryName}
          </Link>
        </p>

        {/* Tags */}
        <div className='flex flex-wrap gap-2 mt-auto'>
          {tags.map((tag) => (
            <Link
              key={tag.id}
              href={`/tags/${tag.id}`}
              className='px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded hover:bg-blue-200'
            >
              {tag.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
