// app/api/posts/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET endpoint for fetching posts with pagination (unchanged)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const page = Number(searchParams.get('page')) || 1
    const limit = Number(searchParams.get('limit')) || 10
    const skip = (page - 1) * limit

    const posts = await prisma.post.findMany({
      where: { published: true },
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

    const total = await prisma.post.count({ where: { published: true } })

    let hasNextPage = false
    if (posts.length > limit) {
      hasNextPage = true
      posts.pop() // remove the extra post
    }

    return NextResponse.json({ posts, hasNextPage, total })
  } catch (error: unknown) {
    let errorMessage = 'Error fetching posts'
    if (error instanceof Error) {
      errorMessage = error.message
    }
    // Log the error message only.
    console.error('Error fetching posts:', errorMessage)
    // Return a JSON response with a proper object payload.
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
