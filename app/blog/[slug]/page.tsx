// app/blog/[slug]/page.tsx
import { prisma } from '@/lib/prisma'
import type { Metadata } from 'next'
import PostPageComponent from '@/components/layouts/pages/post-page/PostPageComponent'

// Optionally update this copy now that the site is renamed:
const defaultDescription =
  'Journal of a Recalcitrant: essays on power, faith, politics, and the habits of resistance.'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params

  const post = await prisma.post.findUnique({
    where: { slug },
    select: { title: true, description: true, featuredImage: true },
  })

  return {
    title: post?.title ?? 'Blog Post',
    description: post?.description ?? defaultDescription,
    openGraph: {
      title: post?.title ?? 'Blog Post',
      description: post?.description ?? defaultDescription,
      images: post?.featuredImage ? [{ url: post.featuredImage }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post?.title ?? 'Blog Post',
      description: post?.description ?? defaultDescription,
      images: post?.featuredImage ? [post.featuredImage] : [],
    },
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  return <PostPageComponent slug={slug} />
}
