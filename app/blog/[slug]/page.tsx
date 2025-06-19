// app/blog/[slug]/page.tsx

import { prisma } from '@/lib/prisma'
import { Metadata } from 'next'
import PostPageComponent from '@/components/layouts/pages/post-page/PostPageComponent'

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const { slug } = params

  const post = await prisma.post.findUnique({
    where: { slug },
    select: { title: true, description: true, featuredImage: true },
  })

  const defaultDescription =
    'Escape from Eden is a blog about looking at the world in a post-Christian life.'

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

// Main page component
export default function Page({ params }: { params: { slug: string } }) {
  return <PostPageComponent slug={params.slug} />
}
