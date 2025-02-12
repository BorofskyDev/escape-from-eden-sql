// app/api/admin/posts/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'



export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const page = Number(searchParams.get('page')) || 1
    const limit = Number(searchParams.get('limit')) || 10
    const skip = (page - 1) * limit

    // No filter for published status here, so drafts are included.
    const posts = await prisma.post.findMany({
      skip,
      take: limit + 1, // for determining hasNextPage
      orderBy: {
        updatedAt: 'desc',
      },
      select: {
        id: true,
        title: true,
        featuredImage: true,
        published: true,
        publishedAt: true,
        createdAt: true,
        updatedAt: true,
        description: true,
        content: true,
        slug: true,
        categoryId: true,
        category: { select: { id: true, name: true } },
        tags: { select: { id: true, name: true } },
      },
    })

    const total = await prisma.post.count()

    let hasNextPage = false
    if (posts.length > limit) {
      hasNextPage = true
      posts.pop()
    }

    return NextResponse.json({ posts, hasNextPage, total })
  } catch (error) {
    console.error('Error fetching admin posts:', error)
    return NextResponse.json({ error: 'Error fetching posts' }, { status: 500 })
  }
}
