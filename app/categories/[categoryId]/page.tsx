// app/categories/[categoryId]/page.tsx
import { PrismaClient } from '@prisma/client'
import { notFound } from 'next/navigation'
import CategoryDropdown from '@/components/ui/dropdowns/CategoryDropdown'
import SmallPostCard from '@/components/ui/cards/posts/SmallPostCard'
import { PostData } from '@/components/ui/cards/posts/PostCard'
import GeneralSection from '@/components/layouts/sections/GeneralSection'
import PageTitle from '@/components/typography/PageTitle'
import GeneralBodyText from '@/components/typography/GeneralBodyText'
const prisma = new PrismaClient()

// This page is an async server component.
export default async function CategoryPage({
  params,
}: {
  params: { categoryId: string }
}) {
  const { categoryId } = params

  // Fetch category details
  const category = await prisma.category.findUnique({
    where: { id: categoryId },
    select: {
      id: true,
      name: true,
      description: true,
    },
  })

  if (!category) {
    notFound()
  }

  // Fetch all published posts for this category
  const posts = await prisma.post.findMany({
    where: { published: true, categoryId },
    orderBy: [{ publishedAt: 'desc' }, { updatedAt: 'desc' }],
    select: {
      id: true,
      title: true,
      description: true,
      slug: true,
      publishedAt: true,
      featuredImage: true,
      category: { select: { id: true, name: true } },
      tags: { select: { id: true, name: true } },
    },
  })

  // Transform posts into the shape expected by SmallPostCard.
  const transformedPosts: PostData[] = posts.map((post) => ({
    title: post.title,
    description: post.description,
    publishedAt: post.publishedAt
      ? new Date(post.publishedAt).toLocaleDateString('en-US', {
          month: '2-digit',
          day: '2-digit',
          year: 'numeric',
        })
      : '',
    imageUrl: post.featuredImage || 'https://via.placeholder.com/800',
    categoryName: post.category?.name || 'Uncategorized',
    categoryId: post.category?.id,
    tags: post.tags.map((t) => ({ id: t.id, name: t.name })),
    slug: post.slug,
  }))

  return (
    <GeneralSection>
      <header className='mb-8'>
        <PageTitle>{category.name}</PageTitle>
        {category.description && (
          <GeneralBodyText className='text-center'>{category.description}</GeneralBodyText>
        )}
      </header>

      <div className="w-full text-center mb-20">
      <CategoryDropdown currentCategoryId={category.id} />

      </div>

      {/* Posts grid: 1 column on mobile, 2 on tablet, 3 on desktop */}
      <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8'>
        {transformedPosts.map((post) => (
          <SmallPostCard key={post.slug} post={post} />
        ))}
      </section>
    </GeneralSection>
  )
}
