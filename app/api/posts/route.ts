// app/api/posts/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET endpoint for fetching posts with pagination (unchanged)

export async function GET(request: Request) {
  try {
    const url = new URL(request.url)
    const page = Number(url.searchParams.get('page')) || 1
    const limit = Number(url.searchParams.get('limit')) || 10
    const skip = (page - 1) * limit

    // Only include posts that are published and have a publishedAt date in the past (or now)
    const whereClause = {
      published: true,
      publishedAt: { lte: new Date() },
    }

    const posts = await prisma.post.findMany({
      where: whereClause,
      skip,
      take: limit + 1,
      orderBy: [{ publishedAt: 'desc' }],
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

    const total = await prisma.post.count({ where: whereClause })

    let hasNextPage = false
    if (posts.length > limit) {
      hasNextPage = true
      posts.pop() // remove the extra post used to check for next page
    }

    return NextResponse.json({ posts, hasNextPage, total })
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : 'Error fetching posts'
    console.error('Error fetching posts:', errorMessage)
    return new NextResponse(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}


// POST endpoint for creating posts (unchanged)
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
      published,
      publishedAt, // now we're expecting this from the payload
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
        published: Boolean(published),
        // Set publishedAt only if the post is marked as published
        publishedAt: published ? publishedAt || new Date().toISOString() : null,
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

// DELETE endpoint updated to use Promise for params
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  const { id } = await params
  try {
    const deletedPost = await prisma.post.delete({
      where: { id },
    })
    return NextResponse.json(deletedPost)
  } catch (error) {
    console.error('Error deleting post:', error)
    return NextResponse.json({ error: 'Error deleting post' }, { status: 500 })
  }
}
