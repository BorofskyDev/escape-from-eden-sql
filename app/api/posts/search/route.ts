// app/api/posts/search/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  const title = searchParams.get('title') || undefined
  const startDate = searchParams.get('startDate') || undefined // yyyy-mm-dd
  const endDate = searchParams.get('endDate') || undefined // yyyy-mm-dd
  const categorySlug = searchParams.get('category') || undefined
  const tagSlug = searchParams.get('tag') || undefined

  // Pagination (defaults and caps)
  const skip = Math.max(parseInt(searchParams.get('skip') || '0', 10), 0)
  const takeRaw = Math.max(parseInt(searchParams.get('take') || '10', 10), 1)
  const take = Math.min(takeRaw, 50)

  // If there is no query at all, return empty to avoid "show all on load"
  const hasQuery = !!(title || startDate || endDate || categorySlug || tagSlug)
  if (!hasQuery) return NextResponse.json([])

  // Base filters
  const AND: Prisma.PostWhereInput[] = [
    { published: true },
    { deletedAt: null },
  ]

  // Title-like query across several fields
  if (title) {
    AND.push({
      OR: [
        { title: { contains: title, mode: 'insensitive' } },
        { description: { contains: title, mode: 'insensitive' } },
        { content: { contains: title, mode: 'insensitive' } },
      ],
    })
  }

  // Dates (inclusive range)
  if (startDate || endDate) {
    const publishedAt: Prisma.DateTimeFilter = {}
    if (startDate) {
      // start of day UTC
      publishedAt.gte = new Date(`${startDate}T00:00:00.000Z`)
    }
    if (endDate) {
      // end of day UTC (inclusive)
      publishedAt.lte = new Date(`${endDate}T23:59:59.999Z`)
    }
    AND.push({ publishedAt })
  }

  if (categorySlug) {
    AND.push({ category: { slug: categorySlug } })
  }

  if (tagSlug) {
    AND.push({ tags: { some: { slug: tagSlug } } })
  }

  const where: Prisma.PostWhereInput = { AND }

  try {
    const posts = await prisma.post.findMany({
      where,
      include: {
        category: { select: { id: true, name: true, slug: true } },
        tags: { select: { id: true, name: true, slug: true } },
      },
      orderBy: [{ publishedAt: 'desc' }, { createdAt: 'desc' }],
      skip,
      take,
    })

    return NextResponse.json(posts)
  } catch (error) {
    console.error('Error searching posts:', error)
    return NextResponse.json(
      { error: 'Error searching posts' },
      { status: 500 }
    )
  }
}
