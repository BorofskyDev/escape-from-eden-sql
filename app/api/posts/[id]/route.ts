//app/posts/[id]/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

/** GET /api/posts/[id] - Fetch a single post by ID (optional if needed). */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const page = Number(searchParams.get('page')) || 1
    const limit = Number(searchParams.get('limit')) || 10
    const skip = (page - 1) * limit

    // Fetch one extra post to determine if there is a next page.
    const posts = await prisma.post.findMany({
      skip,
      take: limit + 1,
      orderBy: { updatedAt: 'desc' },
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

        // We want the category name
        categoryId: true,
        category: {
          select: {
            id: true,
            name: true,
          },
        },

        tags: {
          select: { id: true, name: true },
        },
      },
    })

    let hasNextPage = false
    if (posts.length > limit) {
      hasNextPage = true
      posts.pop()
    }

    return NextResponse.json({ posts, hasNextPage })
  } catch (error) {
    console.error('Error fetching posts:', error)
    return NextResponse.json({ error: 'Error fetching posts' }, { status: 500 })
  }
}

/** PATCH /api/posts/[id] - Update a post. */
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const {
      title,
      description,
      content,
      featuredImage,
      published,
      publishedAt,
      categoryId,
      tagIds,
    } = body

    const post = await prisma.post.update({
      where: { id: params.id },
      data: {
        title,
        description,
        content,
        featuredImage,
        published,
        publishedAt,
        category: categoryId
          ? { connect: { id: categoryId } }
          : { disconnect: true }, // if no category selected
        tags:
          tagIds && Array.isArray(tagIds)
            ? {
                // remove all existing tags first, then reconnect
                set: [],
                connect: tagIds.map((id: string) => ({ id })),
              }
            : { set: [] },
      },
    })
    return NextResponse.json(post)
  } catch (error) {
    console.error('Error updating post:', error)
    return NextResponse.json({ error: 'Error updating post' }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const deletedPost = await prisma.post.delete({
      where: { id: params.id },
    })
    return NextResponse.json(deletedPost)
  } catch (error) {
    console.error('Error deleting post:', error)
    return NextResponse.json({ error: 'Error deleting post' }, { status: 500 })
  }
}