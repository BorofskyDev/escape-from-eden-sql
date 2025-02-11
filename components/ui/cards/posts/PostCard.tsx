// components/ui/cards/PostCard.tsx
'use client'

import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'

// Temporary "Post" type for dummy data.
// Replace with your real Post type once you integrate the API.
export interface PostData {
  id: string
  title: string
  description: string
  category: string
  publishedAt: string
  imageUrl: string
  tags: string[]
  slug: string
}

type PostCardVariant = 'small' | 'medium' | 'largeRow' | 'largeColumn'

interface PostCardProps {
  post: PostData
  variant: PostCardVariant
}

/**
 * A single PostCard component that changes layout based on `variant`
 * and Tailwind breakpoints.
 *
 * - "small": always one column (mobile-like)
 * - "medium": one column by default, two columns at md breakpoint
 * - "largeRow": one column by default, row layout at lg
 * - "largeColumn": one column by default, column layout at lg
 *   (which is basically the default, but we can add size differences if needed).
 */
export default function PostCard({ post, variant }: PostCardProps) {
  const {
    id,
    title,
    description,
    category,
    publishedAt,
    imageUrl,
    tags,
    slug,
  } = post

  // Let's define a container of shared base classes,
  // then apply different breakpoint logic for each variant.
  const containerClass = clsx(
    'border rounded shadow overflow-hidden bg-white',

    // Base layout is "flex flex-col" for mobile
    'flex flex-col',

    // If variant is "small", it always remains flex-col (no changes).
    variant === 'small' && 'w-full',

    // "medium": single column on mobile, 2 columns on md up
    variant === 'medium' && 'md:flex-row md:max-w-2xl',

    // "largeRow": single col by default, row at lg
    variant === 'largeRow' && 'lg:flex-row',

    // "largeColumn": single col by default, column at lg
    // (which is effectively the same, but we can adjust widths or spacing)
    variant === 'largeColumn' && 'lg:max-w-4xl'
  )

  // We'll define an image container.
  // For "row" layouts, we often fix a certain width or ratio.
  // We'll just do a flexible approach here:
  const imageContainerClass = clsx(
    // On mobile
    'relative w-full h-52',

    // For medium in 2-col mode, let's give 40% of width for image
    // so "md:flex-row" means first child can have some fixed flex-basis
    variant === 'medium' && 'md:w-2/5 md:h-auto',

    // For largeRow at lg: if it's row, let's do 50% width
    variant === 'largeRow' && 'lg:w-1/2 lg:h-64',

    // Large column just top, so full width
    variant === 'largeColumn' && 'lg:h-64' // maybe make it taller if you want
  )

  // The content container
  const contentContainerClass = clsx(
    'p-4 flex flex-col justify-start',
    // For medium row layout: 60% width
    variant === 'medium' && 'md:w-3/5',
    // For largeRow row layout: 50% width
    variant === 'largeRow' && 'lg:w-1/2'
    // largeColumn is just full width if we remain in a col
  )

  return (
    <div className={containerClass} data-post-id={id}>
      {/* Image Section */}
      <div className={imageContainerClass}>
        <Image src={imageUrl} alt={title} fill className='object-cover' />
      </div>

      {/* Content Section */}
      <div className={contentContainerClass}>
        <p className='text-sm text-gray-500 mb-1'>{publishedAt}</p>
        <Link
          href={`/blog/${slug}`}
          className='text-lg font-semibold text-blue-600 hover:underline'
        >
          {title}
        </Link>
        <p className='text-gray-700 my-2'>{description}</p>
        <p className='text-sm font-medium text-gray-600 mb-2'>
          Category: {category}
        </p>
        {/* Tags */}
        <div className='flex flex-wrap gap-2 mt-auto'>
          {tags.map((tag) => (
            <span
              key={tag}
              className='px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded'
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
