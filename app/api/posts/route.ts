// app/api/posts/route.ts
import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// GET endpoint to fetch posts with pagination
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const page = Number(searchParams.get('page')) || 1
    const limit = Number(searchParams.get('limit')) || 10
    const skip = (page - 1) * limit

    // Fetch one extra post to determine if there is a next page.
    const posts = await prisma.post.findMany({
      where: {published: true},
      skip,
      take: limit + 1,
      orderBy: {
        // Ordering by updatedAt descending. Replace or extend this with your custom logic if needed.
        publishedAt: 'desc',
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
        tags: {
          select: { id: true, name: true },
        },
      },
    })

    const total = await prisma.post.count()

    let hasNextPage = false
    if (posts.length > limit) {
      hasNextPage = true
      posts.pop() // remove the extra post from the returned array
    }

    return NextResponse.json({ posts, hasNextPage, total })
  } catch (error) {
    console.error('Error fetching posts:', error)
    return NextResponse.json({ error: 'Error fetching posts' }, { status: 500 })
  }
}

// Existing POST handler (for creating posts)
export async function POST(request: Request) {
  try {
    const body = await request.json()
    console.log('Received payload:', body)

    const {
      title,
      description,
      content,
      featuredImage,
      slug,
      categoryId,
      tagIds,
    } = body

    if (!title || !description || !content || !slug) {
      return NextResponse.json(
        {
          error:
            'Missing required fields: title, description, content, and slug are required.',
        },
        { status: 400 }
      )
    }

    const post = await prisma.post.create({
      data: {
        title,
        description,
        content,
        featuredImage: featuredImage || null,
        slug,
        published: false,
        category: categoryId ? { connect: { id: categoryId } } : undefined,
        tags:
          tagIds && Array.isArray(tagIds) && tagIds.length > 0
            ? { connect: tagIds.map((id: string) => ({ id })) }
            : undefined,
      },
    })

    return NextResponse.json(post)
  } catch (error) {
    console.error('Error creating post:', error)
    return NextResponse.json({ error: 'Error creating post' }, { status: 500 })
  }
}
