import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

/** GET /api/posts/[id] - Fetch a single post by ID (optional if needed). */
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const post = await prisma.post.findUnique({
      where: { id: params.id },
    })
    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }
    return NextResponse.json(post)
  } catch (error) {
    console.error('Error fetching post:', error)
    return NextResponse.json({ error: 'Error fetching post' }, { status: 500 })
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
