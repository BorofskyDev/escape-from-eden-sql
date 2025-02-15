// app/api/posts/search/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const title = searchParams.get('title') || undefined
  const startDate = searchParams.get('startDate') || undefined
  const endDate = searchParams.get('endDate') || undefined
  const categorySlug = searchParams.get('category') || undefined
  const tagSlug = searchParams.get('tag') || undefined

  const filters: Prisma.PostWhereInput = {
    published: true,
    deletedAt: null,
  }

  if (title) {
    filters.title = { contains: title, mode: 'insensitive' }
  }
  if (startDate || endDate) {
    filters.publishedAt = {}
    if (startDate) filters.publishedAt.gte = new Date(startDate)
    if (endDate) filters.publishedAt.lte = new Date(endDate)
  }
  if (categorySlug) {
    filters.category = { slug: categorySlug }
  }
  if (tagSlug) {
    filters.tags = { some: { slug: tagSlug } }
  }

  try {
    const posts = await prisma.post.findMany({
      where: filters,
      include: {
        category: true,
        tags: true,
      },
      orderBy: { publishedAt: 'desc' },
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
